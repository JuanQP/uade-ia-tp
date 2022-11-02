import { ContentImage } from "@features/UI";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const DEFAULT_HORIZONTAL_IMAGE = '';

const imageURLRegex = /^(https?):.+\.(jpg|jpeg|png)$/i;

function isImageURL(url) {
  return imageURLRegex.test(url);
}

export const URLImageField = forwardRef(({type, ...props}, forwardRef) => {

  const [loadedUrlImage, setLoadedUrlImage] = useState(DEFAULT_HORIZONTAL_IMAGE);
  const textFieldRef = useRef(null);
  useImperativeHandle(forwardRef, () => textFieldRef.current);


  function handleInputChange(e) {
    if(isImageURL(e.target.value)) {
      setLoadedUrlImage(e.target.value);
    }
    if(props.onChange) {
      props.onChange(e);
    }
  }

  useEffect(() => {
    setLoadedUrlImage(props.value);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      height="100%"
    >
      <TextField
        inputRef={textFieldRef}
        {...props}
        onChange={handleInputChange}
      />
      <ContentImage type={type} src={loadedUrlImage} />
    </Box>
  )
})
