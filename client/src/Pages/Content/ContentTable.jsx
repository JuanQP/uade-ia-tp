import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

export function ContentTable({contents, ...props}) {

  if(contents.length === 0) {
    return (
      <Typography>Todavía no hay contenidos creados 😅...</Typography>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Título</TableCell>
          <TableCell>Año</TableCell>
          <TableCell>Duración</TableCell>
          <TableCell>Director</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contents.map((content) => (
          <TableRow key={content.id}>
            <TableCell>{content.id}</TableCell>
            <TableCell>{content.title}</TableCell>
            <TableCell>{content.year}</TableCell>
            <TableCell>{content.duration}</TableCell>
            <TableCell>{content.director}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}