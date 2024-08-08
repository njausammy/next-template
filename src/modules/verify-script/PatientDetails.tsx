import React from 'react';
import { Box, Stack, Typography, Avatar, useTheme, useMediaQuery } from '@mui/material';

const PatientDetails: React.FC = () => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.only('md')); 
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only('xs')); 

    const showOneColumn = isMediumScreen || isExtraSmallScreen;

    return (
        <Stack spacing={4}>
            <Box 
                sx={{ 
                    flexDirection: 'row', 
                    display: 'flex', 
                    padding: theme.spacing(3), 
                    border: `1px solid ${theme.palette.grey[300]}`, 
                    borderRadius: 1, 
                    backgroundColor: theme.palette.background.paper, 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
                }}
            >
                <Avatar 
                    sx={{ 
                        bgcolor: theme.palette.primary.main, 
                        color: theme.palette.primary.contrastText, 
                        marginRight: theme.spacing(3), 
                        fontSize: '1.75rem', 
                        width: 50, 
                        height: 50 
                    }}
                >
                    {getInitials('J*** K****')}
                </Avatar>
                <Stack>
                    <Typography variant="body2" color="text.secondary">
                        Patient Name
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="text.primary">
                        J*** K****
                    </Typography>
                </Stack>
            </Box>

            <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary" mb={3}>
                    Prescription Summary
                </Typography>
                <Stack 
                    direction={showOneColumn ? 'column' : 'row'} 
                    justifyContent="space-between" 
                    spacing={4}
                >
                    <Stack direction="column" spacing={3}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Script Number
                            </Typography>
                            <Typography variant="body1" fontWeight="medium" color="text.primary">
                                ******123
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Issued by
                            </Typography>
                            <Typography variant="body1" color="text.primary">
                                Pendo Health Medical
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Dr Name
                            </Typography>
                            <Typography variant="body1" fontWeight="medium" color="text.primary">
                                Bramwel Mololo
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="column" spacing={3}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Date Issued
                            </Typography>
                            <Typography variant="body1" fontWeight="medium" color="text.primary">
                                12/13/2024
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                Practice Number
                            </Typography>
                            <Typography variant="body1" fontWeight="medium" color="text.primary">
                                1234567
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
};

const getInitials = (name: string) => {
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials;
};

export default PatientDetails;
