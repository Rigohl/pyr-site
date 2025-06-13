import { useEffect } from 'react';

declare global {
  interface Window { plausible?: (event: string, opts?: object) => void; }
}

export function useAnalytics(event: string, opts?: object) {
  useEffect(() => {
    window.plausible?.(event, opts);
  }, [event, opts]);
}
