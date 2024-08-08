import React, { useState } from "react"
import LineItems from './LineItems'
import { Box, Button, Stack } from "@mui/material"
import PharmacyDetails from "./PharmacyDetails";
import { useForm } from "react-hook-form";

interface IFormValues {
    scriptNumber: string;
    pharmacyName: string;
    pharmacyBranch: string;
    pharmacistName: string;
    pharmacistNumber: string;
    receiveEmail: boolean;
    emailAddress?: string;
    scriptId: string;
}


const IssueLineItem = () => {
    
    const { handleSubmit, control, setValue } = useForm<IFormValues>({
    });

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (<Box>

        {activeStep === 0 && <LineItems />}
        {activeStep === 1 && <PharmacyDetails />}

        <Stack direction="row" justifyContent="space-between" mt={4}>
            <Button color="primary" variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === 1 ? 'Submit' : 'Next'}
            </Button>
        </Stack>
    </Box>)
}

export default IssueLineItem