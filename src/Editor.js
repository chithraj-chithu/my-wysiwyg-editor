import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const handleUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const handleLinkClick = () => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const link = window.prompt('Enter the URL');
    if (!link) return;
    const contentStateWithLink = contentState.createEntity('LINK', 'MUTABLE', { url: link });
    const entityKey = contentStateWithLink.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithLink });
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  const handleHeaderClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
  };

  return (
    <div>
      <div className="toolbar">
        <button onClick={handleBoldClick}>Bold</button>
        <button onClick={handleItalicClick}>Italic</button>
        <button onClick={handleUnderlineClick}>Underline</button>
        <button onClick={handleLinkClick}>Link</button>
        <button onClick={handleHeaderClick}>H1</button>
      </div>
      <div className="editor">
        <Editor editorState={editorState} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default MyEditor;