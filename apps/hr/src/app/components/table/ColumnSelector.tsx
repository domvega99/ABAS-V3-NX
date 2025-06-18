import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Button,
} from '@mui/material';
import { IconMenu2 } from '@tabler/icons-react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface ColumnSelectorProps {
  columns: any[];
  onColumnToggle: (id: string, show: boolean) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ columns, onColumnToggle }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (id: string) => {
    const column = columns.find(column => column.id === id);
    if (column) {
      onColumnToggle(id, !column.show);
    }
  };

  return (
    <div>
      <Button 
        variant="outlined" 
        startIcon={<IconMenu2 size={18}/>} 
        onClick={handleClickOpen}
        color='success'
      >
        Column
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth={true}
        maxWidth='sm'>
        <DialogTitle>Show and Hide Columns</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormGroup>
              {columns.map((column) => (
                <FormControlLabel
                  key={column.id}
                  control={
                    <Checkbox
                      checked={column.show}
                      onChange={() => handleCheckboxChange(column.id)}
                    />
                  }
                  label={column.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='success'>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ColumnSelector;