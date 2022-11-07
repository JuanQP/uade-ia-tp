import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import { Link } from "react-router-dom";

interface GradientButtonProps extends Omit<ButtonProps, 'sx'> {
  gradient: {
    deg: string;
    from: string;
    to: string;
  },
  component: typeof Link;
  to: string;
  sx: Partial<SxProps<Theme>>;
}

export function GradientButton({ gradient, sx, ...props }: GradientButtonProps) {

  const styles = (theme: Theme) => ({
    background: `linear-gradient(${gradient.deg}, ${gradient.from}, ${gradient.to})`,
    color: theme.palette.common.white,
    '&.Mui-disabled': {
      background: 'unset',
      backgroundColor: theme.palette.action.disabledBackground,
    },
    ...(sx ?? {}),
  });

  return (
    <Button {...props} sx={styles}>
      {props.children}
    </Button>
  );
}
