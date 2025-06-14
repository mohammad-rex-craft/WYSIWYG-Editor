import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';

export const toggleInlineStyle = (editorState, style) => {
  return RichUtils.toggleInlineStyle(editorState, style);
};

export const toggleUnorderedList = (editorState) => {
  return RichUtils.toggleBlockType(editorState, 'unordered-list-item');
};

export const toggleOrderedList = (editorState) => {
  return RichUtils.toggleBlockType(editorState, 'ordered-list-item');
};

export const addLink = (editorState, linkUrl) => {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed() && linkUrl) {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: linkUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    return RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey);
  }
  return editorState;
};

export const removeLink = (editorState) => {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    return RichUtils.toggleLink(editorState, selection, null);
  }
  return editorState;
};

export const insertImage = (editorState, imageUrl) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imageUrl });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
};

export const exportToWord = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const blocks = contentState.getBlocksAsArray();
  
  let htmlContent = '';
  blocks.forEach(block => {
    const blockType = block.getType();
    const text = block.getText();
    const inlineStyles = block.getInlineStyleAt(0);
    
    let styleString = '';
    if (inlineStyles.has('BOLD')) styleString += 'font-weight: bold;';
    if (inlineStyles.has('ITALIC')) styleString += 'font-style: italic;';
    if (inlineStyles.has('UNDERLINE')) styleString += 'text-decoration: underline;';
    
    if (blockType === 'atomic') {
      const entityKey = block.getEntityAt(0);
      if (entityKey) {
        const entity = contentState.getEntity(entityKey);
        const entityType = entity.getType();
        
        if (entityType === 'IMAGE') {
          const { src } = entity.getData();
          htmlContent += `<p><img src="${src}" style="max-width: 100%; height: auto;" /></p>`;
          return;
        }
      }
    }
    
    htmlContent += `<p style="${styleString}">${text}</p>`;
  });

  const wordContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:w="urn:schemas-microsoft-com:office:word" 
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Document</title>
      <style>
        img { max-width: 100%; height: auto; }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  const blob = new Blob([wordContent], { type: 'application/msword' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.doc';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const printContent = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const blocks = contentState.getBlocksAsArray();
  
  let htmlContent = '';
  blocks.forEach(block => {
    const blockType = block.getType();
    const text = block.getText();
    const inlineStyles = block.getInlineStyleAt(0);
    
    let styleString = '';
    if (inlineStyles.has('BOLD')) styleString += 'font-weight: bold;';
    if (inlineStyles.has('ITALIC')) styleString += 'font-style: italic;';
    if (inlineStyles.has('UNDERLINE')) styleString += 'text-decoration: underline;';
    
    if (blockType === 'atomic') {
      const entityKey = block.getEntityAt(0);
      if (entityKey) {
        const entity = contentState.getEntity(entityKey);
        const entityType = entity.getType();
        
        if (entityType === 'IMAGE') {
          const { src } = entity.getData();
          htmlContent += `<p><img src="${src}" style="max-width: 100%; height: auto;" /></p>`;
          return;
        }
      }
    }
    
    htmlContent += `<p style="${styleString}">${text}</p>`;
  });

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Document</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          @media print {
            body {
              margin: 0;
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}; 