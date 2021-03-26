import { useCallback, useEffect, useRef, useState } from 'react';

function useDebouncer({ timeout = 700 } = {}) {
  const debouncer = useRef(null);
  const [debounceFn, setDebounceFn] = useState(null);

  const debounce = useCallback(
    (fn) => {
      setDebounceFn(() => fn);
    },
    [setDebounceFn]
  );

  useEffect(() => {
    debouncer.current = setTimeout(() => debounceFn && debounceFn(), timeout);

    return () => clearTimeout(debouncer.current);
  }, [timeout, debounceFn]);

  return debounce;
}

export { useDebouncer };
