import {
  CONTENT_DEFAULT_VALUES,
  isImageURL,
  schemaShape
} from "@features/Contents";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Image from "mui-image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

  const { formState, getValues, register, watch, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;
  const [loadedUrlImage, setLoadedUrlImage] = useState(DEFAULT_VALUES.urlImage);
  const [loadedVerticalUrlImage, setLoadedVerticalUrlImage] = useState(DEFAULT_VALUES.verticalUrlImage);
  const watchUrlImage = watch('urlImage', '');
  const watchVerticalUrlImage = watch('verticalUrlImage', '');

  useEffect(() => {
    if(isImageURL(watchUrlImage)) {
      setLoadedUrlImage(watchUrlImage);
    }
    if(isImageURL(watchVerticalUrlImage)) {
      setLoadedVerticalUrlImage(watchVerticalUrlImage);
    }
  }, [watchUrlImage, watchVerticalUrlImage]);

  function handlePreviousStep() {
    const formValues = getValues();
    onPreviousStep({
      ...formValues,
      urlImage: loadedUrlImage,
      verticalUrlImage: loadedVerticalUrlImage,
    });
  }

  function handleStepOneSubmit(formValues) {
    onNextStep({
      ...formValues,
      urlImage: loadedUrlImage,
      verticalUrlImage: loadedVerticalUrlImage,
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
        <Grid xs={12}>
          <TextField
            fullWidth
            // This is to avoid getting rendered on top of react-selects
            sx={{'& label': { zIndex: 0 }}}
            required
            variant="outlined"
            label="URL Imagen horizontal"
            placeholder="URL Imagen"
            error={!!errors.urlImage}
            helperText={errors.urlImage?.message ?? "Intentá que la imagen sea resolución 16:9 🙏"}
            {...register('urlImage')}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            // This is to avoid getting rendered on top of react-selects
            sx={{'& label': { zIndex: 0 }}}
            required
            variant="outlined"
            label="URL Imagen vertical"
            placeholder="URL Imagen Vertical"
            error={!!errors.verticalUrlImage}
            helperText={errors.verticalUrlImage?.message ?? "Intentá que la imagen sea resolución 2:3 🙏"}
            {...register('verticalUrlImage')}
          />
        </Grid>
        <Grid xs={12}>
          <Grid container>
            <Grid display="flex" flexDirection="column" xs={12} md={6}>
              <Typography textAlign="center">
                Portada horizontal (Web)
              </Typography>
              <Box display="flex" flexGrow={1} flexDirection="column" justifyContent="center" alignItems="center">
                <Image
                  src={loadedUrlImage}
                  alt="Imagen horizontal"
                  width="100%"
                  height="auto"
                  showLoading
                />
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography textAlign="center">
                Portada vertical (Mobile)
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  src={loadedVerticalUrlImage}
                  alt="Imagen vertical"
                  width="50%"
                  showLoading
                />
              </Box>
            </Grid>
          </Grid>
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
