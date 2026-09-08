import { useEffect, useState } from 'react';
import { siteMeta } from '../data/portfolioData';

/**
 * Guards against linking to a 404: both the Vite dev server and Vercel's SPA rewrite
 * respond 200 with the index.html shell for any unmatched path, so `res.ok` alone can't
 * tell a real PDF from a missing one — the content type can.
 */
export function useResumeAvailability(): boolean {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(siteMeta.resumePath, { method: 'HEAD' })
      .then((res) => {
        const isPdf = (res.headers.get('content-type') ?? '').includes('pdf');
        if (!cancelled) setAvailable(res.ok && isPdf);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return available;
}
