declare global {
  interface Window {
    RESET: () => void;
    mixpanel: any;
  }
}

export {};
