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

declare global {
  interface Dish {
    id: string;
    user_uuid: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
    category: string;
    discount: number;
    hidden: boolean;
    created_at: string;
  }

  interface Account {
    uuid: string;
    name: string;
    phone: string;
    role: string;
    age: number;
    image_url: string;
    created_at: string;
  }

  interface Order {
    id: string;
    user_uuid: string;
    recipe_id: string;
    amount: string;
    delivery: string;
    type: OrderType;
    status: OrderStatus;
    created_at: string;
  }
}
