import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { FullScreenIcon, ExitFullScreenIcon } from '../icons/screeenIcons';
import { ListNumIcon, ListDoteIcon } from '../icons/listIcons';
import ImageIcons from '../icons/imageIcons';
import ExportIcon from '../icons/exportIcon';
import { LeftIcon, CenterIcon, RightIcon } from '../icons/alignmentIcons';
import UnderlineIcon from '../icons/underlineIcon';
import LinkIcon from '../icons/linkIcon';

const Toolbar = ({
  editorState,
  toolbarButtons,
  onToggleInlineStyle,
  onTextAlignment,
  onExportToWord,
  onImageUpload,
  showLinkInput,
  setShowLinkInput,
  linkUrl,
  setLinkUrl,
  addLink,
  fileInputRef,
  onToggleUnorderedList,
  onToggleOrderedList,
  onHeadingChange,
  onToggleFullscreen,
  isFullscreen,
  onPrint
}) => {
  const getCurrentBlockType = () => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    const blockData = block.getData();
    
    if (blockData.has('textAlign')) {
      return blockData.get('textAlign');
    }
    
    return block.getType();
  };

  const headingOptions = [
    { value: 'unstyled', label: 'h' },
    { value: 'header-one', label: 'h1' },
    { value: 'header-two', label: 'h2' },
    { value: 'header-three', label: 'h3' },
    { value: 'header-four', label: 'h4' },
    { value: 'header-five', label: 'h5' },
    { value: 'header-six', label: 'h6' }
  ];

  const buttonConfig = {
    HEADING: { label: 'Heading', type: 'select' },
    BOLD: { label: 'B', style: 'BOLD' },
    ITALIC: { label: '/', style: 'ITALIC' },
    UNDERLINE: { label: <UnderlineIcon/>, style: 'UNDERLINE' },
    LINK: { label: <LinkIcon/>, style: 'LINK' },
    LEFT: { label: <LeftIcon/>, style: 'left' },
    CENTER: { label: <CenterIcon/>, style: 'center' },
    RIGHT: { label: <RightIcon/>, style: 'right' },
    EXPORT_WORD: { label: <ExportIcon/>, action: onExportToWord },
    IMAGE: { label: <ImageIcons/>, action: () => fileInputRef.current?.click() },
    UNORDERED_LIST: { label: <ListDoteIcon/>, action: onToggleUnorderedList },
    ORDERED_LIST: { label: <ListNumIcon/>, action: onToggleOrderedList },
    FULLSCREEN: { label: isFullscreen ? <ExitFullScreenIcon/> : <FullScreenIcon/>, action: onToggleFullscreen },
    PRINT: { label: 'Print', action: onPrint }
  };

  return (
    <div className="rich-editor-toolbar">
      {toolbarButtons.map((button) => {
        const config = buttonConfig[button];
        if (!config) return null;

        if (button === 'HEADING') {
          return (
            <select
              key={button}
              value={getCurrentBlockType()}
              onChange={(e) => onHeadingChange(e.target.value)}
              className="heading-select"
              aria-label="Heading"
            >
              {headingOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        }

        if (button === 'LINK') {
          return (
            <div key={button} className="link-control">
              <button
                onClick={() => setShowLinkInput(!showLinkInput)}
                className={editorState.getCurrentInlineStyle().has('LINK') ? 'active' : ''}
                aria-label="Link"
              >
                {config.label}
              </button>
              {showLinkInput && (
                <div className="link-input-container">
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="link-input"
                  />
                  <button onClick={addLink} className="add-link-button" aria-label="Add Link">
                    Add
                  </button>
                </div>
              )}
            </div>
          );
        }

        if (button === 'IMAGE') {
          return (
            <div key={button} className="image-control">
              <button onClick={config.action} className="image-button" aria-label="Image">
                {config.label}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          );
        }

        if (['LEFT', 'CENTER', 'RIGHT'].includes(button)) {
          const alignLabels = { LEFT: 'Left Align', CENTER: 'Center Align', RIGHT: 'Right Align' };
          return (
            <button
              key={button}
              onClick={() => onTextAlignment(config.style)}
              className={getCurrentBlockType() === config.style ? 'active' : ''}
              aria-label={alignLabels[button]}
            >
              {config.label}
            </button>
          );
        }

        if (button === 'UNORDERED_LIST') {
          return (
            <button
              key={button}
              onClick={config.action}
              className={getCurrentBlockType() === 'unordered-list-item' ? 'active' : ''}
              aria-label="Unordered List"
            >
              {config.label}
            </button>
          );
        }

        if (button === 'ORDERED_LIST') {
          return (
            <button
              key={button}
              onClick={config.action}
              className={getCurrentBlockType() === 'ordered-list-item' ? 'active' : ''}
              aria-label="Ordered List"
            >
              {config.label}
            </button>
          );
        }

        if (button === 'FULLSCREEN') {
          return (
            <button
              key={button}
              onClick={config.action}
              className="toolbar-button"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {config.label}
            </button>
          );
        }

        if (button === 'EXPORT_WORD') {
          return (
            <button
              key={button}
              onClick={config.action}
              className="toolbar-button"
              aria-label="Export to Word"
            >
              {config.label}
            </button>
          );
        }

        if (button === 'PRINT') {
          return (
            <button
              key={button}
              onClick={config.action}
              className="toolbar-button"
              aria-label="Print"
            >
              {config.label}
            </button>
          );
        }

        // Inline styles (BOLD, ITALIC, UNDERLINE)
        const inlineLabels = { BOLD: 'Bold', ITALIC: 'Italic', UNDERLINE: 'Underline' };
        if (['BOLD', 'ITALIC', 'UNDERLINE'].includes(button)) {
          return (
            <button
              key={button}
              onClick={() => onToggleInlineStyle(config.style)}
              className={editorState.getCurrentInlineStyle().has(config.style) ? 'active' : ''}
              aria-label={inlineLabels[button]}
            >
              {config.label}
            </button>
          );
        }

        return (
          <button
            key={button}
            onClick={() => onToggleInlineStyle(config.style)}
            className={editorState.getCurrentInlineStyle().has(config.style) ? 'active' : ''}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
};

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  toolbarButtons: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleInlineStyle: PropTypes.func.isRequired,
  onTextAlignment: PropTypes.func.isRequired,
  onExportToWord: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  showLinkInput: PropTypes.bool.isRequired,
  setShowLinkInput: PropTypes.func.isRequired,
  linkUrl: PropTypes.string.isRequired,
  setLinkUrl: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  onToggleUnorderedList: PropTypes.func.isRequired,
  onToggleOrderedList: PropTypes.func.isRequired,
  onHeadingChange: PropTypes.func.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  onPrint: PropTypes.func.isRequired
};

export default Toolbar; 