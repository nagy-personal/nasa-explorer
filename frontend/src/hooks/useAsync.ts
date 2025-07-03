import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAsyncOptions {
  immediate?: boolean;
  cacheKey?: string;
  cacheTime?: number;
}

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const { immediate = false, cacheKey, cacheTime = 5 * 60 * 1000 } = options;
  
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map());
  const currentCacheKeyRef = useRef<string | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      // Cancel previous request if it's still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      // Check cache first
      if (currentCacheKeyRef.current) {
        const cached = cacheRef.current.get(currentCacheKeyRef.current);
        if (cached && Date.now() - cached.timestamp < cacheTime) {
          setState({ data: cached.data, loading: false, error: null });
          return cached.data;
        }
      }

      setState({ data: null, loading: true, error: null });

      try {
        const result = await asyncFunction(...args);
        
        // Cache the result
        if (currentCacheKeyRef.current) {
          cacheRef.current.set(currentCacheKeyRef.current, {
            data: result,
            timestamp: Date.now(),
          });
        }

        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // Request was cancelled, don't update state
          return;
        }
        
        console.error('useAsync error:', error);
        setState({ data: null, loading: false, error: error as Error });
        return null;
      }
    },
    [asyncFunction, cacheTime] // Remove cacheKey from dependencies to prevent recreation
  );

  // Update cache key ref when it changes
  useEffect(() => {
    currentCacheKeyRef.current = cacheKey || null;
  }, [cacheKey]);

  const clearCache = useCallback(() => {
    if (currentCacheKeyRef.current) {
      cacheRef.current.delete(currentCacheKeyRef.current);
    }
  }, []);

  const clearAllCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    clearCache,
    clearAllCache,
  };
}

export default useAsync; 