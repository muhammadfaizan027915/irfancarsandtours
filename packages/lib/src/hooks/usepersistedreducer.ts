"use client";

import { useReducer, useEffect, Reducer } from "react";

export function usePersistedReducer<State, Action>(
  key: string,
  reducer: Reducer<State, Action>,
  initialState: State
): [State, React.Dispatch<Action>] {
  const initializer = (): State => {
    if (typeof window === "undefined") {
      return initialState;
    }
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored) as State;
      } else {
        return initialState;
      }
    } catch (err) {
      console.error("usePersistedReducer: failed to parse stored state.", err);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error("usePersistedReducer: failed to save state.", err);
    }
  }, [key, state]);

  return [state, dispatch];
}
