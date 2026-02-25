export {};

declare global {
  interface Window {
    RESET?: () => void;
    mixpanel?: { reset: () => void; [key: string]: unknown };
  }
}
