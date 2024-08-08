import React from 'react';
import {
  Typography, Box, IconButton,
  useMediaQuery, Alert, Stack,
  Paper,
  Container,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';
import ActivityLog from './ActivityLog';
import Instructions from './instructions';
import PatientDetails from './PatientDetails';
import IssueLineItem from './IssueItem'

const MainBody = styled(Container)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const Banner = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  alignItems: 'center',
  '& .MuiAlert-message': {
    width: '100%',
  },
}));

const BannerContent = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
}));

const Section = styled(Paper)(({ theme }) => ({
  zIndex: 2,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 20px 40px -12.125px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const VerifyScriptView: React.FC = () => {
  const [showBanner, setShowBanner] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBannerClose = () => {
    setShowBanner(false);
  };

  return (
    <MainBody>
      {showBanner && (
        <Banner variant="filled" severity="info">
          <BannerContent direction="row">
            <Typography fontWeight="bold">
              This page verifies the script presented to you is an original copy of the prescription.
            </Typography>
            <IconButton onClick={handleBannerClose} color="inherit">
              <CloseIcon sx={{ height: 20 }} />
            </IconButton>
          </BannerContent>
        </Banner>
      )}

      <Stack
        display="flex"
        direction={isMobile ? 'column' : 'row'}
        gap={4}
      >
        <Box
          flexShrink={0}
          sx={{
            maxWidth: isMobile ? 'none' : '400px',
            flexGrow: 0
          }}
        >
          <Section variant="elevation">
            <Typography variant="h6" gutterBottom>Script Details</Typography>
            <PatientDetails />
          </Section >
          <Section variant="elevation">
            <Typography variant="h6" gutterBottom>Activity Log</Typography>
            <ActivityLog />
          </Section>
        </Box>
        <Box
          flexGrow={1}
          sx={{ minWidth: 0 }}
        >

          <Section variant="elevation">
            <Typography variant="h6" gutterBottom>Getting Started</Typography>
            <Instructions />
          </Section>
          <Section variant="elevation">
            <IssueLineItem />
          </Section>
        </Box>
      </Stack>
    </MainBody>
  );
}

export default VerifyScriptView;
