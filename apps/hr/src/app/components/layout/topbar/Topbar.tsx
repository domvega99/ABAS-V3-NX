import Menuitems from "@/app/(Administrator)/layout/sidebar/MenuItems";
import { Box, Button, Menu, MenuItem, Stack, useMediaQuery } from "@mui/material";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Topbar = () => {
    const [anchorEls, setAnchorEls] = useState<(HTMLElement | null)[]>([]);
    const [nestedAnchorEls, setNestedAnchorEls] = useState<{ [key: number]: HTMLElement | null }>({});
    const pathname = usePathname();
    const pathDirect = pathname;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = event.currentTarget;
        setAnchorEls(newAnchorEls);
    };

    const handleClose = (index: number) => {
        const newAnchorEls = [...anchorEls];
        newAnchorEls[index] = null;
        setAnchorEls(newAnchorEls);
    };

    const handleNestedClick = (event: React.MouseEvent<HTMLElement>, subItemId: number) => {
        setNestedAnchorEls((prev) => ({
            ...prev,
            [subItemId]: event.currentTarget,
        }));
    };

    const handleNestedClose = (subItemId: number) => {
        setNestedAnchorEls((prev) => ({
            ...prev,
            [subItemId]: null,
        }));
    };

    const groupedMenuItems: { subheader: string; items: any[], icon: any }[] = [];
    let currentGroup: { subheader: string; items: any[], icon: any } | null = null;

    Menuitems.forEach((item) => {
        if (item.navlabel) {
            if (currentGroup) groupedMenuItems.push(currentGroup);
            currentGroup = { subheader: item.subheader, items: [], icon: item.icon };
        } else if (currentGroup) {
            currentGroup.items.push(item);
        }
    });
    if (currentGroup) groupedMenuItems.push(currentGroup);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    
    if (lgUp) {
        return (
            <Stack flexDirection='row' gap={1} padding='10px 20px'>
                {groupedMenuItems.map((group, index) => (
                    <Stack key={index} spacing={2}>
                        <Button
                            sx={{
                                color: 'text.primary',
                                padding: '8px 20px',
                                borderRadius: "8px",
                                fontSize: "12px", 
                                "&:hover": {
                                    backgroundColor: 'primary.main',
                                    color: 'primary.light',
                                },
                            }}
                            aria-controls={anchorEls[index] ? `menu-${index}` : undefined}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorEls[index]) ? 'true' : undefined}
                            onClick={(event) => handleClick(event, index)}
                            endIcon={anchorEls[index] ? <IconChevronDown stroke={1.5} size="1.3rem"/> : <IconChevronRight stroke={1.5} size="1.3rem"/>}
                            startIcon={group.icon ? <group.icon stroke={1.5} size="1.3rem"/> : undefined} 
                        >
                            {group.subheader}
                        </Button>
                        
                        <Menu
                            id={`menu-${index}`}
                            anchorEl={anchorEls[index]}
                            open={Boolean(anchorEls[index])}
                            onClose={() => handleClose(index)}
                            MenuListProps={{
                                'aria-labelledby': `button-${index}`,
                            }}
                        >
                            {group.items.map((subItem) => (
                                <Box key={subItem.id} sx={{ width: 230 }}>
                                    {subItem.children ? (
                                        <>
                                        <Link href={subItem.href}>
                                                <MenuItem
                                                    onClick={(event) => handleNestedClick(event, subItem.id)}
                                                    aria-haspopup="true"
                                                    aria-controls={`nested-menu-${subItem.id}`}
                                                    sx={{ 
                                                        padding: 1.5, 
                                                        flexDirection: 'row', 
                                                        justifyContent: 'space-between', 
                                                        fontSize: "12px", 
                                                        backgroundColor: pathDirect === subItem.href ? 'primary.main' : 'inherit',
                                                        color: pathDirect === subItem.href ? 'primary.light' : 'text.primary',
                                                        "&:hover": {
                                                            backgroundColor: 'primary.main',
                                                            color: 'primary.light',
                                                        },
                                                    }}
                                                >
                                                    <Stack flexDirection='row' gap={1}>
                                                        <subItem.icon stroke={1.5} size="1.3rem"/>
                                                        {subItem.title}
                                                    </Stack>
                                                    {nestedAnchorEls[subItem.id] ? <IconChevronRight stroke={1.5} size="1.3rem"/> : <IconChevronDown stroke={1.5} size="1.3rem"/>}
                                                </MenuItem>
                                                
                                                <Menu
                                                    id={`nested-menu-${subItem.id}`}
                                                    anchorEl={nestedAnchorEls[subItem.id] || null}
                                                    open={Boolean(nestedAnchorEls[subItem.id])}
                                                    onClose={() => handleNestedClose(subItem.id)}
                                                    MenuListProps={{
                                                        'aria-labelledby': `nested-button-${subItem.id}`,
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    {subItem.children.map((nestedItem: any) => (
                                                        <MenuItem 
                                                            key={nestedItem.id} 
                                                            onClick={() => handleNestedClose(subItem.id)} 
                                                            sx={{ 
                                                                fontSize: "12px", 
                                                                width: 230, 
                                                                padding: 1.5, 
                                                                display: 'flex', 
                                                                gap: 1,
                                                                backgroundColor: pathDirect === nestedItem.href ? 'primary.main' : 'inherit',
                                                                color: pathDirect === nestedItem.href ? 'primary.light' : 'text.primary',
                                                                "&:hover": {
                                                                    backgroundColor: 'primary.main',
                                                                    color: 'primary.light',
                                                                },
                                                            }}
                                                        >
                                                            <nestedItem.icon stroke={1.5} size="1.3rem"/>
                                                            <Link href={nestedItem.href} passHref>
                                                                {nestedItem.title}
                                                            </Link>
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </Link>
                                        </>
                                    ) : (
                                        <Link href={subItem.href} passHref>
                                            <MenuItem onClick={() => handleClose(index)} 
                                                sx={{ 
                                                    padding: 1.5, 
                                                    display: 'flex', 
                                                    gap: 1, 
                                                    fontSize: "12px", 
                                                    backgroundColor: pathDirect === subItem.href ? 'primary.main' : 'inherit',
                                                    color: pathDirect === subItem.href ? 'primary.light' : 'text.primary',
                                                    "&:hover": {
                                                        backgroundColor: 'primary.main',
                                                        color: 'primary.light',
                                                    },
                                                }}>
                                                <subItem.icon stroke={1.5} size="1.3rem"/>
                                                    {subItem.title}
                                            </MenuItem>
                                        </Link>
                                    )}
                                </Box>
                            ))}
                        </Menu>
                    </Stack>
                ))}
            </Stack>
        );
    }
};

export default Topbar;
