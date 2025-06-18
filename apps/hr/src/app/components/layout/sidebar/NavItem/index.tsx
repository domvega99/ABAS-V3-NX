import React, { useState } from "react";
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
  Collapse,
} from "@mui/material";
import Link from "next/link";
import { IconChevronDown, IconChevronUp, IconMenu } from "@tabler/icons-react";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  children?: NavGroup[];
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level = 0, pathDirect, onClick }: ItemType) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "normal",
      marginBottom: "2px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.primary,
      paddingLeft: `${16 + level * 24}px`,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.light,
      },
      "&.Mui-selected": {
        color: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.light,
        },
      },
    },
    ".MuiTypography-root": {
      fontSize: "12px", 
    },
  }));

  const handleClick = () => {
    setOpen(!open);
  };

  const isSelected = pathDirect === item.href || pathDirect.startsWith(`${item.href}/`);

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={item.href ? Link : "button"}
          href={item.href}
          disabled={item.disabled}
          selected={isSelected}
          target={item.external ? "_blank" : ""}
          onClick={item.children ? handleClick : onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            <>{item.title}</>
          </ListItemText>
          {item.children ? open ? <IconChevronUp stroke={1.5} size="1.3rem"/> : <IconChevronDown stroke={1.5} size="1.3rem"/> : null}
        </ListItemButton>
      </ListItemStyled>
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                level={level + 1}
                pathDirect={pathDirect}
                onClick={onClick}
              />
            ))}
          </List>
        </Collapse>
      )}
    </List>
  );
};

export default NavItem;
