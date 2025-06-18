import React from 'react'
import { Button } from '@mui/material';
import { IconDownload } from '@tabler/icons-react';

export default function ExportComponent({ data, columns }: any) {

  const handleExportCSV = (data: any[], columns: { id: string, label: string }[]) => {
    if (!Array.isArray(data)) {
      console.error("Data is not an array or is null/undefined.");
      return;
    }
    const objectToCsvRow = (obj: { [key: string]: any }) => {
      return columns.map(column => {
        let value = obj[column.id]?.toString() || '';
        if (/[",\n]/.test(value)) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
  
        return value;
      }).join(",");
    };
  
    const csvContent = [
      columns.map(column => column.label).join(",")
    ];
  
    data.forEach(item => {
      csvContent.push(objectToCsvRow(item));
    });
  
    const blob = new Blob([csvContent.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  

  return (
    <div >
        <Button 
            variant="outlined" 
            startIcon={<IconDownload size={18}/>} 
            onClick={() => handleExportCSV(data, columns)}
            color='success'
        >
            Export
        </Button>
    </div>
  )
}


