import React, { useCallback, useState } from 'react';
import { addLink, removeLink } from './utils';

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

export const useLinkHandlers = (editorState, handleChange) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const handleAddLink = useCallback(() => {
    const newState = addLink(editorState, linkUrl);
    handleChange(newState);
    setShowLinkInput(false);
    setLinkUrl('');
  }, [editorState, linkUrl, handleChange]);

  const handleRemoveLink = useCallback(() => {
    const newState = removeLink(editorState);
    handleChange(newState);
  }, [editorState, handleChange]);

  return {
    showLinkInput,
    setShowLinkInput,
    linkUrl,
    setLinkUrl,
    handleAddLink,
    handleRemoveLink
  };
};

export default Link; 