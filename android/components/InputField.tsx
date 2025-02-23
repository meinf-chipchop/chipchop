import React from "react";
import { TextInputProps } from "react-native";
import { Input, InputField, InputSlot } from "./ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";
import { AlertCircleIcon } from "lucide-react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isInvalid?: boolean;
  error?: string;
  disabled?: boolean;
}

const TextField = ({
  label,
  placeholder,
  value,
  onChangeText,
  inputMode,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  disabled,
  error,
}: InputFieldProps) => {
  return (
    <FormControl isInvalid={!!error} className={containerStyle}>
      {label && label !== "" && (
        <FormControlLabel>
          <FormControlLabelText className="pl-1">{label}</FormControlLabelText>
        </FormControlLabel>
      )}
      <Input className="rounded-full bg-background-50" isDisabled={disabled}>
        {leftIcon && <InputSlot className="pl-3">{leftIcon}</InputSlot>}
        <InputField
          className={`w-full ${inputStyle}`}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => {
            if (onChangeText) onChangeText(text);
          }}
          inputMode={inputMode}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && <InputSlot className="pr-3">{rightIcon}</InputSlot>}
      </Input>
      <FormControlError className="pl-3">
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText className="text-sm">{error}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default TextField;
