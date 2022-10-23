import { IconButton, TableCell, TableRow, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";


const styles = {
  row: (theme) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }),
  cell: {
    display: 'flex',
    justifyContent: 'end'
  },
};

export function CMSTableBodyRow({ columns, item, url, onDelete }) {

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
