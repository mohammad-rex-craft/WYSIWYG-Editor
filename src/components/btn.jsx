import PropTypes from "prop-types";
import React from "react";

/**
 * @param {string} fullscreen
 * @param {function} action
 * @param {React.ReactNode} icon
 * @returns {JSX.Element}
 * @constructor
 */
export const FullScreenButton = ({ fullscreen, action, icon }) => {
    return <button
        onClick={action}
        className="toolbar-button"
        aria-label={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
    >
        {icon ?? "Fullscreen"}
    </button>;
}

FullScreenButton.propTypes = {
    fullscreen: PropTypes.string,
    action: PropTypes.func,
    icon: PropTypes.node
};
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @param {object} config
 * @param {React.RefObject} fileInputRef
 * @param {function} onImageUpload
 * @returns {JSX.Element}
 * @constructor
 */

export const ImageButton = ({ config, fileInputRef, onImageUpload }) => {
    return (
        <div className="image-control">
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
    )
}

ImageButton.propTypes = {
    config: PropTypes.object,
    fileInputRef: PropTypes.object,
    onImageUpload: PropTypes.func
}


// ---------------------------------------------------------------------------------------------------------------------

/**
 * @param {object} config
 * @param {boolean} showLinkInput
 * @param {function} setShowLinkInput
 * @param {string} linkUrl
 * @param {function} setLinkUrl
 * @param {function} addLink
 * @param {object} editorState
 * @returns {JSX.Element}
 * @constructor
 */
export const LinkButton = ({ config, showLinkInput, setShowLinkInput, linkUrl, setLinkUrl, addLink, editorState }) => {
    return (
        <div className="link-control">
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
    )
}

LinkButton.propTypes = {
    config: PropTypes.object,
    showLinkInput: PropTypes.bool,
    setShowLinkInput: PropTypes.func,
    linkUrl: PropTypes.string,
    setLinkUrl: PropTypes.func,
    addLink: PropTypes.func,
    editorState: PropTypes.object
}


// ---------------------------------------------------------------------------------------------------------------------

/**
 * @param {object} config
 * @param {function} onTextAlignment
 * @param {function} getCurrentBlockType
 * @returns {JSX.Element}
 * @constructor
 */
export const AlignmentButton = ({ config, onTextAlignment, getCurrentBlockType, button }) => {
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

AlignmentButton.propTypes = {
    config: PropTypes.object,
    onTextAlignment: PropTypes.func,
    getCurrentBlockType: PropTypes.func
}


//-------------------------------------------------------------------------------------------------------------

/**
 * @param {object} config
 * @param {function} getCurrentBlockType
 * @param {string} button
 * @returns {JSX.Element}
 * @constructor
 */

export const OrderListDotButton = ({config, getCurrentBlockType,button}) => {
    return (
        <button
            key={button}
            onClick={config.action}
            className={getCurrentBlockType() === 'unordered-list-item' ? 'active' : ''}
            aria-label="Unordered List"
        >
            {config.label}
        </button>
    )
}

OrderListDotButton.propTypes = {
    config: PropTypes.object,
    getCurrentBlockType: PropTypes.func,
    button: PropTypes.string
}



//-------------------------------------------------------------------------------------------------------------


/**
 * @param {object} config
 * @param {function} getCurrentBlockType
 * @param {string} button
 * @returns {JSX.Element}
 * @constructor
 */

export const OrderListNumButton = ({config, getCurrentBlockType,button}) => {
    return(
        <button
              key={button}
              onClick={config.action}
              className={getCurrentBlockType() === 'ordered-list-item' ? 'active' : ''}
              aria-label="Ordered List"
            >
              {config.label}
            </button>
    )
}

OrderListNumButton.propTypes = {
    config: PropTypes.object,
    getCurrentBlockType: PropTypes.func,
    button: PropTypes.string
}

//-------------------------------------------------------------------------------------------------------------

/**
 * @param {object} config
 * @param {string} button
 * @returns {JSX.Element}
 * @constructor
 */
export const ExportWordButton = ({config,button})=>{
    return(
        <button
              key={button}
              onClick={config.action}
              className="toolbar-button"
              aria-label="Export to Word"
            >
              {config.label}
            </button>
    )
}

ExportWordButton.propTypes = {
    config: PropTypes.object,
    button: PropTypes.string
}

//-------------------------------------------------------------------------------------------------------------



/**
 * @param {object} config
 * @param {string} button
 * @returns {JSX.Element}
 * @constructor
 */
export const PrintButton = ({config,button})=>{
    return(
        <button
              key={button}
              onClick={config.action}
              className="toolbar-button"
              aria-label="Print"
            >
              {config.label}
            </button>
    )
}

PrintButton.propTypes = {
    config: PropTypes.object,
    button: PropTypes.string
}


//-------------------------------------------------------------------------------------------------------------


/**
 * @param {string} button
 * @param {function} getCurrentBlockType
 * @param {function} onHeadingChange
 * @returns {JSX.Element}
 * @constructor
 */
export const HeadingButton = ({button,getCurrentBlockType,onHeadingChange,headingOptions})=>{
   
    return(
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
    )
}

HeadingButton.propTypes = {
    config: PropTypes.object,
    button: PropTypes.string,
    getCurrentBlockType: PropTypes.func,
    onHeadingChange: PropTypes.func
}






