import { Image, ImageSourcePropType, View } from "react-native";
export default function TabIcon({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) {
  return (
    <View
      className={`flex flex-row w-full px-1 justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={`rounded-full w-full px-6 h-11 items-center justify-center ${focused ? "bg-general-300" : ""}`}
      >
        <Image
          source={source}
          tintColor={focused ? "#E7D4B5" : "white"}
          resizeMode="contain"
          className="w-6 h-6"
        />
      </View>
    </View>
  );
}
