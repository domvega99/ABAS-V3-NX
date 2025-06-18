import { Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { IconBuildingBank, IconCalendar, IconCash, IconClock, IconDeviceMobile, IconFile, IconFileMinus, IconFilePlus, IconMessage, IconPlaneTilt, IconReceipt, IconShoppingCart, IconSpeakerphone, IconStars, IconVaccine, IconWallet } from '@tabler/icons-react'
import DashboardCard from '../../../components/shared/DashboardCard'

const CorporateServices = () => {

    const menus = [
        {
            "name": 'Bulletin Board',
            "icon": <IconSpeakerphone />
        },
        {
            "name": '201 File',
            "icon": <IconFile />
        },
        {
            "name": 'Daily Timesheet Record',
            "icon": <IconClock />
        },
        {
            "name": 'Fixed Assets',
            "icon": <IconDeviceMobile />
        },
        {
            "name": 'Payslips',
            "icon": <IconReceipt />
        },
        {
            "name": 'Loans',
            "icon": <IconBuildingBank />
        },
        {
            "name": 'Performance Evaluations',
            "icon": <IconStars />
        },
        {
            "name": 'Vaccine Cards',
            "icon": <IconVaccine />
        },
        {
            "name": 'Leaves',
            "icon": <IconCalendar />
        },
        {
            "name": 'Overtime',
            "icon": <IconFilePlus />
        },
        {
            "name": 'Undertime',
            "icon": <IconFileMinus />
        },
        {
            "name": 'Official Business',
            "icon": <IconPlaneTilt />
        },
        {
            "name": 'Material Requests',
            "icon": <IconShoppingCart />
        },
        {
            "name": 'Request for Payments',
            "icon": <IconWallet />
        },
        {
            "name": 'Cash Advances',
            "icon": <IconCash />
        },
    ]

    return (
        <DashboardCard title="Corporate Services">
            <List sx={{ display: "flex", flexWrap: "wrap" }}>
                {menus.map((menu, index) => (
                    <ListItem disablePadding key={index} sx={{ width: "50%" }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Fab size='small' color="primary">
                                    { menu.icon }
                                </Fab>
                            </ListItemIcon>
                            <ListItemText primary={menu.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> 
        </DashboardCard>
    )
}

export default CorporateServices
