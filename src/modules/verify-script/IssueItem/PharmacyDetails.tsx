import React, { useState } from "react";
import { Stack, Switch, FormControlLabel } from "@mui/material";
import {  Control } from "react-hook-form";
import Input from "@/components/Forms/TextField/InputController"
import { IFormValues } from ".";

interface PharmacyDetailsProps {
  control: Control<IFormValues>;
}

const PharmacyDetails: React.FC<PharmacyDetailsProps> = ({ control }) => {
  const [receiveEmail, setReceiveEmail] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceiveEmail(event.target.checked);
  };

  return (
    <Stack spacing={{ xs: 3, sm: 2 }}>
      <Input
        name="scriptNumber"
        control={control}
        label="Script Number"
        placeholder="Script Number"
      />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <Input
          name="pharmacyName"
          control={control}
          label="Pharmacy Name"
          placeholder="Pharmacy Name"
        />
        <Input
          name="pharmacyBranch"
          control={control}
          label="Pharmacy Branch"
          placeholder="Branch Name"
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
        <Input
          name="pharmacistName"
          control={control}
          label="Dispensing Pharmacist Name"
          placeholder="Your full name"
        />
        <Input
          name="pharmacistNumber"
          control={control}
          label="Dispensing Pharmacist Number"
          placeholder="Your Pharmacy Council Number"
        />
      </Stack>
      <FormControlLabel
        control={
          <Switch
            checked={receiveEmail}
            onChange={handleSwitchChange}
          />
        }
        label="Receive Email?"
      />
      {receiveEmail && (
        <Input
          name="emailAddress"
          control={control}
          label="Email Address"
          placeholder="Enter your email address"
        />
      )}
    </Stack>
  );
};

export default PharmacyDetails;
