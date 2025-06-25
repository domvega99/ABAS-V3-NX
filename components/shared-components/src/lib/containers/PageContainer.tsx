import { Box } from '@mui/material';
import { JSX } from 'react';

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <Box>
    <title>{title}</title>
    <meta name="description" content={description} />
    {children}
  </Box>
);

export default PageContainer;
