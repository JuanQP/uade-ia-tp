import { ContentImage } from "@features/UI";
import { TextField, TextFieldProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const DEFAULT_HORIZONTAL_IMAGE = '';

const imageURLRegex = /^(https?):.+\.(jpg|jpeg|png)$/i;

function isImageURL(url: string) {
  return imageURLRegex.test(url);
}

type URLImageFieldProps = TextFieldProps & {
  type: string;
  value: string;
}

export const URLImageField = forwardRef<HTMLInputElement, URLImageFieldProps>(({type, value, ...props}, forwardRef) => {

  const [loadedUrlImage, setLoadedUrlImage] = useState(DEFAULT_HORIZONTAL_IMAGE);
  const textFieldRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardRef, () => textFieldRef.current!);


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if(isImageURL(e.target.value)) {
      setLoadedUrlImage(e.target.value);
    }
    if(props.onChange) {
      props.onChange(e);
    }
  }

  useEffect(() => {
    setLoadedUrlImage(value);
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
        value={value}
        onChange={handleInputChange}
      />
      <ContentImage type={type} src={loadedUrlImage} />
    </Box>
  )
})
