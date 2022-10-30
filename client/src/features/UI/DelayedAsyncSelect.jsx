import { forwardRef, useRef } from 'react';
import AsyncSelect from 'react-select/async';

export const DelayedAsyncSelect = forwardRef(
  ({ delay, fetchCallback, ...props }, ref) => {

  const timeout = useRef(null);

  /**
   * Load contents with delay
   */
  function loadContents(searchText, callback, fetchCallback, delay) {
    // Reset timeout after each key stroke
    clearTimeout(timeout.current);
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
