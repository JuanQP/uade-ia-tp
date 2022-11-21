import { TableCell, useMediaQuery, useTheme } from "@mui/material";
import { CMSTableColumnType } from "./types";

interface Props<T> {
  column: CMSTableColumnType<T>;
}

export function CMSTableHeadCell<T>({ column }: Props<T>) {

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
