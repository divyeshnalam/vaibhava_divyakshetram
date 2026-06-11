"use client";

import { useState, useEffect, useCallback } from "react";
import type { ApiState } from "@/types";

export function useApi<T>(fetcher: () => Promise<T>): ApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    setTick((n) => n + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled)
          setState({ data: null, loading: false, error: err.message ?? "Unknown error" });
      });

    return () => {
      cancelled = true;
    };
    // tick is intentionally included — it triggers a re-fetch on refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, tick]);

  return { ...state, refetch };
}