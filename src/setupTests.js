// Mock window.open
window.open = jest.fn(() => ({
  document: {
    write: jest.fn(),
    close: jest.fn()
  }
}));

// Mock URL.createObjectURL
window.URL.createObjectURL = jest.fn(() => 'mock-url');

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined)
  }
});

// Mock alert
window.alert = jest.fn(); 