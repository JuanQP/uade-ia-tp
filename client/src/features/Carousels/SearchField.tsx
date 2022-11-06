import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { forwardRef, KeyboardEvent } from "react";

type SearchFieldProps = TextFieldProps & {
  onSearch: () => void;
};

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(({ onSearch, ...props }, ref) => {

  function handleKeyDown(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      event.preventDefault();
      onSearch();
    }
  }

  return (
    <TextField
      {...props}
      inputRef={ref}
      type="search"
      onKeyDown={handleKeyDown}
      InputProps={{
        inputMode: 'search',
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={onSearch}
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
})
