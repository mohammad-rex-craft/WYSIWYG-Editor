import React, { useState, useCallback, useEffect, useRef } from 'react';
import { FullScreenIcon, ExitFullScreenIcon } from './icons/screeenIcons';
import { ListNumIcon, ListDoteIcon } from './icons/listIcons';
import ImageIcons from './icons/imageIcons';
import ExportIcon from './icons/exportIcon';
import { LeftIcon, CenterIcon, RightIcon } from './icons/alignmentIcons';
import UnderlineIcon from './icons/underlineIcon';
import LinkIcon from './icons/linkIcon';
import {PrintIcon} from './icons/printIcon';
import PropTypes from 'prop-types';
import {
  Editor,
  EditorState,
  convertFromRaw,
  convertToRaw,
  RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './RichEditor.css';

import decorator from './editor/decorators';
import Toolbar from './editor/Toolbar';
import {toggleInlineStyle, exportToWord, toggleUnorderedList, toggleOrderedList, printContent} from './editor/utils';
import { useImageHandlers } from './editor/Image';
import { useLinkHandlers } from './editor/Link';

/**
 * @typedef {Object} HeadingOption
 * @property {string} value - The heading type value
 * @property {string} label - The heading label
 */

/**
 * @typedef {Object} ToolbarButtonConfig
 * @property {Function} action - The action function to be called
 * @property {React.ReactNode} label - The button label/icon
 * @property {boolean} [showInput] - Whether to show input field
 * @property {Function} [setShowInput] - Function to toggle input visibility
 * @property {string} [url] - URL for link button
 * @property {Function} [setUrl] - Function to set URL
 * @property {HeadingOption[]} [headingOptions] - Options for heading dropdown
 * @property {boolean} [isActive] - Whether the button is active
 */

/**
 * @typedef {Object} ToolbarConfig
 * @property {ToolbarButtonConfig} print - Print button configuration
 * @property {ToolbarButtonConfig} export - Export button configuration
 * @property {ToolbarButtonConfig} image - Image button configuration
 * @property {ToolbarButtonConfig} link - Link button configuration
 * @property {ToolbarButtonConfig} heading - Heading button configuration
 * @property {ToolbarButtonConfig} orderedListDot - Unordered list button configuration
 * @property {ToolbarButtonConfig} orderedListNum - Ordered list button configuration
 * @property {ToolbarButtonConfig} fullscreen - Fullscreen button configuration
 */

/**
 * @typedef {Object} RichEditorProps
 * @property {string} [value] - The editor content value
 * @property {Function} [onChange] - The function to handle content changes
 * @property {string} [placeHolder] - The placeholder text
 * @property {string} [className] - The CSS class name
 * @property {React.CSSProperties} [style] - The CSS styles
 * @property {Function} [renderToolbar] - The function to render the toolbar
 * @property {string} [initialContent] - The initial content value
 * @property {string[]} [toolbarButtons] - The toolbar buttons
*/

const RichEditor = ({
  value,
  onChange,
  placeHolder,
  className,
  style,
  renderToolbar,
  initialContent,
  toolbarButtons = ['HEADING', 'BOLD', 'ITALIC', 'UNDERLINE', 'LINK', 'LEFT', 'CENTER', 'RIGHT', 'EXPORT_WORD', 'IMAGE', 'UNORDERED_LIST', 'ORDERED_LIST', 'FULLSCREEN', 'PRINT'],
}) => {

  const [placeHolderTape, setPlaceHolderTape] = useState(placeHolder);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      try {
        const contentState = convertFromRaw(JSON.parse(value));
        return EditorState.createWithContent(contentState, decorator);
      } catch (e) {
        return EditorState.createEmpty(decorator);
      }
    }
    if (initialContent) {
      try {
        const contentState = convertFromRaw(JSON.parse(initialContent));
        return EditorState.createWithContent(contentState, decorator);
      } catch (e) {
        return EditorState.createEmpty(decorator);
      }
    }
    return EditorState.createEmpty(decorator);
  });

  const isReadOnly = value && !onChange;

  useEffect(() => {
    if (value) {
      try {
        const contentState = convertFromRaw(JSON.parse(value));
        const newEditorState = EditorState.createWithContent(contentState, decorator);
        setEditorState(newEditorState);
      } catch (e) {
        console.error('Invalid editor value format');
      }
    }
  }, [value]);

  const fileInputRef = useRef(null);
  const [alignment, setAlignment] = useState('');

  const handleToggleInlineStyle = useCallback((style) => {
    if (isReadOnly) return;
    const newState = toggleInlineStyle(editorState, style);
    setEditorState(newState);
  }, [editorState, setEditorState, isReadOnly]);

  const handleTextAlignment = useCallback((style) => {
    if (isReadOnly) return;
    setAlignment(style);
  }, [isReadOnly]);

  const handlePrint = useCallback(() => {
    printContent(editorState);
  }, [editorState]);

  const handleExport = useCallback(() => {
    exportToWord(editorState);
  }, [editorState]);

  const { handleInsertImage, handleImageUpload } = useImageHandlers(editorState, setEditorState);
  const {
    showLinkInput,
    setShowLinkInput,
    linkUrl,
    setLinkUrl,
    handleAddLink,
    handleRemoveLink
  } = useLinkHandlers(editorState, setEditorState);

  const handleToggleUnorderedList = useCallback(() => {
    if (isReadOnly) return;
    const newState = toggleUnorderedList(editorState);
    setEditorState(newState);
  }, [editorState, setEditorState, isReadOnly]);

  const handleToggleOrderedList = useCallback(() => {
    if (isReadOnly) return;
    const newState = toggleOrderedList(editorState);
    setEditorState(newState);
  }, [editorState, setEditorState, isReadOnly]);

  const handleHeadingChange = useCallback((headingType) => {
    if (isReadOnly) return;
    const newState = RichUtils.toggleBlockType(editorState, headingType);
    setEditorState(newState);
  }, [editorState, setEditorState, isReadOnly]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
    if (onChange) {
      onChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    }
  }, [editorState, onChange]);

  const headingOptions = [
    { value: 'unstyled', label: 'h' },
    { value: 'header-one', label: 'h1' },
    { value: 'header-two', label: 'h2' },
    { value: 'header-three', label: 'h3' },
    { value: 'header-four', label: 'h4' },
    { value: 'header-five', label: 'h5' },
    { value: 'header-six', label: 'h6' }
  ];

  /** @type {ToolbarConfig} */
  const toolbarConfig = {
    print: { action: handlePrint, label: <PrintIcon /> },
    export: { action: handleExport, label: <ExportIcon /> },
    image: { action: handleImageUpload, label: <ImageIcons /> },
    link: { 
      action: handleAddLink, 
      label: <LinkIcon />,
      showInput: showLinkInput,
      setShowInput: setShowLinkInput,
      url: linkUrl,
      setUrl: setLinkUrl
    },
    heading: { action: handleHeadingChange, label: 'Heading' ,headingOptions:headingOptions},
    orderedListDot: { action: handleToggleUnorderedList, label: <ListDoteIcon /> },
    orderedListNum: { action: handleToggleOrderedList, label: <ListNumIcon /> },
    fullscreen: { action: handleToggleFullscreen, label: isFullscreen ? <ExitFullScreenIcon /> : <FullScreenIcon />, isActive: isFullscreen }
  };

  const defaultToolbar = (
    <Toolbar
      editorState={editorState}
      toolbarButtons={toolbarButtons}
      onToggleInlineStyle={handleToggleInlineStyle}
      onTextAlignment={handleTextAlignment}
      onExportToWord={handleExport}
      onImageUpload={handleImageUpload}
      showLinkInput={showLinkInput}
      setShowLinkInput={setShowLinkInput}
      linkUrl={linkUrl}
      setLinkUrl={setLinkUrl}
      addLink={handleAddLink}
      fileInputRef={fileInputRef}
      onToggleUnorderedList={handleToggleUnorderedList}
      onToggleOrderedList={handleToggleOrderedList}
      onHeadingChange={handleHeadingChange}
      onToggleFullscreen={handleToggleFullscreen}
      isFullscreen={isFullscreen}
      onPrint={handlePrint}
    />
  );

  const customToolbar = renderToolbar ? renderToolbar(editorState, setEditorState, toolbarConfig) : null;

  return (
    <div className={`rich-editor ${className || ''} ${isFullscreen ? 'fullscreen' : ''}`} style={style}>
      {!isReadOnly ? (customToolbar ? customToolbar : defaultToolbar) : ''}
      <div className="rich-editor-content">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder={placeHolderTape}
          textAlignment={alignment}
          onFocus={() => setPlaceHolderTape('')}
          onBlur={() => setPlaceHolderTape(placeHolder)}
          readOnly={isReadOnly}
          blockProps={{ editorState, setEditorState }}
        />
      </div>
    </div>
  );
};

RichEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  renderToolbar: PropTypes.func,
  initialContent: PropTypes.string,
  toolbarButtons: PropTypes.arrayOf(PropTypes.string),
};

RichEditor.defaultProps = {
  value: '',
  onChange: () => {},
  placeHolder: '',
  className: '',
  style: {},
  renderToolbar: () => null,
  initialContent: '',
  toolbarButtons: ['HEADING', 'BOLD', 'ITALIC', 'UNDERLINE', 'LINK', 'LEFT', 'CENTER', 'RIGHT', 'EXPORT_WORD', 'IMAGE', 'UNORDERED_LIST', 'ORDERED_LIST', 'FULLSCREEN', 'PRINT']
};

export default RichEditor; 