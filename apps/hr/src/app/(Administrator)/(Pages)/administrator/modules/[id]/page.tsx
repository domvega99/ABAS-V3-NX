'use client'
import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProgressLoading from '@/app/components/shared/ProgressLoading';
import PageContainer from '@/app/components/shared/container/PageContainer';
import BlankPage from '@/app/components/shared/container/BlankPage';
import withAuth from '@/app/components/shared/WithAuth';
import SubModules from './SubModules';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { Module, showModuleById } from '@/app/services/module';
import Link from 'next/link';
import RolePermissionComponent from './RolePermission';
import Roles from './Roles';
import { IconArrowLeft } from '@tabler/icons-react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const params = useParams()
  const id = Number(params.id);
  const [loading, setLoading] = useState<boolean>(false);
  const [module, setModule] = useState<Module | null>(null); 
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchSubModuleData = async () => {
      try {
        const response = await showModuleById(id);
        setModule(response)
      } catch (error) {
        console.log('Failed to fetch module data', error);
      }
    };
    fetchSubModuleData();
  }, [id]);

  return (
    <>
    {loading && <ProgressLoading />}
    <PageContainer title="Modules" description="">
      <BlankPage>
        <Stack flexDirection='row' alignItems='center' gap={2} marginBottom='5px'>
          <IconButton
            color='secondary'
            size="large"
            LinkComponent={Link}
            href='/administrator/modules'
          >
              <IconArrowLeft size="25"/>
          </IconButton>
          <Typography variant="h4">{module?.name}</Typography>
        </Stack>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Roles" {...a11yProps(0)} />
              <Tab label="Sub-modules" {...a11yProps(1)} />
              <Tab label="Role Permissions" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Roles />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SubModules />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <RolePermissionComponent />
          </CustomTabPanel>
        </Box>
      </BlankPage>
    </PageContainer>
    </>
  );
};

export default withAuth(Page);
