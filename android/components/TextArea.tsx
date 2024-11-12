import React from "react";
import { TextInputProps } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";
import { AlertCircleIcon } from "lucide-react-native";
import { Textarea, TextareaInput } from "./ui/textarea";

interface TextAreaProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  isInvalid?: boolean;
  error?: string;
}

const TextArea = ({
  label,
  placeholder,
  value,
  onChangeText,
  inputMode,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  className,
  isInvalid,
  error,
  ...props
}: TextAreaProps) => {
  return (
    <FormControl isInvalid={!!error} className={containerStyle}>
      {label && (
        <FormControlLabel>
          <FormControlLabelText className="">{label}</FormControlLabelText>
        </FormControlLabel>
      )}
      <Textarea className={`bg-background-50 `}>
        <TextareaInput
          className={`w-full ${inputStyle}`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          inputMode={inputMode}
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </Textarea>
      {error && (
        <FormControlError className="pl-3">
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText className="text-sm">
            {error}
          </FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default TextArea;
