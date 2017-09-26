/* @flow */

import {
  CharacterMetadata,
  ContentBlock,
  ContentState,
  Entity,
  genKey,
  convertToRaw,
} from 'draft-js';
import {List, OrderedSet, Repeat, Seq} from 'immutable';
import {BLOCK_TYPE, ENTITY_TYPE, INLINE_STYLE} from '../../draft-js-tools/src/main';
import {NODE_TYPE_ELEMENT, NODE_TYPE_TEXT} from '../../synthetic-dom/src/SyntheticDOM';

import type {
  Node as SyntheticNode,
  ElementNode as SyntheticElement,
} from '../../synthetic-dom/src/SyntheticDOM';

type DOMNode = SyntheticNode | Node;
type DOMElement = SyntheticElement | Element;

type CharacterMetaSeq = Seq<CharacterMetadata>;
type StyleSet = OrderedSet;

type TextFragment = {
  text: string;
  characterMeta: CharacterMetaSeq;
};

// A ParsedBlock has two purposes:
//   1) to keep data about the block (textFragments, type)
//   2) to act as some context for storing parser state as we parse its contents
type ParsedBlock = {
  tagName: string;
  textFragments: Array<TextFragment>;
  type: string;
  // A stack in which the last item represents the styles that will apply
  // to any text node descendants.
  styleStack: Array<StyleSet>;
  entityStack: Array<?Entity>;
  depth: number;
};

const NO_STYLE = OrderedSet();
const NO_ENTITY = null;

const EMPTY_BLOCK = new ContentBlock({
  key: genKey(),
  text: '',
  type: BLOCK_TYPE.UNSTYLED,
  characterList: List(),
  depth: 0,
});

const LINE_BREAKS = /(\r\n|\r|\n)/g;

// TODO: Move this out to a module.
const INLINE_ELEMENTS = {
  a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1,
  canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1,
  embed: 1, i: 1, iframe: 1, input: 1, ins: 1, kbd: 1, keygen: 1,
  label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1,
  progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1,
  span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, var: 1,
  video: 1, wbr: 1, acronym: 1, applet: 1, basefont: 1, big: 1, font: 1,
  isindex: 1, strike: 1, style: 1, tt: 1,
};

// These elements are special because they cannot contain text as a direct
// child (or cannot contain childNodes at all).
const SPECIAL_ELEMENTS = {
  area: 1, base: 1, br: 1, col: 1, colgroup: 1, command: 1, dl: 1, embed: 1,
  head: 1, hgroup: 1, hr: 1, iframe: 1, input: 1, keygen: 1, link: 1,
  meta: 1, ol: 1, optgroup: 1, option: 1, param: 1, script: 1, select: 1,
  source: 1, style: 1, table: 1, tbody: 1, textarea: 1, tfoot: 1, thead: 1,
  title: 1, tr: 1, track: 1, ul: 1, wbr: 1, basefont: 1, dialog: 1, dir: 1,
  isindex: 1
};

class BlockGenerator {
  blockStack: Array<ParsedBlock>;
  blockList: Array<ParsedBlock>;
  depth: number;

  constructor() {
    // This represents the hierarchy as we traverse nested elements; for
    // example [body, ul, li] where we must know li's parent type (ul or ol).
    this.blockStack = [];
    // This is a linear list of blocks that will form the output; for example
    // [p, li, li, blockquote].
    this.blockList = [];
    this.depth = 0;
  }

  process(element: DOMElement): Array<ContentBlock> {
    this.processBlockElement(element);
    let contentBlocks = [];
    this.blockList.forEach((block) => {
      let {text, characterMeta} = concatFragments(block.textFragments);
      // If this block contains only a soft linebreak then don't discard it
      let includeEmptyBlock = (text === '\r');
      if (block.tagName === 'pre') {
        ({text, characterMeta} = trimLeadingNewline(text, characterMeta));
      } else {
        ({text, characterMeta} = collapseWhiteSpace(text, characterMeta));
      }
      if (block.tagName === 'img') {
         var charData = CharacterMetadata.create({entity: block.entityStack});
          contentBlocks.push(
          new ContentBlock({
            key: genKey(),
            text: ' ',
            type: 'atomic',
            characterList: List(Repeat(charData, 1)),
            depth: block.depth,
          })
        );
      }
      // Discard empty blocks (unless otherwise specified).
      if (text.length || includeEmptyBlock) {
        contentBlocks.push(
          new ContentBlock({
            key: genKey(),
            text: text,
            type: block.type,
            characterList: characterMeta.toList(),
            depth: block.depth,
          })
        );
      }
    });
    if (contentBlocks.length) {
      //console.log(convertToRaw(contentBlocks));
      return contentBlocks;
    } else {
      return [EMPTY_BLOCK];
    }
  }

