import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Typography,
    Stack,
    Button,
    Box,
    Divider,
    Fade,
    CircularProgress,
    TextField,
    Alert, // Import Alert component
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import LockIcon from '@mui/icons-material/Lock';

const validationSchema = Yup.object().shape({
    scriptNumber: Yup.string().required().label('Script Number'),
});

interface IFormValues {
    scriptNumber: string;
}

const Container = styled(Stack)(({ theme }) => ({
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
}));

const StyledPaper = styled(Stack)(({ theme }) => ({
    width: '100%',
    maxWidth: '400px',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.background.paper,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    '&:hover': {
        boxShadow: `0 4px 10px ${theme.palette.primary.light}`,
    },
}));

const VerifyScript = () => {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const performSearch = async ({ scriptNumber }: IFormValues) => {
        setIsSubmitting(true);
        if (scriptNumber === "468922489123") {
            router.push('/script')
        }
        else {
            setError('The script number you entered does not match our records. Please double-check and submit again.')
        }
        setIsSubmitting(false);
    };

    return (
        <Container spacing={3} justifyContent="center" alignItems="center">
            <img
                src="https://app.prescribepro.com/assets/pp.png"
                alt="Prescribe Pro"
                loading="lazy"
                width={300}
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
            />
            <Fade in={true} timeout={1000}>
                <StyledPaper spacing={4} alignItems="center">
                    {error && (
                        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Typography variant="h5" color='text.primary' gutterBottom>
                        Verify Script
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Enter the script number to issue an item
                    </Typography>
                    <Controller
                        name="scriptNumber"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Script Number"
                                fullWidth
                                error={!!error}
                                helperText={error?.message}
                                variant="outlined"
                            />
                        )}
                    />

                    <Stack spacing={2} width="100%">
                        <SubmitButton
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSubmit(performSearch)}
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress size={20} /> : <LockIcon />}
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify Script'}
                        </SubmitButton>
                        <Divider>Or</Divider>
                        <Button variant="outlined" color="secondary" size="large">
                            Scan QR Code
                        </Button>
                    </Stack>
                    <Box mt={2} display="flex" alignItems="center" justifyContent="center">
                        <LockIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary" ml={1}>
                            Secure Verification
                        </Typography>
                    </Box>
                </StyledPaper>
            </Fade>
        </Container>
    );
};

export default VerifyScript;
