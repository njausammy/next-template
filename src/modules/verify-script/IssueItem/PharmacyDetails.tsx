import React, { useState } from "react";
import { Stack, Checkbox, Switch, FormControlLabel, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import StyledTextField from "@/components/Forms/TextField";


const PharmacyDetails = () => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [receiveEmail, setReceiveEmail] = useState(false);

  const handleEmailCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmailChecked(event.target.checked);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceiveEmail(event.target.checked);
  };

  return (
    <Stack spacing={{ xs: 3, sm: 2 }}>
      <StyledTextField label="Script Number" placeholder="Script Number" fullWidth />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <StyledTextField label="Pharmacy Name" placeholder="Pharmacy Name" fullWidth />
        <StyledTextField label="Pharmacy Branch" placeholder="Branch Name" fullWidth />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <StyledTextField label="Dispensing Pharmacist Name" placeholder="Your full name" fullWidth />
        <StyledTextField label="Dispensing Pharmacist Number" placeholder="Your Pharmacy Council Number" fullWidth />
      </Stack>

      
      <FormControlLabel
        control={
          <Switch
            checked={receiveEmail}
            onChange={handleSwitchChange}
          />
        }
        label=""
      />
      {receiveEmail && (
        <StyledTextField
          label="Email Address"
          placeholder="Enter your email address"
          fullWidth
        />
      )}
    </Stack>
  );
};

export default PharmacyDetails;
