'use client';
import PageContainer from '@/app/components/shared/container/PageContainer';
import ProgressLoading from '@/app/components/shared/ProgressLoading';
import DataTable from '@/app/components/table/DataTable';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { IconPlus, IconStack } from '@tabler/icons-react';
import Link from 'next/link';
import useDepartments from '@/app/hooks/useDepartments';
import DepartmentColumns from './util/column';
import BlankPage from '@/app/components/shared/container/BlankPage';
import withAuth from '@/app/components/shared/WithAuth';

const Page = () => {
    const {
        data,
        count,
        status,
        error,
        page,
        limit,
        searchQuery,
        onSearchChange,
        onPageChange,
        onRowsPerPageChange,
        onOrderChange,
        onSortChange,
    } = useDepartments();

    return (
        <>
            {status === 'loading' && <ProgressLoading />}
            <PageContainer title="Departments" description="">
                <BlankPage>
                    <Stack gap='10px'>
                        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Stack gap={2} flexDirection='row' alignItems='center'>
                                <IconButton
                                    color='secondary'
                                    size="large"
                                >
                                    <IconStack size="25"/>
                                </IconButton>
                                <Typography variant="h4">Departments</Typography>
                            </Stack>
                            <Button
                                color={'success'} 
                                variant={'contained'} 
                                size={'medium'}
                                startIcon={<IconPlus size={18}/> }
                                LinkComponent={Link}
                                href='/master-tables/departments/create'>
                                Add
                            </Button>
                        </Stack>
                        <DataTable
                            count={count}
                            data={data}
                            columns={DepartmentColumns}
                            page={page}
                            limit={limit}
                            searchQuery={searchQuery}  
                            onSearchChange={onSearchChange}
                            onPageChange={onPageChange}
                            onRowsPerPageChange={onRowsPerPageChange}
                            onOrderChange={onOrderChange}
                            onSortChange={onSortChange}
                        />
                    </Stack>
                </BlankPage>
            </PageContainer>
        </>
    );
};

export default withAuth(Page);
