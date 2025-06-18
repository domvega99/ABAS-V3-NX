import React from "react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
};

const StyleCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}: Props) => {
  return (
    <Card sx={{ padding: 0, position: 'relative', backgroundColor: 'primary.light', color: '#FFFFFF' }} elevation={9}>
      <Box
        sx={{
          width: '700px',
          height: '400px',
          backgroundColor: 'primary.main',
          borderRadius: '50%',
          position: 'absolute',
          top: '-100px',
          left: '-60px',
          zIndex: 0, 
        }}
      />
      <Box
        sx={{
          width: '200px',
          height: '200px',
          backgroundColor: 'primary.dark',
          borderRadius: '50%',
          position: 'absolute',
          top: '-30px',
          left: '-90px',
          zIndex: 0,
        }}
      />
      
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        {cardheading ? (
          <>
            <Typography variant="h5">{headtitle}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {headsubtitle}
            </Typography>
          </>
        ) : (
          <>
            {title && (
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems={"center"}
                mb={3}
              >
                <Box>
                  {title && <Typography variant="h5">{title}</Typography>}
                  {subtitle && (
                    <Typography variant="subtitle2" color="textSecondary">
                      {subtitle}
                    </Typography>
                  )}
                </Box>
                {action}
              </Stack>
            )}
            {children}
          </>
        )}
      </CardContent>

      {middlecontent && (
        <Box sx={{ mt: 2, zIndex: 1 }}>{middlecontent}</Box>
      )}
      {footer && (
        <Box sx={{ mt: 2, zIndex: 1 }}>{footer}</Box>
      )}
    </Card>
  );
};

export default StyleCard;
