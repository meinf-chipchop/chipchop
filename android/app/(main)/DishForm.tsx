import { useState } from "react";
import { ScrollView, Text, View, Switch } from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/ui/button";
import TextArea from "@/components/TextArea";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";

const globalStyles = "pb-4";

const DishForm = () => {
  //
  const [dish, setDish] = useState<Dish>({
    user: "", // Default value for user
    name: "",
    description: "",
    price: 0,
    discount: 0,
    hidden: false,
    createdAt: new Date(),
  });

  const handleInputChange = (
    field: keyof Dish,
    value: string | number | boolean
  ) => {
    setDish({ ...dish, [field]: value });
  };

  const handleSubmit = () => { };

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
          value={dish.discount.toString()}
          onChangeText={(value) =>
            handleInputChange("discount", parseFloat(value))
          }
          keyboardType="numeric"
        />
        <FormControl className={`space-y-4 ${globalStyles}`}>
          <FormControlLabel>
            <FormControlLabelText> Visibility</FormControlLabelText>
          </FormControlLabel>
          <View className="flex-row pl-1">
            <Text>Private</Text>
            <Switch
              className="mx-4"
              trackColor={{ false: "red", true: "green" }}
              thumbColor={!dish.hidden ? "#FF0000" : "#00FF00"}
              activeThumbColor={"green"} // for web
              onValueChange={() => {
                handleInputChange("hidden", !dish.hidden);
              }}
              value={dish.hidden}
            />
            <Text>Public</Text>
          </View>
        </FormControl>
        <InputField
          containerStyle={globalStyles}
          label="Image URL"
          placeholder="Enter image URL"
          value={dish.imageUrl}
          onChangeText={(value) => handleInputChange("imageUrl", value)}
        />
        <InputField
          containerStyle={globalStyles}
          label="Estimated Time"
          placeholder="Enter estimated time"
          value={dish.estimatedTime}
          onChangeText={(value) => handleInputChange("estimatedTime", value)}
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
