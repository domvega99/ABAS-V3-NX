import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { IconBuildingBank, IconCalendar, IconCash, IconClock, IconDeviceMobile, IconFile, IconFileMinus, IconFilePlus, IconPlaneTilt, IconReceipt, IconShoppingCart, IconSpeakerphone, IconStars, IconVaccine, IconWallet } from '@tabler/icons-react'

const CorporateServices = () => {

    const menus = [
        {
            "name": 'Bulletin Board',
            "icon": <IconSpeakerphone size={20}/>
        },
        {
            "name": '201 File',
            "icon": <IconFile size={20}/>
        },
        {
            "name": 'Daily Timesheet Record',
            "icon": <IconClock size={20}/>
        },
        {
            "name": 'Fixed Assets',
            "icon": <IconDeviceMobile size={20}/>
        },
        {
            "name": 'Payslips',
            "icon": <IconReceipt size={20}/>
        },
        {
            "name": 'Loans',
            "icon": <IconBuildingBank size={20}/>
        },
        {
            "name": 'Performance Evaluations',
            "icon": <IconStars size={20}/>
        },
        {
            "name": 'Vaccine Cards',
            "icon": <IconVaccine size={20}/>
        },
        {
            "name": 'Leaves',
            "icon": <IconCalendar size={20}/>
        },
        {
            "name": 'Overtime',
            "icon": <IconFilePlus size={20}/>
        },
        {
            "name": 'Undertime',
            "icon": <IconFileMinus size={20}/>
        },
        {
            "name": 'Official Business',
            "icon": <IconPlaneTilt size={20}/>
        },
        {
            "name": 'Material Requests',
            "icon": <IconShoppingCart size={20}/>
        },
        {
            "name": 'Request for Payments',
            "icon": <IconWallet size={20}/>
        },
        {
            "name": 'Cash Advances',
            "icon": <IconCash size={20}/>
        },
    ]

    return (
        <List sx={{ display: "flex", flexWrap: "wrap" }}>
            {menus.map((menu, index) => (
                <ListItem disablePadding key={index} sx={{ width: "50%" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 35, height: 35 }}>
                                    { menu.icon }
                                </Avatar>
                            </ListItemAvatar>
                        </ListItemIcon>
                        <ListItemText primary={menu.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List> 
    )
}

export default CorporateServices