  getBlockTypeFromTagName(tagName: string): string {
    switch (tagName) {
      case 'li': {
        let parent = this.blockStack.slice(-1)[0];
        return (parent.tagName === 'ol') ?
          BLOCK_TYPE.ORDERED_LIST_ITEM :
          BLOCK_TYPE.UNORDERED_LIST_ITEM;
      }
      case 'blockquote': {
        return BLOCK_TYPE.BLOCKQUOTE;
      }
      case 'h1': {
        return BLOCK_TYPE.HEADER_ONE;
      }
      case 'h2': {
        return BLOCK_TYPE.HEADER_TWO;
      }
      case 'h3': {
        return BLOCK_TYPE.HEADER_THREE;
      }
      case 'h4': {
        return BLOCK_TYPE.HEADER_FOUR;
      }
      case 'h5': {
        return BLOCK_TYPE.HEADER_FIVE;
      }
      case 'h6': {
        return BLOCK_TYPE.HEADER_SIX;
      }
      case 'pre': {
        return BLOCK_TYPE.CODE;
      }
      default: {
        return BLOCK_TYPE.UNSTYLED;
      }
    }
  }

  processBlockElement(element: DOMElement) {
    let tagName = element.nodeName.toLowerCase();
    let type = this.getBlockTypeFromTagName(tagName);
    let hasDepth = canHaveDepth(type);
    let allowRender = !SPECIAL_ELEMENTS.hasOwnProperty(tagName);
    let block: ParsedBlock = {
      tagName: tagName,
      textFragments: [],
      type: type,
      styleStack: [NO_STYLE],
      entityStack: [NO_ENTITY],
      depth: hasDepth ? this.depth : 0,
    };
    if (tagName === 'img') {
      let src = element.getAttribute('src');
      if (src != null) {
        let  entityKey = Entity.create("TOKEN", 'MUTABLE', {src});
         block.entityStack = entityKey;
      }
     
    }
    if (allowRender) {
      this.blockList.push(block);
      if (hasDepth) {
        this.depth += 1;
      }
    }
    this.blockStack.push(block);
    if (element.childNodes != null) {
      Array.from(element.childNodes).forEach(this.processNode, this);
    }
    this.blockStack.pop();
    if (allowRender && hasDepth) {
      this.depth -= 1;
    }
  }

  processInlineElement(element: DOMElement) {
    let tagName = element.nodeName.toLowerCase();
    if (tagName === 'br') {
      return this.processText('\r');
    }
    let block = this.blockStack.slice(-1)[0];
    let style = block.styleStack.slice(-1)[0];
    let entityKey = block.entityStack.slice(-1)[0];
    style = addStyleFromTagName(style, tagName);
    if (tagName === 'a') {
      let href = element.getAttribute('href');
      if (href != null) {
        entityKey = Entity.create(ENTITY_TYPE.LINK, 'MUTABLE', {href});
      }
    }

    block.styleStack.push(style);
    block.entityStack.push(entityKey);
    if (element.childNodes != null) {
      Array.from(element.childNodes).forEach(this.processNode, this);
    }
    block.entityStack.pop();
    block.styleStack.pop();
  }

  processTextNode(node: DOMNode) {
    let text = node.nodeValue;
    // This is important because we will use \r as a placeholder.
    text = text.replace(LINE_BREAKS, '\n');
    // Replace zero-width space (used as a placeholder in markdown) with a
    // soft linebreak.
    text = text.split('\u200B').join('\r');
    this.processText(text);
  }

