import { useState, useEffect } from 'react';

export interface ParsedRoute {
  path: string;
  params: Record<string, string>;
  fullHash: string;
}

export function parseHash(hash: string): ParsedRoute {
  // Clean hash: trim leading '#' and '/'
  let cleanHash = hash.replace(/^#\/?/, '');
  if (!cleanHash) {
    cleanHash = '';
  }

  const parts = cleanHash.split('/');
  const pathParts: string[] = [];
  const params: Record<string, string> = {};

  // Simple matching logic
  // e.g. services/bridal-makeup -> path = "services/:slug", params = { slug: "bridal-makeup" }
  if (parts[0] === 'services' && parts[1]) {
    return {
      path: 'services/:slug',
      params: { slug: parts[1] },
      fullHash: hash
    };
  }

  if (parts[0] === 'artists' && parts[1]) {
    return {
      path: 'artists/:slug',
      params: { slug: parts[1] },
      fullHash: hash
    };
  }

  // Fallback to exact path mapping
  return {
    path: cleanHash || 'home',
    params: {},
    fullHash: hash
  };
}

export function useHashRoute() {
  const [route, setRoute] = useState<ParsedRoute>(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      // Scroll to top of page on hash transition for professional feel
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (hashPath: string) => {
    window.location.hash = hashPath.startsWith('/') ? hashPath : `/${hashPath}`;
  };

  return { ...route, navigate };
}
