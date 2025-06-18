import StatusUI from "@/app/components/ui/StatusUI";
import { Button, Stack } from "@mui/material";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";

const DepartmentColumns = [
    { id: 'id', label: 'ID', width: 20, sortable: true, show: true },
    { id: 'name', label: 'Name', width: 400, sortable: true, show: true },
    { id: 'division', label: 'Division', width: 400, sortable: false, show: true },
    { id: 'sorting', label: 'Sorting', width: 170, sortable: true, show: false },
    { id: 'accounting_code', label: 'Accounting Code', width: 200, sortable: true, show: false },
    { id: 'created', label: 'Created On', width: 170, sortable: true, show: true },
    { id: 'created_by', label: 'Created By', width: 300, sortable: false, show: true },
    { id: 'modified', label: 'Modified On', width: 170, sortable: true, show: true },
    { id: 'modified_by', label: 'Modified By', width: 300, sortable: false, show: true },
    { 
        id: 'stat', 
        label: 'Status', 
        width: 80, 
        sortable: true, 
        show: true,
        renderCell: (row: any) => (
            <StatusUI 
            label={row.stat} 
            color={row.stat == 'Active' ? 'success' : 'error'} 
            />
        ),
    },
    { 
        id: 'actions', 
        label: 'Actions', 
        width: 150, 
        sortable: false, 
        show: true, 
        renderCell: (row: any) => ( 
            <>
            <Stack flexDirection='row' gap={1}>
                <Button 
                color={'warning'} 
                variant={"outlined"} 
                size={"small"}
                LinkComponent={Link}
                href={`/master-tables/departments/${row.id}`}
                startIcon={<IconPencil size={18}/>}>
                Edit
                </Button>
            </Stack>
            </>
        ),
    },
];

export default DepartmentColumns
