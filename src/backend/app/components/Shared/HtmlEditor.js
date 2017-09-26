import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState } from 'draft-js'
import Editor from '../Editor/src/Editor'
import { stateToHTML } from '../Editor/draft-js-export-html/src/main'
import { stateFromHTML } from '../Editor/draft-js-import-html/src/main'
import '../../styles/vendor/editor/RichEditor.css'

class HtmlEditor extends Component {
  static propTypes = {
    documentId: PropTypes.string,
    uploadImg: PropTypes.string
  }

  editHandle(content) {
    const editor = this.refs.myEditor
    const _editorState = editor.getEditorState()

    const _content = stateFromHTML(content)
    const editorState = EditorState.push(
      _editorState,
      _content,
      'secondary-paste'
    )
    editor.onChange(editorState)
  }

  getFirstBlockText() {
    const editor = this.refs.myEditor
    return editor.getFirstBlockText()
  }

  onFocus() {
    const editor = this.refs.myEditor
    editor._focus()
  }

  getPlainText() {
    let editor = this.refs.myEditor
    return editor.getCurrentContent().getPlainText()
  }
  uploadImg(file, callback) { }
  saveHandle() {
    let editor = this.refs.myEditor
    const editorState = editor.getCurrentContent()
    const _content = stateToHTML(editorState)
    return _content
  }

  render() {
    return <div className='editor-root'><Editor ref='myEditor' documentId={this.props.documentId} uploadImg={this.props.uploadImg} /></div>
  }
}

export default HtmlEditor
