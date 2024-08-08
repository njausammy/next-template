// VerifyPage.tsx
'use client'
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box, TextField, Button, IconButton, Card, Checkbox,
  Stepper, Step, StepLabel, useMediaQuery, Grid,
  Stack
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DataTable from '@/components/DataTable';
import { motion } from 'framer-motion';
import { alpha } from '@mui/material/styles';

const TopBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.default,
  boxShadow: 'none',
}));

const MainBody = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const Section = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: `0 10px 30px -12px ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 20px 40px -12.125px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const Form = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const GlassButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.light, 0.8)})`,
  backdropFilter: 'blur(10px)',
  color: theme.palette.common.white,
  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    transform: 'translateY(-3px)',
    boxShadow: `0 12px 48px 0 ${alpha(theme.palette.common.black, 0.5)}`,
  },
}));

const VerifyPage: React.FC = () => {
  const [showBanner, setShowBanner] = React.useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBannerClose = () => {
    setShowBanner(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = ['Select item to dispense', 'Fill out your details',];

  const scriptContentData = [
    { id: 1, lineItem: 'Amoxil 500mg po TDS x 5 tabs', repeats: 0, timesIssued: 1, issue: false },
    { id: 2, lineItem: 'Panado 1g po QID x 10 tabs', repeats: 0, timesIssued: 0, issue: false },
  ];

  const scriptContentColumns = [
    { id: 'id', label: '#' },
    { id: 'lineItem', label: 'Line Item' },
    { id: 'repeats', label: 'Repeats' },
    { id: 'timesIssued', label: 'Times Issued' },
    {
      id: 'issue',
      label: 'Issue?',
      renderElement: (row: any) => <Checkbox checked={row.issue} />
    },
  ];

  const logData = [
    { id: 1, timestamp: '2024-07-10 08h00', action: 'Piliton (item 2) issued', actionType: 'Issue item', actionedBy: "Sammy" },
    { id: 2, timestamp: '2024-07-10 08h00', action: 'Amoxil (item 1) issued', actionType: 'Issue item', actionedBy: "Sammy" },
    { id: 3, timestamp: '2024-07-10 08h00', action: 'Original script sent by email', actionType: 'Send mail', actionedBy: "Sammy" },
  ];

  const logColumns = [
    { id: 'timestamp', label: 'Date & Time' },
    { id: 'action', label: 'Action' },
    { id: 'actionType', label: 'Action Type' },
    { id: 'actionedBy', label: 'Actioned by' },

  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(45deg, ${theme.palette.background.default}, ${theme.palette.grey[100]})`,
    }}>
      <TopBar position="static">
        <Toolbar sx={{ justifyContent: "center" }}>
          <img
            src="https://app.prescribepro.com/assets/pp.png"
            alt="Prescribe Pro"
            loading="lazy"
            width={180}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
          />
        </Toolbar>
      </TopBar>

      <MainBody>
        {showBanner && (
          <Box sx={{
            background: `linear-gradient(45deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
            color: theme.palette.common.white,
            padding: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
          }}>
            <Box flex={1} sx={{ justifyContent: "center" }} >
              <Typography variant='h6' textAlign="center" fontWeight="bold">
                This page verifies the script presented to you is an original copy of the prescription.
              </Typography>
            </Box>
            <IconButton onClick={handleBannerClose} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Box mt={4}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Section>
              <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>Instructions</Typography>
              <Typography>1. Select the line item you wish to dispense</Typography>
              <Typography>2. Fill out your details at the bottom</Typography>
              <Typography>3. Original script will be emailed to your pharmacy</Typography>
            </Section>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Section>
              <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>Patient Details</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Patient Name</Typography>
                  <Typography variant="body1" fontWeight="medium">A*** W****</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Script Number</Typography>
                  <Typography variant="body1" fontWeight="medium">******123</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Date Issued</Typography>
                  <Typography variant="body1" fontWeight="medium">Date prescription issued</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Issued by</Typography>
                  <Typography variant="body1" fontWeight="medium">Practice Name</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Practice #</Typography>
                  <Typography variant="body1" fontWeight="medium">Practice number</Typography>
                </Box>
              </Box>
            </Section>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Section>

              <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>Log</Typography>
              <DataTable columns={logColumns} data={logData} />
            </Section>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Section>
              <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>Script Content</Typography>

              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === 0 && (
                <DataTable columns={scriptContentColumns} data={scriptContentData} />
              )}
              {activeStep === 1 && (
                <Form>
                  <TextField label="Script Number" placeholder='Script Number' fullWidth />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <TextField label="Pharmacy Name" placeholder='Pharmacy Name' fullWidth />
                    <TextField label="Pharmacy Branch" placeholder='Branch Name' fullWidth />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                    <TextField label="Dispensing Pharmacist Name" placeholder='Your full name' fullWidth />
                    <TextField label="Dispensing Pharmacist Number" placeholder='Your Pharmacy Council Number' fullWidth />
                  </Stack>
                </Form>
              )}
              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </Section>
          </motion.div>
        </Box>
      </MainBody>
    </Box>
  );
}

export default VerifyPage;
