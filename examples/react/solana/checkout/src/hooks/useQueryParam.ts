import {useSearchParams} from 'react-router-dom';
import {useCallback, useEffect} from 'react';

export function useQueryParam<T>(
  name: string,
  initialValue: T
): [value: T, setValue: (newValue: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(name) as T;

  const setValue = useCallback(
    (newValue: T) => {
      searchParams.set(name, newValue as string);
      setSearchParams(searchParams);
    },
    [name, searchParams, setSearchParams]
  );

  useEffect(() => {
    if (!value) setValue(initialValue);
  }, [initialValue, setValue, value]);

  return [value ? value : initialValue, setValue];
}
