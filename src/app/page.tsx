'use client'
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Typography, Grid, Stack, Button as MUIButton, Alert, Collapse, Button, TextField, Box, Divider } from '@mui/material';
// import { QRCode2 } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Images } from '@/utils/constants';
import { useRouter } from 'next/navigation';
// Styled components
const Background = styled(Grid)(({ theme }) => ({
  minHeight: '100vh',
  overflow: 'hidden',
}));

const GridImg = styled(Grid)(({ theme }) => ({
  backgroundImage: `url(${Images.verifyScriptBackground})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  opacity: 1,
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  background: 'rgba(14, 36, 74, 0.5)',
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  zIndex: 1,
  filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))',
}));

const Centered = styled(Box)(({ theme }) => ({
  position: 'relative',
  top: '35%',
  padding: theme.spacing(3),
}));

const OverlayHeading = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  fontSize: '60px',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  opacity: 1,
  fontWeight: 900,
  boxShadow: 'none',
}));

const OverlaySubHeading = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  boxShadow: 'none',
  fontSize: '20px',
  paddingTop: theme.spacing(2),
  paddingLeft: theme.spacing(10),
  paddingRight: theme.spacing(10),
  textAlign: 'center',
  opacity: 1,
  [theme.breakpoints.down('lg')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Paper = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    maxWidth: '480px',
  },
}));

const Welcome = styled(Typography)(({ theme }) => ({
  fontSize: '50px',
  letterSpacing: 0,
  color: theme.palette.secondary.main,
  opacity: 1,
  [theme.breakpoints.down('md')]: {
    fontSize: '35px',
  },
}));

const SubHeader = styled(Typography)(({ theme }) => ({
  fontSize: '17px',
  letterSpacing: 0,
  color: theme.palette.secondary.main,
  opacity: 1,
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
  },
}));

const ButtonGroup = styled(Stack)(({ theme }) => ({
  width: '100%',
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

// Validation Schema
const validationSchema = Yup.object().shape({
  scriptNumber: Yup.string().required().label('Script Number'),
});

interface IFormValues {
  scriptNumber: string;
}

interface IProps {
  searchScript: (payload: { scriptNumber: string }) => Promise<{
    success: boolean;
    message: string | null;
  }>;
  scanQR: () => void;
}

const VerifyScript = () => {

  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const { handleSubmit, control, setValue } = useForm<IFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const performSearch = async ({ scriptNumber }: IFormValues) => {
    console.log({ scriptNumber })
    // setError(null);

    // const result = await searchScript({ scriptNumber });

    // const { success, message } = result;

    // if (!success) {
    //   setValue('scriptNumber', '');
    //   setError(message);
    // }
    router.push('/script')
  };

  return (
    <Background container direction="row" alignItems="center" justifyContent="center">
      <GridImg item xs={12} sm={6} md={6}>
        <Overlay>
          <Centered>
            <OverlayHeading gutterBottom>
              Verify Your Drug Script
            </OverlayHeading>
            <OverlaySubHeading>
              Enter the script number or scan the QR code to verify
            </OverlaySubHeading>
          </Centered>
        </Overlay>
      </GridImg>
      <Grid item xs={12} sm={12} md={6} lg={6} container alignItems="center" justifyContent="center">
        <Paper alignItems="center" spacing={2}>
          <img
            src="https://app.prescribepro.com/assets/pp.png"
            alt="Prescribe Pro"
            loading="lazy"
            width={250 }
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
          />
          <Welcome>
            Welcome back!
          </Welcome>
          <SubHeader>
            Enter the script number to issue an item
          </SubHeader>
          <Stack spacing={1} sx={{ width: '100%' }}>
            <Controller
              name='scriptNumber'
              render={(
                { field, formState: { errors } },
                hasError = errors['scriptNumber'],
              ) => (
                <TextField {...field} label="Script Number" fullWidth error={!!hasError}
                  helperText={
                    (hasError?.message as React.ReactNode)
                  } />
              )}
              control={control}
            />

            <ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit(performSearch)}
              >
                Search
              </Button>
              <Divider >Or scan</Divider>

              <Button
                variant="outlined"
                color="primary"
                type="button"
                // onClick={scanQR}
              >
                QR Code
              </Button>
            </ButtonGroup>

            <Collapse in={error != null} sx={{ width: '100%' }}>
              <Alert sx={{ width: '100%' }} severity="error">
                {error}
              </Alert>
            </Collapse>
          </Stack>
        </Paper>
      </Grid>
    </Background>
  );
};

export default VerifyScript;
