import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow, Theme, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { CMSTableColumnType } from './types';


const styles = {
  row: (theme: Theme) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  cell: {
    display: 'flex',
    justifyContent: 'end'
  },
};

interface CMSTableBodyRowProps<T> {
  columns: CMSTableColumnType<T>[];
  editButton?: boolean;
  idField: keyof T;
  item: T;
  url: string;
  onDelete: (item: any) => void;
}

export function CMSTableBodyRow<T>({
  columns,
  editButton = true,
  idField,
  item,
  url,
  onDelete
}: CMSTableBodyRowProps<T>) {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <TableRow sx={styles.row}>
      {columns.map((column, columnIndex) => (
        <TableCell
          key={columnIndex}
          sx={{display: column.hide && !isMdUp ? 'none' : undefined}}
        >
          {String(item[column.key])}
        </TableCell>
      ))}
      <TableCell style={styles.cell}>
        {!editButton ? null : (
          <IconButton
            color="primary"
            component={Link}
            to={`${url}${item[idField]}`}
          >
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          color="error"
          component="label"
          onClick={() => onDelete(item)}
        >
          <DeleteIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
