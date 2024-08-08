import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const InstructionIllustrations: React.FC = () => {
    const theme = useTheme()

    const instructions = [
        { icon: <PlayCircleIcon fontSize="medium" sx={{ color: theme.palette.primary.main }} />, text: 'Select the item you wish to dispense.' },
        { icon: <EditIcon fontSize="medium" sx={{ color: theme.palette.primary.main }} />, text: 'Fill out your details in the form.' },
        { icon: <CheckCircleIcon fontSize="medium" sx={{ color: theme.palette.primary.main }} />, text: 'Submit the form, and the original script will be sent to your pharmacy.' },
    ];

    return (
        <Box >
            {instructions.map((instruction, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                    <Box sx={{ mr: 2 }}>{instruction.icon}</Box>
                    <Typography variant="body1" fontSize="16px">{instruction.text}</Typography>
                </Box>
            ))}
        </Box>
    );
}

export default InstructionIllustrations;
