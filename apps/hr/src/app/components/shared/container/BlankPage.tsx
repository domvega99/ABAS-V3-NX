import { Box, Paper } from "@mui/material";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const BlankPage = ({ children }: Props) => {
  return (
    <Box>
      <Paper 
        sx={{
          padding: '20px',
          minHeight: '70vh'
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default BlankPage;