  processText(text: string) {
    let block = this.blockStack.slice(-1)[0];
    let style = block.styleStack.slice(-1)[0];
    let entity = block.entityStack.slice(-1)[0];
    let charMetadata = CharacterMetadata.create({
      style: style,
      entity: entity,
    });
    block.textFragments.push({
      text: text,
      characterMeta: Repeat(charMetadata, text.length),
    });
  }
   processImage(text: string,element) {
    let tagName = element.nodeName.toLowerCase();
     let entityKey;
     if (tagName === 'img') {
      let src = element.getAttribute('src');
      if (src != null) {
        entityKey = Entity.create('TOKEN', 'MUTABLE', {src});
      }
    }
    let block = this.blockStack.slice(-1)[0];
    let style = block.styleStack.slice(-1)[0];
    let entity =entityKey;
    let charMetadata = CharacterMetadata.create({
      style: style,
      entity: entity,
    });
    block.textFragments.push({
      text: text,
      characterMeta: Repeat(charMetadata, text.length),
    });
  }
  processNode(node: DOMNode) {
    if (node.nodeType === NODE_TYPE_ELEMENT) {
      let element: DOMElement = node;
      let tagName = element.nodeName.toLowerCase();
      if (INLINE_ELEMENTS.hasOwnProperty(tagName)) {
        this.processInlineElement(element);
      } else {
        this.processBlockElement(element);
      }
    } else if (node.nodeType === NODE_TYPE_TEXT) {
      this.processTextNode(node);
    }
  }
}

function trimLeadingNewline(text: string, characterMeta: CharacterMetaSeq): TextFragment {
  if (text.charAt(0) === '\n') {
    text = text.slice(1);
    characterMeta = characterMeta.slice(1);
  }
  return {text, characterMeta};
}

function trimLeadingSpace(text: string, characterMeta: CharacterMetaSeq): TextFragment {
  while (text.charAt(0) === ' ') {
    text = text.slice(1);
    characterMeta = characterMeta.slice(1);
  }
  return {text, characterMeta};
}

function trimTrailingSpace(text: string, characterMeta: CharacterMetaSeq): TextFragment {
  while (text.slice(-1) === ' ') {
    text = text.slice(0, -1);
    characterMeta = characterMeta.slice(0, -1);
  }
  return {text, characterMeta};
}

function collapseWhiteSpace(text: string, characterMeta: CharacterMetaSeq): TextFragment {
  text = text.replace(/[ \t\r\n]/g, ' ');
  ({text, characterMeta} = trimLeadingSpace(text, characterMeta));
  ({text, characterMeta} = trimTrailingSpace(text, characterMeta));
  let i = text.length;
  while (i--) {
    if (text.charAt(i) === ' ' && text.charAt(i - 1) === ' ') {
      text = text.slice(0, i) + text.slice(i + 1);
      characterMeta = characterMeta.slice(0, i)
        .concat(characterMeta.slice(i + 1));
    }
  }
  return {text, characterMeta};
}

function canHaveDepth(blockType: string): boolean {
  switch (blockType) {
    case BLOCK_TYPE.UNORDERED_LIST_ITEM:
    case BLOCK_TYPE.ORDERED_LIST_ITEM: {
      return true;
    }
    default: {
      return false;
    }
  }
}

function concatFragments(fragments: Array<TextFragment>): TextFragment {
  let text = '';
  let characterMeta = Seq();
  fragments.forEach((textFragment: TextFragment) => {
    text = text + textFragment.text;
    characterMeta = characterMeta.concat(textFragment.characterMeta);
  });
  return {text, characterMeta};
}


function addStyleFromTagName(styleSet: StyleSet, tagName: string): StyleSet {
  switch (tagName) {
    case 'b':
    case 'strong': {
      styleSet = styleSet.add(INLINE_STYLE.BOLD);
      break;
    }
    case 'i':
    case 'em': {
      styleSet = styleSet.add(INLINE_STYLE.ITALIC);
      break;
    }
    case 'ins': {
      styleSet = styleSet.add(INLINE_STYLE.UNDERLINE);
      break;
    }
    case 'code': {
      styleSet = styleSet.add(INLINE_STYLE.CODE);
      break;
    }
    case 'del': {
      styleSet = styleSet.add(INLINE_STYLE.STRIKETHROUGH);
      break;
    }
  }
  return styleSet;
}

export default function stateFromElement(element: DOMElement): ContentState {
  let blocks = new BlockGenerator().process(element);
  return ContentState.createFromBlockArray(blocks);
}
