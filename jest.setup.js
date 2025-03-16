import "@testing-library/jest-dom";

// ✅ Mock clipboard API (Fixes 'navigator' error)
Object.defineProperty(global, "navigator", {
  value: { clipboard: { writeText: jest.fn() } },
  writable: true,
});
