# React WYSIWYG Rich Text Editor

A powerful and flexible rich text editor built with React and draft-js. Developed by Mohammad Al-Halabi.

[![GitHub](https://img.shields.io/github/license/mohammad-rex-craft/WYSIWYG-Editor)](https://github.com/mohammad-rex-craft/WYSIWYG-Editor/blob/master/LICENSE)

## Author

Developed by Mohammad Al-Halabi


## Features

- Supports both Controlled and Uncontrolled modes
- Basic text formatting (bold, italic, underline)
- Customizable toolbar
- Custom formatting support
- TypeScript support
- Unit testing
- Modern and clean UI
- Fully customizable styling

## Installation

To install the project, run the following command:

```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

## Testing

To run the tests:

```bash
npm test
```

## Usage

### Basic Usage

```jsx
import RichEditor from './components/RichEditor';

function App() {
  return <RichEditor />;
}
```

### Controlled Mode

```jsx
import { useState } from 'react';
import RichEditor from './components/RichEditor';

function App() {
  const [value, setValue] = useState('');

  return (
    <RichEditor
      value={value}
      onChange={setValue}
    />
  );
}
```

### Uncontrolled Mode with Initial Content

```jsx
import RichEditor from './components/RichEditor';

function App() {
  const initialContent = JSON.stringify({
    blocks: [
      {
        key: 'initial',
        text: 'Initial content',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ],
    entityMap: {}
  });

  return <RichEditor initialContent={initialContent} />;
}
```

### Custom Styling

```jsx
import RichEditor from './components/RichEditor';

function App() {
  return (
    <RichEditor
      className="custom-editor"
      style={{ border: '2px solid blue' }}
    />
  );
}
```

### Custom Toolbar

The `renderToolbar` prop allows you to create a completely custom toolbar. The toolbar configuration supports various formatting options and actions. Here's a detailed example:

```jsx
import RichEditor from './components/RichEditor';
import { PrintIcon, ExportIcon, ImageIcons, LinkIcon, ListDoteIcon, ListNumIcon, FullScreenIcon, ExitFullScreenIcon } from './icons';

function App() {
  const customToolbar = (state, setState, config) => {
    const handleEditorStateChange = (newState) => {
      setState(newState);
    };

    // Toolbar configuration object
    const toolbarConfig = {
      // Print functionality
      print: { 
        action: handlePrint, 
        label: <PrintIcon /> 
      },
      
      // Export functionality
      export: { 
        action: handleExport, 
        label: <ExportIcon /> 
      },
      
      // Image upload functionality
      image: { 
        action: handleImageUpload, 
        label: <ImageIcons /> 
      },
      
      // Link functionality with input field
      link: { 
        action: handleAddLink, 
        label: <LinkIcon />,
        showInput: showLinkInput,
        setShowInput: setShowLinkInput,
        url: linkUrl,
        setUrl: setLinkUrl
      },
      
      // Heading options
      heading: { 
        action: handleHeadingChange, 
        label: 'Heading',
        headingOptions: [
          { value: 'H1', label: 'Heading 1' },
          { value: 'H2', label: 'Heading 2' },
          { value: 'H3', label: 'Heading 3' }
        ]
      },
      
      // Unordered list
      orderedListDot: { 
        action: handleToggleUnorderedList, 
        label: <ListDoteIcon /> 
      },
      
      // Ordered list
      orderedListNum: { 
        action: handleToggleOrderedList, 
        label: <ListNumIcon /> 
      },
      
      // Fullscreen toggle
      fullscreen: { 
        action: handleToggleFullscreen, 
        label: isFullscreen ? <ExitFullScreenIcon /> : <FullScreenIcon />, 
        isActive: isFullscreen 
      }
    };

    return (
      <div className="custom-toolbar">
        {/* Render your toolbar buttons using the config */}
        {Object.entries(toolbarConfig).map(([key, option]) => (
          <button 
            key={key}
            onClick={option.action}
            className={option.isActive ? 'active' : ''}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  return <RichEditor renderToolbar={customToolbar} />;
}
```

#### Toolbar Configuration Options

The toolbar configuration object supports the following options:

| Option | Type | Description |
|--------|------|-------------|
| `print` | object | Adds print functionality to the editor |
| `export` | object | Adds export functionality to save content |
| `image` | object | Enables image upload functionality |
| `link` | object | Adds link insertion with URL input field |
| `heading` | object | Provides heading options (H1, H2, H3) |
| `orderedListDot` | object | Adds unordered (bullet) list functionality |
| `orderedListNum` | object | Adds ordered (numbered) list functionality |
| `fullscreen` | object | Adds fullscreen toggle functionality |

Each option object can contain the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `action` | function | The function to execute when the button is clicked |
| `label` | ReactNode | The button label (can be text or an icon component) |
| `showInput` | boolean | (For link) Controls visibility of URL input field |
| `setShowInput` | function | (For link) Function to toggle URL input visibility |
| `url` | string | (For link) The current URL value |
| `setUrl` | function | (For link) Function to update URL value |
| `headingOptions` | array | (For heading) Array of heading level options |
| `isActive` | boolean | Indicates if the button is in active state |

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| value | string | Editor content in JSON format (Controlled mode) | - |
| onChange | function | Function called when content changes (Controlled mode) | - |
| initialContent | string | Initial content in JSON format (Uncontrolled mode) | - |
| className | string | Custom CSS class name | - |
| style | object | Custom CSS styles | - |
| renderToolbar | function | Custom toolbar render function | - |
| placeholder | string | Placeholder text when editor is empty | 'Start typing...' |
| readOnly | boolean | Makes the editor read-only | false |
| autoFocus | boolean | Automatically focuses the editor on mount | false |
| spellCheck | boolean | Enables browser spell checking | true |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request





## Repository

[GitHub Repository](https://github.com/mohammad-rex-craft/WYSIWYG-Editor)
