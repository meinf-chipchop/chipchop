import React from 'react'
import { TextInputProps } from 'react-native'
import { Input, InputField, InputSlot } from './ui/input'

interface InputFieldProps extends TextInputProps {
  placeholder?: string
  secureTextEntry?: boolean
  containerStyle?: string
  inputStyle?: string
  iconStyle?: string
  className?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const TextField = ({
  placeholder,
  value,
  onChangeText,
  inputMode,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <Input className={`rounded-full ${containerStyle}`}>
      {leftIcon && <InputSlot className={`pl-3`}>{leftIcon}</InputSlot>}
      <InputField
        className={`w-full ${inputStyle}`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {rightIcon && <InputSlot className={`pr-3`}>{rightIcon}</InputSlot>}
    </Input>
  )
}

export default TextField
