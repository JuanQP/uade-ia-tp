import { ListItem, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, Theme } from "@mui/material";
import { Link } from "react-router-dom";
import { LinkType } from "./types";

function StyledListItemButton(props: StyledListItemButtonProps) {
  const styles = (theme: Theme) => ({
    // If not selected: text white
    '&:not(.Mui-selected)': {
      color: 'white',
      transition: 'none',
    },
    // If selected, then, make round the nav button
    '&.Mui-selected': {
      borderTopLeftRadius: '40px',
      borderBottomLeftRadius: '40px',
      backgroundColor: `${theme.palette.background.default} !important`,
      color: 'background.drawer',
      // Remove button transition effects
      transition: 'none',
      // "Before" and "after" pseudo elements to make
      // active links rounded in the outside
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-30px',
        right: 0,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        boxShadow: `15px 15px 0 ${theme.palette.background.default}`,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-30px',
        right: 0,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        boxShadow: `15px -15px 0 ${theme.palette.background.default}`,
      },
    },
  })

  return (
    <ListItemButton {...props} sx={styles}>
      {props.children}
    </ListItemButton>
  );
}

interface StyledListItemButtonProps extends ListItemButtonProps {
  component: typeof Link;
  to: string;
}

type ListItemLinkProps = {
  pathname: string;
  linkItem: LinkType;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export function ListItemLink({ pathname, linkItem, onClick } : ListItemLinkProps) {
  // It checks if current location starts with this element URL
  const regexp = new RegExp(`^${linkItem.to}`, 'i');
  const match = regexp.test(pathname);
  const iconStyle = { color: match ? 'background.drawer' : 'common.white' };

  return (
    <ListItem disablePadding sx={{ paddingLeft: 1 }}>
      <StyledListItemButton
        disableRipple
        selected={match}
        component={Link}
        to={linkItem.to}
        onClick={onClick}
      >
        <ListItemIcon sx={iconStyle}>
          {linkItem.icon}
        </ListItemIcon>
        <ListItemText primary={linkItem.label} />
      </StyledListItemButton>
    </ListItem>
  )
}
