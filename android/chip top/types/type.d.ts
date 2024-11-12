import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  keyboardType?: string;
  error?: string;
}

// declare interface Dish {
//   ride_id: string;
//   origin_address: string;
//   destination_address: string;
//   origin_latitude: number;
//   origin_longitude: number;
//   destination_latitude: number;
//   destination_longitude: number;
//   ride_time: number;
//   fare_price: number;
//   payment_status: string;
//   driver_id: number;
//   user_id: string;
//   created_at: string;
//   driver: {
//     driver_id: string;
//     first_name: string;
//     last_name: string;
//     profile_image_url: string;
//     car_image_url: string;
//     car_seats: number;
//     rating: string;
//   };
// }

declare interface Dish {
  dish_id: string;
  dish_name: string;
  dish_description: string;
  dish_image_url: string;
  dish_price: number;
  created_at: string;
  chef: {
    chef_id: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    rating: string;
  };
}
