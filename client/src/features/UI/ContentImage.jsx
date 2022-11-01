import { Box, useMediaQuery, useTheme } from "@mui/material";
import Image from "mui-image";

const imageBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'lightgray',
  borderStyle: 'dashed',
  borderRadius: '20px',
  padding: '8px',
}

const styles = {
  image: {
    borderRadius: '20px',
    boxShadow: '2px 2px 8px dimgray'
  },
  horizontalImageBox: {
    ...imageBox,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  verticalImageBox: {
    ...imageBox,
  }
};

export function ContentImage({ type, src }) {

  const imageBoxStyle = type === 'horizontal' ? styles.horizontalImageBox : styles.verticalImageBox;
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{
      ...imageBoxStyle,
      maxWidth: isMdUp && type === 'vertical' ? '50%' : '100%',
    }}>
      <Image
        src={src}
        alt="Imagen horizontal"
        width={"100%"}
        height={type === "horizontal" ? "auto" : undefined}
        showLoading
        style={styles.image}
      />
    </Box>
  )
}
