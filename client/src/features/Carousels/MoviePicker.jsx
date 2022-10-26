import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useRef, useState } from "react";
import { ContentCard } from "./ContentCard";
import { SearchField } from "./SearchField";
import { moveToBeginning, moveToEnd, moveToLeft, moveToRight } from "./utils";

function idExistsIn(oneContent, contents) {
  return contents.some(c => c.id === oneContent.id);
}

/**
 * Adds an order field in content.ContenidoCarrusel.order
 */
function addOrderField(content, index) {
  return {
    ...content,
    ContenidoCarrusel: {
      order: index + 1,
    },
  };
}

function mergeValuesWithNewContents(values, newContents) {
  const sortedValues = values
    .map(addOrderField)
  const contentsWithoutRepeat = newContents
    .filter(c => !idExistsIn(c, values))

  return sortedValues.concat(contentsWithoutRepeat);
}

export function MoviePicker({ values = [], onChange = () => {} }) {

  const [searchResults, setSearchResults] = useState([]);
  const searchFieldRef = useRef(null);
  const contents = mergeValuesWithNewContents(values, searchResults);

  async function handleSearch() {
    try {
      const response = await axios.get("/api/contenidos", {
        params: { title: searchFieldRef.current.value, format: 'card' },
      });
      setSearchResults(response.data.results);
    } catch (error) {

    }
  }

  function deleteContent(values, content) {
    return values
      .filter(value => value.id !== content.id)
  }

  function handleContentClick(content) {
    const isContentInValues = values.some(value => value.id === content.id);
    let newValues = [];

    if (isContentInValues) {
      newValues = deleteContent(values, content);
    } else {
      newValues = [...values, content];
    }
    onChange(newValues.map(addOrderField));
  }

  function handleMoveToFirst(content) {
    const newValues = moveToBeginning(values, content);
    onChange(newValues.map(addOrderField));
  }

  function handleMoveToLeft(content) {
    const newValues = moveToLeft(values, content);
    onChange(newValues.map(addOrderField));
  }
  function handleMoveToRight(content) {
    const newValues = moveToRight(values, content);
    onChange(newValues.map(addOrderField));
  }

  function handleMoveToLast(content) {
    const newValues = moveToEnd(values, content);
    onChange(newValues.map(addOrderField));
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
            placeholder="Dejá este campo vacío para traer todos los contenidos 🎥"
            inputRef={searchFieldRef}
            helperText={`Se encontraron ${searchResults.length} resultados para la última búsqueda.`}
            onSearch={handleSearch}
          />
        </Grid>
        <Grid xs={12}>
          {values.length === 0 ? (
            <Typography fontStyle="italic" color="neutral">
              No hay películas seleccionadas 🤔
            </Typography>
          ) : (
            <Typography>
              {values.length} {multipleContents ? 'películas seleccionadas' : 'película seleccionada'}
            </Typography>
          )}
        </Grid>
        {contents.length === 0 && (
          <Box display="flex" flexDirection="column" width="100%" alignItems="center" justifyContent="center">
            <Typography fontStyle="italic" color="neutral">
              No hay películas para esta búsqueda 🧐
            </Typography>
            <Typography fontStyle="italic" color="neutral">
              Probá con otro título 👆
            </Typography>
          </Box>
        )}
        {contents.map((content) => (
          <Grid key={content.id} xs={12} sm={6} md={4} lg={3}>
            <ContentCard
              content={content}
              values={values}
              onClick={handleContentClick}
              onMoveToFirst={handleMoveToFirst}
              onMoveToLeft={handleMoveToLeft}
              onMoveToRight={handleMoveToRight}
              onMoveToLast={handleMoveToLast}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
