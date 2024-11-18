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
      className={`flex-row items-center justify-between p-4 bg-white border-b border-gray-200 ${containerStyle}`}
    >
      <Text className={`text-base text-gray-800 ${textStyle}`}>{text}</Text>
      <ChevronRight size={20} color="#9CA3AF" />
    </Pressable>
  );
}
