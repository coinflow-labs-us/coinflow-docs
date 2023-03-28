import {useCallback, useEffect, useMemo, useState} from 'react';

export function useQueryParam<T>(
  name: string,
  initialValue: T
): [value: T, setValue: (newValue: T) => void] {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams(document.location.search)
  );

  function doSetSearchParams(queryParams: URLSearchParams) {
    const newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?' +
      queryParams.toString();

    setSearchParams(new URLSearchParams(queryParams.toString()));
    window.history.pushState({path: newUrl}, '', newUrl);
  }

  const value = useMemo(() => {
    return searchParams.get(name) as T;
  }, [searchParams]);

  const setValue = useCallback(
    (newValue: T) => {
      const updatedSearchParams = new URLSearchParams(document.location.search);
      updatedSearchParams.set(name, newValue as string);
      doSetSearchParams(updatedSearchParams);
    },
    [name, searchParams, doSetSearchParams]
  );

  useEffect(() => {
    if (!value) setValue(initialValue);
  }, [initialValue, setValue, value]);

  return [value || initialValue, setValue];
}
