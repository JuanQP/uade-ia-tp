import { TableCell, useMediaQuery, useTheme } from "@mui/material";

export function CMSTableHeadCell({ column }) {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <TableCell
      sx={{
        color: 'inherit',
        display: column.hide && !isMdUp ? 'none' : undefined,
      }}
    >
      {column.name}
    </TableCell>
  )
}
