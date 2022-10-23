import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export function SearchField({ onSearch,...props}) {
  return (
    <TextField
      {...props}
      type="search"
      onKeyDown={(e) => e.key === 'Enter' && onSearch()}
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
}
