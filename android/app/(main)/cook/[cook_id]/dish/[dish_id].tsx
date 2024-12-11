import NotFoundScreen from "@/app/+not-found";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Dish, getDish, updateDish } from "@/lib/dishes";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { t } from "i18next";
import {
  AlertCircleIcon,
  ChevronLeftIcon,
  PencilIcon,
  SaveIcon,
} from "lucide-react-native";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useEffect, useState } from "react";
import TextArea from "@/components/TextArea";
import InputField from "@/components/InputField";
import { DishCategory, getDishCategories } from "@/lib/dishCategories";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import SelectDropDown from "@/components/SelectDropDown";
import { me, Me } from "@/lib/auth";

export default function DetailsScreen() {
  const { dish_id, cook_id } = useLocalSearchParams();

  const [dish, setDish] = useState<Dish | null>(null);
  const [categories, setCategories] = useState<DishCategory[]>([]);
  const [selfUser, setSelfUser] = useState<Me | null>(null);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!dish_id || !cook_id) return;
    getDishCategories().then(setCategories);

    // Fetch dish
    getDish(Number(cook_id), Number(dish_id))
      .then((dish) => {
        setDish(dish);
      })
      .catch((error) => {
        // Redirect to notfound
        NotFoundScreen();
      });
  }, [dish_id]);

  useEffect(() => {
    me().then((user) => setSelfUser(user));
  }, []);

  console.log("Dish->", dish);
  console.log("Categories->", categories);
  console.log("SelfUser->", selfUser);

  const handleInputChange = (field: keyof Dish, value: string | number) => {
    if (dish) {
      setDish({ ...dish, [field]: value });
    }
  };

  function handleUpdate() {
    if (!dish) return;
    updateDish(Number(cook_id), Number(dish_id), dish)
      .then(() => setEditMode(false))
      .catch((error) => {
        console.error(error);
        setAlert(error.message);
      });
  }

  const isOwner = selfUser?.id === Number(cook_id);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    estimated_time: "",
  });

  const [alert, setAlert] = useState("");

  return (
    <>
      {alert && (
        <Alert action="error" variant="solid">
          <AlertIcon />
          <AlertText>{alert}</AlertText>
        </Alert>
      )}
      <Stack.Screen
        options={{
          headerTitle: dish?.name ?? t("labels.loading"),
          headerLeft: () => (
            <Button
              className="pl-4"
              variant="link"
              onPress={() => router.back()}
            >
              <ButtonIcon as={ChevronLeftIcon} size="md" />
            </Button>
          ),
          headerRight: () =>
            isOwner &&
            (!editMode ? (
              <Button
                className="mr-4"
                size="sm"
                onPress={() => setEditMode(true)}
              >
                <ButtonIcon as={PencilIcon} size="md" />
              </Button>
            ) : (
              <Button
                className="mr-4 bg-green-400"
                size="sm"
                onPress={handleUpdate}
              >
                <ButtonIcon as={SaveIcon} size="md" />
              </Button>
            )),
        }}
      />
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Image
            source={
              (dish?.image_url ??
                require("../../../../../assets/images/no-dish-image.png")) as ImageSourcePropType
            }
            className="w-screen aspect-video drop-shadow"
          />

          <View className="flex-col gap-1 px-3">
            {editMode && (
              <>
                <InputField
                  label={t("labels.name")}
                  placeholder={t("dish.enter_name")}
                  value={dish?.name || ""}
                  onChangeText={(value) => handleInputChange("name", value)}
                  error={errors.name}
                  disabled={!editMode}
                />
                <InputField
                  label={t("labels.name")}
                  placeholder={t("labels.image_url")}
                  value={dish?.image_url || ""}
                  onChangeText={(value) =>
                    handleInputChange("image_url", value)
                  }
                  disabled={!editMode}
                />
              </>
            )}
            <TextArea
              label={t("labels.description")}
              placeholder={t("dish.enter_description")}
              value={dish?.description || ""}
              onChangeText={(value) => handleInputChange("description", value)}
              error={errors.description}
              disabled={!editMode}
            />
            <FormControl isInvalid={!!errors.category}>
              <FormControlLabel>
                <FormControlLabelText>
                  {t("labels.category")}
                </FormControlLabelText>
              </FormControlLabel>
              <SelectDropDown
                placeholder={t("dish.select_category")}
                empty={{ label: t("dish.no_categories"), value: "" }}
                selectedValue={dish?.category.toString() || ""}
                disabled={!editMode}
                items={categories?.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                onValueChange={(value: string) =>
                  handleInputChange("category", parseInt(value))
                }
              />
              <FormControlError className="pl-3">
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText className="text-sm">
                  {errors.category}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <InputField
              label={t("labels.price")}
              placeholder={t("dish.enter_price")}
              value={dish?.price.toString() || ""}
              disabled={!editMode}
              onChangeText={(value) =>
                handleInputChange("price", parseFloat(value))
              }
              keyboardType="numeric"
              error={errors.price}
            />
            <InputField
              label={t("labels.discount")}
              placeholder={t("dish.enter_discount")}
              value={dish?.discount?.toString() || ""}
              disabled={!editMode}
              onChangeText={(value) =>
                handleInputChange("discount", parseFloat(value))
              }
              keyboardType="numeric"
            />
            <InputField
              label={t("labels.estimated_time")}
              placeholder={t("dish.enter_estimated_time")}
              value={dish?.estimated_time || ""}
              disabled={!editMode}
              onChangeText={(value) =>
                handleInputChange("estimated_time", value)
              }
              error={errors.estimated_time}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
