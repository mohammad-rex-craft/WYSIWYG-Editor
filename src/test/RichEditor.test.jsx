import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import RichEditor from '../components/RichEditor';

// Mock window.URL methods
const mockCreateObjectURL = jest.fn();
const mockRevokeObjectURL = jest.fn();
window.URL.createObjectURL = mockCreateObjectURL;
window.URL.revokeObjectURL = mockRevokeObjectURL;

// Mock window.open
const mockOpen = jest.fn();
const mockPrintWindow = {
  document: {
    write: jest.fn(),
    close: jest.fn()
  },
  focus: jest.fn(),
  print: jest.fn(),
  close: jest.fn()
};
window.open = mockOpen;

describe('RichEditor Component', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    placeHolder: 'Enter text here...',
    className: 'test-editor',
    toolbarButtons: ['BOLD', 'ITALIC', 'UNDERLINE'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockReturnValue('blob:test-url');
    mockOpen.mockReturnValue(mockPrintWindow);
  });

  it('renders with default props', () => {
    render(<RichEditor {...defaultProps} />);
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('aria-describedby');
  });

  it('renders in controlled mode with value', () => {
    const value = JSON.stringify({
      blocks: [
        {
          key: 'test',
          text: 'Test content',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    });

    render(<RichEditor {...defaultProps} value={value} onChange={mockOnChange} />);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('handles toolbar button clicks', () => {
    render(<RichEditor {...defaultProps} />);
    const boldButton = screen.getByRole('button', { name: /bold/i });
    expect(boldButton).toBeInTheDocument();
    fireEvent.click(boldButton);
  });

  it('handles fullscreen toggle', () => {
    render(<RichEditor {...defaultProps} toolbarButtons={['FULLSCREEN']} />);
    
    const fullscreenButton = screen.getByRole('button', { name: /fullscreen/i });
    fireEvent.click(fullscreenButton);
    
    const editorContainer = screen.getByRole('textbox').closest('.rich-editor');
    expect(editorContainer).toHaveClass('fullscreen');
  });

  it('handles image upload', () => {
    render(<RichEditor {...defaultProps} toolbarButtons={['IMAGE']} />);
    
    const imageButton = screen.getByRole('button', { name: /image/i });
    fireEvent.click(imageButton);
    
    // Mock file input
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    
    fireEvent.change(fileInput);
  });

  it('handles link insertion', () => {
    render(<RichEditor {...defaultProps} toolbarButtons={['LINK']} />);
    
    const linkButton = screen.getByRole('button', { name: /link/i });
    fireEvent.click(linkButton);
    
    const linkInput = screen.getByPlaceholderText(/enter url/i);
    fireEvent.change(linkInput, { target: { value: 'https://example.com' } });
    
    const addLinkButton = screen.getByRole('button', { name: /add link/i });
    fireEvent.click(addLinkButton);
  });

  it('handles text alignment', () => {
    render(<RichEditor {...defaultProps} toolbarButtons={['LEFT', 'CENTER', 'RIGHT']} />);
    
    const centerButton = screen.getByRole('button', { name: /center/i });
    fireEvent.click(centerButton);
    
    // Mock the editor state change
    const editor = screen.getByRole('textbox');
    fireEvent.keyDown(editor, { key: 'a' });
  });

  it('handles list toggling', () => {
    render(<RichEditor {...defaultProps} toolbarButtons={['UNORDERED_LIST', 'ORDERED_LIST']} />);
    
    const unorderedListButton = screen.getByRole('button', { name: /unordered list/i });
    fireEvent.click(unorderedListButton);
    
    // Mock the editor state change
    const editor = screen.getByRole('textbox');
    fireEvent.keyDown(editor, { key: 'a' });
  });

  it('handles export to word', () => {
    render(<RichEditor {...defaultProps} toolbarButtons={['EXPORT_WORD']} />);
    
    const exportButton = screen.getByRole('button', { name: /export to word/i });
    fireEvent.click(exportButton);
    
    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });

  it('handles print functionality', () => {
    render(<RichEditor {...defaultProps} toolbarButtons={['PRINT']} />);
    
    const printButton = screen.getByRole('button', { name: /print/i });
    fireEvent.click(printButton);
    
    expect(mockOpen).toHaveBeenCalled();
    expect(mockPrintWindow.document.write).toHaveBeenCalled();
    expect(mockPrintWindow.document.close).toHaveBeenCalled();
    expect(mockPrintWindow.focus).toHaveBeenCalled();
    expect(mockPrintWindow.print).toHaveBeenCalled();
    expect(mockPrintWindow.close).toHaveBeenCalled();
  });

  it('handles custom toolbar rendering', () => {
    const customToolbar = (state, setState) => (
      <div data-testid="custom-toolbar">
        <button>Custom Button</button>
      </div>
    );
    
    render(
      <RichEditor
        {...defaultProps}
        renderToolbar={customToolbar}
      />
    );
    
    expect(screen.getByTestId('custom-toolbar')).toBeInTheDocument();
  });
});
