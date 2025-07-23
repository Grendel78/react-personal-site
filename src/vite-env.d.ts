/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | number,
      config?: Record<string, unknown>
    ) => void;
  }
}

declare function gtag(
  command: 'config' | 'event' | 'js' | 'set',
  targetId: string | Date | number,
  config?: Record<string, unknown>
): void;
