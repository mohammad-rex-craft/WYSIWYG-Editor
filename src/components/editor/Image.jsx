import React, { useCallback } from 'react';
import { insertImage } from './utils';

const Image = (props) => {
  const { src } = props.contentState.getEntity(props.entityKey).getData();
  return <img src={src} alt="" style={{ maxWidth: '100%', height: 'auto' }} />;
};

export const useImageHandlers = (editorState, handleChange) => {
  const handleInsertImage = useCallback((imageUrl) => {
    const newState = insertImage(editorState, imageUrl);
    handleChange(newState);
  }, [editorState, handleChange]);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInsertImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, [handleInsertImage]);

  return {
    handleInsertImage,
    handleImageUpload
  };
};

export default Image; 