import AsyncSelect from 'react-select/async';

let timeout = null;

/**
 * Load contents with delay
 */
function loadContents(searchText, callback, fetchCallback, delay) {
  // Reset timeout after each key stroke
  clearTimeout(timeout);
  // Start a timer... 
  timeout = setTimeout(function() {
    fetchCallback(searchText, callback);
  }, delay);
}

export function DelayedAsyncSelect({delay, fetchCallback, ...props}) {
  return (
    <AsyncSelect
      {...props}
      loadOptions={(text, callback) => loadContents(text, callback, fetchCallback, delay)}
    />
  )
}
