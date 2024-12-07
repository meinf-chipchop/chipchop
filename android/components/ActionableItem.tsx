import React from "react";
import { Pressable, Text } from "react-native";
import { ChevronRight } from "lucide-react-native";

type ListItemProps = {
  text: string;
  onPress: () => void;
  containerStyle?: string;
  textStyle?: string;
};

export default function ActionableItem({
  text,
  onPress,
  containerStyle = "",
  textStyle = "",
}: ListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between p-4 ${containerStyle}`}
    >
      <Text className={`font-bold text-gray-800 ${textStyle}`}>{text}</Text>
      <ChevronRight size={20} color="#000000" />
    </Pressable>
  );
}
