import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { setFieldValue } from "../utils";
import axios from "axios";
import { SearchField } from "./SearchField";
import { ContentCard } from "../Pages/Content/ContentCard";
import { useEffect } from "react";

function idExistsIn(oneContent, contents) {
  return contents.some(c => c.id === oneContent.id);
}

function mergeValuesWithNewContents(values, newContents) {
  const contentsWithoutRepeat = newContents.filter(c => !idExistsIn(c, values));
  return [
    ...values,
    ...contentsWithoutRepeat,
  ];
}

export function MoviePicker({ values = [], onChange = () => {} }) {

  const [searchText, setSearchText] = useState('');
  const [contents, setContents] = useState([...values]);

  useEffect(() => {
    const newContents = mergeValuesWithNewContents(values, contents);
    setContents([
      ...newContents,
    ]);
  }, [values]);

  async function handleSearch() {
    try {
      const response = await axios.get("/api/contenidos", {
        params: { title: searchText, format: 'card' },
      });
      const newContents = mergeValuesWithNewContents(values, response.data.results);
      setContents([
        ...newContents,
      ]);
    } catch (error) {

    }
  }

  function deleteContent(values, content) {
    return values.filter(value => value.id !== content.id);
  }

  function handleContentClick(content) {
    const isContentInValues = values.some(value => value.id === content.id);
    if(isContentInValues) {
      const newValues = deleteContent(values, content);
      onChange(newValues);
    } else {
      onChange([...values, content]);
    }
  }

  function handleContentDelete(content) {
    const newValues = deleteContent(values, content);
    onChange(newValues);
  }

  const multipleContents = values.length > 1;

  return (
    <Box>
      <Typography>Contenidos de este carrusel</Typography>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <SearchField
            fullWidth
            label="Buscar películas"
            variant="standard"
            value={searchText}
            placeholder="Dejá este campo vacío para traer todos los contenidos 🎥"
            onSearch={handleSearch}
            onChange={setFieldValue(setSearchText)}
          />
        </Grid>
        <Grid xs={12}>
          {values.length === 0 ? (
            <Typography fontStyle="italic" color="neutral">No hay películas seleccionadas 🤔</Typography>
          ) : (
            <Typography>{values.length} {multipleContents ? 'películas seleccionadas' : 'película seleccionada'}</Typography>
          )}
        </Grid>
        {contents.length === 0 && (
          <Box display="flex" flexDirection="column" width="100%" alignItems="center" justifyContent="center">
            <Typography fontStyle="italic" color="neutral">No hay películas para esta búsqueda 🧐</Typography>
            <Typography fontStyle="italic" color="neutral">Probá con otro título 👆</Typography>
          </Box>
        )}
        {contents.map((content) => (
          <Grid key={content.id} xs={12} sm={6} md={4} lg={3}>
            <ContentCard content={content} values={values} onClick={handleContentClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
