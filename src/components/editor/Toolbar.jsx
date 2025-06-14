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
import { FullScreenButton, ImageButton, LinkButton, AlignmentButton, OrderListDotButton, OrderListNumButton, ExportWordButton, PrintButton, HeadingButton } from "../btn";

/**
 * @typedef {Object} ToolbarProps
 * @property {EditorState} editorState - The editor state
 * @property {string[]} toolbarButtons - The toolbar buttons
 * @property {Function} onToggleInlineStyle - The function to toggle inline style
 * @property {Function} onTextAlignment - The function to handle text alignment
 * @property {Function} onExportToWord - The function to export to word
 * @property {Function} onImageUpload - The function to upload an image
 * @property {boolean} showLinkInput - Whether to show the link input
 * @property {Function} setShowLinkInput - The function to set the show link input
 * @property {string} linkUrl - The link URL
 * @property {Function} setLinkUrl - The function to set the link URL
 * @property {Function} addLink - The function to add a link
 * @property {React.RefObject} fileInputRef - The file input reference
 * @property {Function} onToggleUnorderedList - The function to toggle an unordered list
 * @property {Function} onToggleOrderedList - The function to toggle an ordered list
 * @property {Function} onHeadingChange - The function to change the heading
 * @property {Function} onToggleFullscreen - The function to toggle fullscreen
 * @property {boolean} isFullscreen - Whether the editor is fullscreen
 * @property {Function} onPrint - The function to print the editor
 */
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

  

  const buttonConfig = {
    HEADING: { label: 'Heading', type: 'select' },
    BOLD: { label: 'B', style: 'BOLD' },
    ITALIC: { label: '/', style: 'ITALIC' },
    UNDERLINE: { label: <UnderlineIcon />, style: 'UNDERLINE' },
    LINK: { label: <LinkIcon />, style: 'LINK' },
    LEFT: { label: <LeftIcon />, style: 'left' },
    CENTER: { label: <CenterIcon />, style: 'center' },
    RIGHT: { label: <RightIcon />, style: 'right' },
    EXPORT_WORD: { label: <ExportIcon />, action: onExportToWord },
    IMAGE: { label: <ImageIcons />, action: () => fileInputRef.current?.click() },
    ORDERED_LIST_DOT: { label: <ListDoteIcon />, action: onToggleUnorderedList },
    ORDERED_LIST_NUM: { label: <ListNumIcon />, action: onToggleOrderedList },
    FULLSCREEN: { label: isFullscreen ? <ExitFullScreenIcon /> : <FullScreenIcon />, action: onToggleFullscreen },
    PRINT: { label: 'Print', action: onPrint }
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
  return (
    <div className="rich-editor-toolbar">
      {toolbarButtons.map((button) => {
        const config = buttonConfig[button];
        if (!config) return null;

        if (button === 'HEADING') {
          return (
              <HeadingButton key={button} button={button} getCurrentBlockType={getCurrentBlockType} onHeadingChange={onHeadingChange} headingOptions={headingOptions}/>
          );
        }

        if (button === 'LINK') {
          return (
            <LinkButton
              key={button}
              config={config}
              showLinkInput={showLinkInput}
              setShowLinkInput={setShowLinkInput}
              linkUrl={linkUrl}
              setLinkUrl={setLinkUrl}
              addLink={addLink}
              editorState={editorState}
            />
          );
        }

        if (button === 'IMAGE') {
          return (
            <ImageButton key={button} config={config} fileInputRef={fileInputRef} onImageUpload={onImageUpload} />
          );
        }

        if (['LEFT', 'CENTER', 'RIGHT'].includes(button)) {
          return (
            <AlignmentButton 
              key={button} 
              config={config} 
              onTextAlignment={onTextAlignment} 
              getCurrentBlockType={getCurrentBlockType} 
              button={button}
            />
          );
        }

        if (button === 'ORDERED_LIST_DOT') {
          return (
            <OrderListDotButton 
              key={button} 
              config={config} 
              getCurrentBlockType={getCurrentBlockType} 
              button={button}
            />
          );
        }

        if (button === 'ORDERED_LIST_NUM') {
          return (
            <OrderListNumButton 
              key={button} 
              config={config} 
              getCurrentBlockType={getCurrentBlockType} 
              button={button}
            />
          );
        }

        if (button === 'FULLSCREEN') {
          return (
            <FullScreenButton 
              key={button} 
              fullscreen={isFullscreen} 
              action={onToggleFullscreen} 
              icon={config.label}
            />
          );
        }

        if (button === 'EXPORT_WORD') {
          return (
            <ExportWordButton key={button} config={config} button={button}/>
          );
        }

        if (button === 'PRINT') {
          return (
            <PrintButton key={button} config={config} button={button}/>
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