import { Chip } from "@mui/material";

type Props = {
  className?: string;
  color: any;
  label: any;
};

const StatusUI = ({ className, color, label }: Props) => {
  return (
    <Chip 
      className={className} 
      label={label}
      size="small"
      sx={{
        backgroundColor: `${color}.light`,
        color: `${color}.main`,
      }}
    >
    </Chip>
  );
};

export default StatusUI;
