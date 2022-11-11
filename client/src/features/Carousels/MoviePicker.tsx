import { contentAPI } from '@features/Contents';
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ContentCard } from "./ContentCard";
import { SearchField } from "./SearchField";
import { moveToBeginning, moveToEnd, moveToLeft, moveToRight } from "./utils";

function idExistsIn(oneContent: CardFormatContent, contents: CardFormatContent[]) {
  return contents.some(c => c.id === oneContent.id);
}

/**
 * Adds an order field in content.ContenidoCarrusel.order
 */
function addOrderField(content: CardFormatContent, index: number) {
  return {
    ...content,
    order: index + 1,
  };
}

function mergeValuesWithNewContents(
  values: CardFormatContent[],
  newContents: CardFormatContent[],
) {
  const sortedValues = values.map(addOrderField);
  const contentsWithoutRepeat = newContents
    .filter(c => !idExistsIn(c, values))
    .map(addOrderField);
  return sortedValues.concat(contentsWithoutRepeat);
}

interface MoviePickerProps {
  values: CardFormatContent[];
  error: boolean;
  helperText: string;
  onBlur: () => void;
  onChange: (values: CardFormatContent[]) => void;
}

export const MoviePicker = forwardRef<HTMLInputElement, MoviePickerProps>(({
  values = [],
  onBlur = () => {},
  onChange = (values) => {},
  ...props
}, forwardRef) => {

  const [searchResults, setSearchResults] = useState<CardFormatContent[]>([]);
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const contents = mergeValuesWithNewContents(values, searchResults);
  useImperativeHandle(forwardRef, () => searchFieldRef.current!);

  async function handleSearch() {
    try {
      const { results } = await contentAPI.fetchContents({
        title: searchFieldRef.current!.value,
        format: 'card',
      });
      setSearchResults(results);
    } catch (error) {

    }
  }

  function deleteContent(values: CardFormatContent[], content: CardFormatContent) {
    return values
      .filter(value => value.id !== content.id)
  }

  function handleContentClick(content: CardFormatContent) {
    const isContentInValues = values.some(value => value.id === content.id);
    let newValues = [];

    if (isContentInValues) {
      newValues = deleteContent(values, content);
    } else {
      newValues = [...values, content];
    }
    onChange(newValues.map(addOrderField));
  }

  function handleMoveToFirst(content: CardFormatContent) {
    const newValues = moveToBeginning(values, content);
    onChange(newValues.map(addOrderField));
  }

  function handleMoveToLeft(content: CardFormatContent) {
    const newValues = moveToLeft(values, content);
    onChange(newValues.map(addOrderField));
  }
  function handleMoveToRight(content: CardFormatContent) {
    const newValues = moveToRight(values, content);
    onChange(newValues.map(addOrderField));
  }

  function handleMoveToLast(content: CardFormatContent) {
    const newValues = moveToEnd(values, content);
    onChange(newValues.map(addOrderField));
  }

  const multipleContents = values.length > 1;
  const helperText = props.helperText ?? `Se encontraron ${searchResults.length} resultados para la última búsqueda.`;

  return (
    <Box>
      <Typography>Contenidos de este carrusel</Typography>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <SearchField
            ref={searchFieldRef}
            fullWidth
            label="Buscar películas"
            variant="standard"
            placeholder="Dejá este campo vacío para traer todos los contenidos 🎥"
            error={props.error}
            helperText={helperText}
            onBlur={onBlur}
            onSearch={handleSearch}
          />
        </Grid>
        <Grid xs={12}>
          {values.length === 0 ? (
            <Typography fontStyle="italic" color="neutral">
              No hay películas seleccionadas 🤔. Seleccioná alguna de las que aparecen acá abajo 👇
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
});
