import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

export function CMSTable({
  items = [],
  columns = [],
  url = '',
  onDelete = () => {},
}) {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  if(items.length === 0) {
    return (
      <Typography align="center">
        Nada por aquí todavía 👀...
      </Typography>
    );
  }

  function handleDelete(item) {
    onDelete(item);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
          }}>
            {columns.map(column => (
              <TableCell sx={{
                color: 'inherit',
                display: column.hide && !isMdUp ? 'none' : undefined,
              }}>
                {column.name}
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              {columns.map(column => (
                <TableCell
                  sx={{display: column.hide && !isMdUp ? 'none' : undefined}}
                >
                  {item[column.key]}
                </TableCell>
              ))}
              <TableCell style={{display: 'flex', justifyContent: 'end'}}>
                <IconButton
                  color="primary"
                  component={Link}
                  to={`${url}${item.id}`}
                >
                  <EditIcon/>
                </IconButton>
                <IconButton
                  color="error"
                  component="label"
                  onClick={() => handleDelete(item)}
                >
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
