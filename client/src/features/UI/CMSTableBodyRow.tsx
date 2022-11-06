import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TableCell, TableRow, Theme, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Column } from './CMSTable';


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

interface CMSTableBodyRowProps {
  item: any;
  columns: Column[];
  url: string;
  onDelete: (item: any) => void;
}

export function CMSTableBodyRow({ columns, item, url, onDelete }: CMSTableBodyRowProps) {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <TableRow sx={styles.row}>
      {columns.map((column, columnIndex) => (
        <TableCell
          key={columnIndex}
          sx={{display: column.hide && !isMdUp ? 'none' : undefined}}
        >
          {item[column.key]}
        </TableCell>
      ))}
      <TableCell style={styles.cell}>
        <IconButton
          color="primary"
          component={Link}
          to={`${url}${item.id}`}
        >
          <EditIcon />
        </IconButton>
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
