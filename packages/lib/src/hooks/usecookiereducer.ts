"use client";

import { useReducer, useEffect, Reducer } from "react";
import { getCookie, setCookie } from "@icat/lib/utils";

export function useCookieReducer<State, Action>(
  key: string,
  reducer: Reducer<State, Action>,
  initialState: State
): [State, React.Dispatch<Action>] {
  const initializer = (): State => {
    try {
      const stored = getCookie(key);
      if (stored) {
        return JSON.parse(stored) as State;
      }
      return initialState;
    } catch (err) {
      console.error("useCookieReducer: failed to parse cookie state.", err);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    try {
      setCookie(key, JSON.stringify(state), 7);
    } catch (err) {
      console.error("useCookieReducer: failed to save state.", err);
    }
  }, [key, state]);

  return [state, dispatch];
}