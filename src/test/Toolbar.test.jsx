import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toolbar from '../components/editor/Toolbar';
import { EditorState } from 'draft-js';

describe('Toolbar Component', () => {
  const mockEditorState = EditorState.createEmpty();
  const defaultProps = {
    editorState: mockEditorState,
    toolbarButtons: ['BOLD', 'ITALIC', 'UNDERLINE', 'LINK', 'IMAGE'],
    onToggleInlineStyle: jest.fn(),
    onTextAlignment: jest.fn(),
    onExportToWord: jest.fn(),
    onImageUpload: jest.fn(),
    showLinkInput: false,
    setShowLinkInput: jest.fn(),
    linkUrl: '',
    setLinkUrl: jest.fn(),
    addLink: jest.fn(),
    fileInputRef: { current: null },
    onToggleUnorderedList: jest.fn(),
    onToggleOrderedList: jest.fn(),
    onHeadingChange: jest.fn(),
    onToggleFullscreen: jest.fn(),
    isFullscreen: false,
    onPrint: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all toolbar buttons based on toolbarButtons prop', () => {
    render(<Toolbar {...defaultProps} />);
    
    const expectedButtons = [
      'bold',
      'italic',
      'underline',
      'link',
      'image'
    ];
    
    expectedButtons.forEach(buttonName => {
      expect(screen.getByRole('button', { name: new RegExp(buttonName, 'i') })).toBeInTheDocument();
    });
  });

  it('handles inline style toggling', () => {
    render(<Toolbar {...defaultProps} />);
    
    const boldButton = screen.getByRole('button', { name: /bold/i });
    fireEvent.click(boldButton);
    
    expect(defaultProps.onToggleInlineStyle).toHaveBeenCalledWith('BOLD');
  });

  it('handles text alignment', () => {
    render(<Toolbar {...defaultProps} toolbarButtons={['LEFT', 'CENTER', 'RIGHT']} />);
    
    const centerButton = screen.getByRole('button', { name: /center/i });
    fireEvent.click(centerButton);
    
    expect(defaultProps.onTextAlignment).toHaveBeenCalledWith('center');
  });

  it('handles link input visibility', () => {
    render(<Toolbar {...defaultProps} />);
    
    const linkButton = screen.getByRole('button', { name: /link/i });
    fireEvent.click(linkButton);
    
    expect(defaultProps.setShowLinkInput).toHaveBeenCalledWith(true);
  });

  it('handles link URL input and submission', () => {
    render(
      <Toolbar
        {...defaultProps}
        showLinkInput={true}
      />
    );
    
    const linkInput = screen.getByPlaceholderText(/enter url/i);
    fireEvent.change(linkInput, { target: { value: 'https://example.com' } });
    
    expect(defaultProps.setLinkUrl).toHaveBeenCalledWith('https://example.com');
    
    const addLinkButton = screen.getByRole('button', { name: /add link/i });
    fireEvent.click(addLinkButton);
    
    expect(defaultProps.addLink).toHaveBeenCalled();
  });

  it('handles image upload', () => {
    const mockFileInputRef = { current: document.createElement('input') };
    mockFileInputRef.current.type = 'file';
    mockFileInputRef.current.accept = 'image/*';
    
    render(<Toolbar {...defaultProps} fileInputRef={mockFileInputRef} />);
    
    const imageButton = screen.getByRole('button', { name: /image/i });
    fireEvent.click(imageButton);
    
    // Mock file input
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    Object.defineProperty(mockFileInputRef.current, 'files', {
      value: [file]
    });
    
    fireEvent.change(mockFileInputRef.current);
    expect(defaultProps.onImageUpload).toHaveBeenCalled();
  });

  it('handles list toggling', () => {
    render(<Toolbar {...defaultProps} toolbarButtons={['UNORDERED_LIST', 'ORDERED_LIST']} />);
    
    const unorderedListButton = screen.getByRole('button', { name: /unordered list/i });
    fireEvent.click(unorderedListButton);
    
    expect(defaultProps.onToggleUnorderedList).toHaveBeenCalled();
  });

  it('handles heading changes', () => {
    render(<Toolbar {...defaultProps} toolbarButtons={['HEADING']} />);
    
    const headingSelect = screen.getByRole('combobox', { name: /heading/i });
    fireEvent.change(headingSelect, { target: { value: 'header-one' } });
    
    expect(defaultProps.onHeadingChange).toHaveBeenCalledWith('header-one');
  });

  it('handles fullscreen toggle', () => {
    render(<Toolbar {...defaultProps} toolbarButtons={['FULLSCREEN']} />);
    
    const fullscreenButton = screen.getByRole('button', { name: /fullscreen/i });
    fireEvent.click(fullscreenButton);
    
    expect(defaultProps.onToggleFullscreen).toHaveBeenCalled();
  });

  it('handles print functionality', () => {
    render(<Toolbar {...defaultProps} toolbarButtons={['PRINT']} />);
    
    const printButton = screen.getByRole('button', { name: /print/i });
    fireEvent.click(printButton);
    
    expect(defaultProps.onPrint).toHaveBeenCalled();
  });

  it('handles export to word', () => {
    render(<Toolbar {...defaultProps} toolbarButtons={['EXPORT_WORD']} />);
    
    const exportButton = screen.getByRole('button', { name: /export to word/i });
    fireEvent.click(exportButton);
    
    expect(defaultProps.onExportToWord).toHaveBeenCalled();
  });
}); 