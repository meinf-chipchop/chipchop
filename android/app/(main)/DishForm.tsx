import { useState } from "react";
import { ScrollView, Text } from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import TextArea from "@/components/TextArea";
import { Dish, createCookDish } from "@/lib/dishes";
import { useSession } from "@/auth/authContext";

const globalStyles = "pb-4";

const DishForm = () => {
  const { user } = useSession();
  const [dish, setDish] = useState<Dish>({
    name: "",
    description: "",
    category: "",
    price: 0,
    discount: 0,
  });

  const handleInputChange = (field: keyof Dish, value: string | number) => {
    setDish({ ...dish, [field]: value });
  };

  const handleSubmit = () => {
    if (user) {
      createCookDish(user.id, dish).then((response) => {
        console.log(response);
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-general-500">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
        }}
      >
        <InputField
          containerStyle={globalStyles}
          label="Name"
          placeholder="Enter dish name"
          value={dish.name}
          onChangeText={(value) => (dish.name = value)}
        />
        <TextArea
          containerStyle={globalStyles}
          label="Description"
          placeholder="Enter dish description"
          value={dish.description}
          onChangeText={(value) => handleInputChange("description", value)}
        />
        <InputField
          containerStyle={globalStyles}
          label="Category"
          placeholder="Enter category"
          value={dish.category}
          onChangeText={(value) => handleInputChange("category", value)}
        />
        <InputField
          containerStyle={globalStyles}
          label="Price"
          placeholder="Enter price"
          value={dish.price.toString()}
          onChangeText={(value) =>
            handleInputChange("price", parseFloat(value))
          }
          keyboardType="numeric"
        />
        <InputField
          containerStyle={globalStyles}
          label="Discount"
          placeholder="Enter discount"
          value={dish.discount?.toString()}
          onChangeText={(value) =>
            handleInputChange("discount", parseFloat(value))
          }
          keyboardType="numeric"
        />
        <InputField
          containerStyle={globalStyles}
          label="Estimated Time"
          placeholder="Enter estimated time"
          value={dish.estimated_time}
          onChangeText={(value) => handleInputChange("estimated_time", value)}
        />
      </ScrollView>
      <Text>{dish.description}</Text>
      <Button
        className="rounded-full object-bottom mb-10 mx-10"
        onPress={handleSubmit}
      >
        <ButtonText>Create</ButtonText>
      </Button>
    </SafeAreaView>
  );
};

export default DishForm;
