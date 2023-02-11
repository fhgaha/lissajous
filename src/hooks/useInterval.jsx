import React, { useState, useEffect, useRef } from 'react';

export function useInterval(callback, delay_ms) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay_ms !== null) {
      let id = setInterval(tick, delay_ms);
      return () => clearInterval(id);
    }
  }, [delay_ms]);
}
