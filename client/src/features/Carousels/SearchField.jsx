import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { forwardRef } from "react";

export const SearchField = forwardRef(({ onSearch, ...props }, ref) => {

  function handleKeyDown(event) {
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
