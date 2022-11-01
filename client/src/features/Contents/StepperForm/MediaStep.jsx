import {
  CONTENT_DEFAULT_VALUES,
  schemaShape
} from "@features/Contents";
import { URLImageField } from "@features/UI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const {
  urlImage,
  verticalUrlImage,
  urlVideo,
} = schemaShape;

const schema = z.object({
  urlImage,
  verticalUrlImage,
  urlVideo,
});

const DEFAULT_VALUES = {
  urlImage: CONTENT_DEFAULT_VALUES.urlImage,
  verticalUrlImage: CONTENT_DEFAULT_VALUES.verticalUrlImage,
  urlVideo: CONTENT_DEFAULT_VALUES.urlVideo,
}

export function MediaStep({ active, onNextStep, onPreviousStep }) {

  const { control, formState, getValues, register, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  function handlePreviousStep() {
    const formValues = getValues();
    onPreviousStep({
      ...formValues,
    });
  }

  function handleStepOneSubmit(formValues) {
    onNextStep({
      ...formValues,
    });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      display={active ? undefined : 'none'}
      onSubmit={handleSubmit(handleStepOneSubmit)}
    >
      <Grid container spacing={2} mt={1}>
        <Grid xs={12}>
          <TextField
            inputProps={{maxLength: 255}}
            fullWidth
            // This is to avoid getting rendered on top of react-selects
            sx={{'& label': { zIndex: 0 }}}
            required
            variant="outlined"
            label="URL Video"
            placeholder="URL Video"
            error={!!errors.urlVideo}
            helperText={errors.urlVideo?.message}
            {...register('urlVideo')}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Controller
            name="urlImage"
            control={control}
            render={({ field }) => (
              <URLImageField
                type="horizontal"
                fullWidth
                required
                variant="outlined"
                label="URL Imagen"
                placeholder="URL Imagen"
                error={!!errors.urlImage}
                helperText={errors.urlImage?.message ?? "Mucho mejor si la imagen está en resolución 16:9 👌"}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Controller
            name="verticalUrlImage"
            control={control}
            render={({ field }) => (
              <URLImageField
                type="vertical"
                fullWidth
                sx={{'& label': { zIndex: 0 }}}
                required
                variant="outlined"
                label="URL Imagen vertical"
                placeholder="URL Imagen Vertical"
                error={!!errors.verticalUrlImage}
                helperText={errors.verticalUrlImage?.message ?? "Mucho mejor si la imagen está en resolución 2:3 👌"}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} display="flex" justifyContent="space-between">
          <Button onClick={handlePreviousStep}>
            Anterior
          </Button>
          <Button variant="contained" type="submit">
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
