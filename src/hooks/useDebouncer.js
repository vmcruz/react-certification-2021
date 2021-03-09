import { useEffect, useRef, useState } from 'react';

function useDebouncer({ timeout = 700 } = {}) {
  const debouncer = useRef(null);
  const [debounceFn, setDebounceFn] = useState(null);

  function debounce(fn) {
    setDebounceFn(() => fn);
  }

  useEffect(() => {
    debouncer.current = setTimeout(() => debounceFn && debounceFn(), timeout);

    return () => clearTimeout(debouncer.current);
  }, [timeout, debounceFn]);

  return { debounce };
}

export { useDebouncer };
