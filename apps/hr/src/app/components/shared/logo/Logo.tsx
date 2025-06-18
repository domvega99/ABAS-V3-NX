import { Chip, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "../../../assets/icon/logoicon.png";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

interface LogoProps {
  collapsed?: boolean;
}

const Logo = ({ collapsed }: LogoProps) => {
  return (
    <LinkStyled href="/" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {collapsed ? (
        <Stack flexDirection="column" alignItems="center">
          <Image src={LogoIcon} alt="logo" height={40} width={40} priority />
          <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main' }} label="V.3.0.0" />
        </Stack>
      ) : (
        <Stack flexDirection="row" alignItems="center">
          <Image src={LogoIcon} alt="logo" height={40} width={40} priority />
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "text.primary" }}>ABAS</Typography>
          <Chip size='small' sx={{ backgroundColor: 'info.light', color: 'info.main' }} label="V.3.0.0" />
        </Stack>
      )}
    </LinkStyled>
  );
};

export default Logo;
