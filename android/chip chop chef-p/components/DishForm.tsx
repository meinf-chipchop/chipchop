// import { useState } from "react";
// import { ScrollView, View } from "react-native";
// import { z } from "zod";
// import CustomButton from "@/components/CustomButton";
// import InputField from "@/components/InputField";
// import { icons } from "@/constants";

// const dishSchema = z.object({
//   name: z.string().min(1, "Dish name is required"),
//   description: z.string().min(1, "Description is required"),
//   category: z.string().min(1, "Category is required"),
//   price: z.number().positive("Price must be a positive number"),
//   discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
//   hidden: z.boolean().default(false),
// });

// const DishForm = () => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     category: "",
//     price: 0,
//     discount: 0,
//     hidden: false,
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const validateForm = () => {
//     try {
//       setErrors({});
//       dishSchema.parse(form);
//       return true;
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           newErrors[err.path[0]] = err.message;
//         });
//         setErrors(newErrors);
//       }
//       return false;
//     }
//   };

//   const onSubmit = async () => {
//     if (validateForm()) {
//       // Proceed with dish creation logic
//       console.log("Dish created:", form);
//     }
//   };

//   return (
//     <ScrollView className="flex-1 bg-white pt-4">
//       <View className="flex-1 bg-white mb-10">
//         <InputField
//           label="Dish Name"
//           placeholder="Dish name"
//           icon={icons.dish}
//           value={form.name}
//           onChangeText={(value: string) => setForm({ ...form, name: value })}
//           error={errors.name}
//         />
//         <InputField
//           label="Description"
//           placeholder="Description"
//           icon={icons.description}
//           value={form.description}
//           onChangeText={(value: string) =>
//             setForm({ ...form, description: value })
//           }
//           error={errors.description}
//         />
//         <InputField
//           label="Category"
//           placeholder="Category"
//           icon={icons.category}
//           value={form.category}
//           onChangeText={(value: string) =>
//             setForm({ ...form, category: value })
//           }
//           error={errors.category}
//         />
//         <InputField
//           label="Price"
//           placeholder="Price"
//           icon={icons.price}
//           keyboardType="numeric"
//           value={form.price.toString()}
//           onChangeText={(value: string) =>
//             setForm({ ...form, price: parseFloat(value) })
//           }
//           error={errors.price}
//         />
//         <InputField
//           label="Discount"
//           placeholder="Discount"
//           icon={icons.discount}
//           keyboardType="numeric"
//           value={form.discount.toString()}
//           onChangeText={(value: string) =>
//             setForm({ ...form, discount: parseFloat(value) })
//           }
//           error={errors.discount}
//         />
//         <CustomButton title="Create Dish" onPress={onSubmit} className="mt-6" />
//       </View>
//     </ScrollView>
//   );
// };

// export default DishForm;

import { useState } from "react";
import { ScrollView, View, Switch, Text, Image } from "react-native";
import { z } from "zod";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

const dishSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Dish name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be a positive number"),
  discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
  hidden: z.boolean().default(false),
});

type DishFormProps = {
  dish?: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    discount: number;
    hidden: boolean;
  };
  onSubmit: (dish: z.infer<typeof dishSchema>) => Promise<void>;
};

const DishForm = ({ dish, onSubmit }: DishFormProps) => {
  const [form, setForm] = useState<z.infer<typeof dishSchema>>({
    id: dish?.id || "",
    name: dish?.name || "",
    description: dish?.description || "",
    category: dish?.category || "",
    price: dish?.price || 0,
    discount: dish?.discount || 0,
    hidden: dish?.hidden || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      setErrors({});
      dishSchema.parse(form);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await onSubmit(form);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10">
        <InputField
          label="Dish Name"
          placeholder="Dish name"
          icon={icons.dish}
          value={form.name}
          onChangeText={(value: string) => setForm({ ...form, name: value })}
          error={errors.name}
        />
        <InputField
          label="Description"
          placeholder="Description"
          icon={icons.description}
          value={form.description}
          onChangeText={(value: string) =>
            setForm({ ...form, description: value })
          }
          error={errors.description}
        />
        <InputField
          label="Category"
          placeholder="Category"
          icon={icons.category}
          value={form.category}
          onChangeText={(value: string) =>
            setForm({ ...form, category: value })
          }
          error={errors.category}
        />
        <InputField
          label="Price"
          placeholder="Price"
          icon={icons.price}
          keyboardType="numeric"
          value={form.price.toString()}
          onChangeText={(value: string) =>
            setForm({ ...form, price: value ? parseFloat(value) : 0 })
          }
          error={errors.price}
        />
        <InputField
          label="Discount"
          placeholder="Discount"
          icon={icons.discount}
          keyboardType="numeric"
          value={form.discount.toString()}
          onChangeText={(value: string) =>
            setForm({ ...form, discount: value ? parseFloat(value) : 0 })
          }
          error={errors.discount}
        />
        <View className="my-2 w-full">
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500`}
          >
            <Image source={icons.hidden} className={`w-4 h-4 ml-4`} />
            <Text className="font-JakartaSemiBold mx-4">Hidden</Text>

            <Switch
              value={form.hidden}
              onValueChange={(value) => setForm({ ...form, hidden: value })}
              trackColor={{ false: "#767577", true: "#D1BC9F" }} // Change colors here
              thumbColor={form.hidden ? "#E7D4B5" : "#f4f3f4"} // Optional thumb color
            />
          </View>
        </View>

        <CustomButton
          title={dish ? "Update Dish" : "Create Dish"}
          onPress={handleSubmit}
          className="mt-6"
        />
      </View>
    </ScrollView>
  );
};

export default DishForm;
