import React from 'react';
import {  TextFieldProps } from '@mui/material';
import { Controller, Control } from 'react-hook-form';
import StyledTextField from './StyledTextField';

interface IProps {
    name: string;
    control: Control<any>;
}

type InputProps = IProps & TextFieldProps

const InputController: React.FC<InputProps> = ({ name, control, ...props }) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <StyledTextField
                {...field}
                {...props}
                fullWidth

            />
        )}
    />
);

export default InputController;
