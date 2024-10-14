import { View, Text, TextInput, TextInputProps } from "react-native";

interface StyledInputProps extends TextInputProps {
  title?: string,
  value?: string,
  placeholder?: string,
  handleChangeText?: (text: string) => void,
  otherStyles?: string,
  isPassword?: boolean,
}

const StyledInput: React.FC<StyledInputProps> = ({
  title = '',
  value = '',
  placeholder = '',
  handleChangeText = () => { },
  otherStyles = {},
  isPassword = false,
  ...props
}) => {

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title ? <Text className="text-base text-gray-100 font-pmedium">{title}</Text> : null}
      <TextInput
        className=" h-full w-full text-black rounded-2xl px-2 py-2 font-prmt text-base  border-2 border-black-200 focus:border-secondary"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        secureTextEntry={isPassword}
        {...props}
      />
    </View>
  );
};

export default StyledInput;
