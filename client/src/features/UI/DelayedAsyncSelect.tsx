import { forwardRef, useRef } from 'react';
import { SelectInstance } from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import { DelayedFetchCallback, ReactSelectCallbackType } from '../Contents/StepperForm/types';

type DASProps = AsyncProps<any,any,any> & {
  delay: number;
  fetchCallback: DelayedFetchCallback;
}

export const DelayedAsyncSelect = forwardRef<SelectInstance, DASProps>(
  ({ delay, fetchCallback, ...props }, ref) => {

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Load contents with delay
   */
  function loadContents(
    searchText: string,
    callback: ReactSelectCallbackType,
    fetchCallback: DelayedFetchCallback,
    delay: number
  ) {
    // Reset timeout after each key stroke
    clearTimeout(timeout.current!);
    // Start a timer...
    timeout.current = setTimeout(function() {
      fetchCallback(searchText, callback);
    }, delay);
  }

  return (
    <AsyncSelect
      {...props}
      ref={ref}
      styles={{
        control: base => ({
          ...base,
          fontFamily: 'Roboto',
        }),
        menu: base => ({
          ...base,
          fontFamily: 'Roboto',
        }),
      }}
      loadOptions={(text, callback) => loadContents(text, callback, fetchCallback, delay)}
    />
  )
})
