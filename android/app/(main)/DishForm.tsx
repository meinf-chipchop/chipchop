import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import TextArea from "@/components/TextArea";
import { Dish, createCookDish } from "@/lib/dishes";
import { useSession } from "@/auth/authContext";
import { DishCategory, getDishCategories } from "@/lib/dishCategories";
import SelectDropDown from "@/components/SelectDropDown";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Stack, router } from "expo-router";
import { z } from "zod";
import { AlertCircleIcon, ChevronLeftIcon } from "lucide-react-native";
import { useTranslation } from "react-i18next";

const globalStyles = "pb-4";

const DishForm = () => {
  const { t } = useTranslation();
  const { user } = useSession();
  const [dish, setDish] = useState<Dish>({
    name: "",
    description: "",
    category: 0,
    price: 0,
    discount: 0,
    estimated_time: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    estimated_time: "",
  });
  const [categories, setCategories] = useState<DishCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({
    ok: true,
    errors: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getDishCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleInputChange = (field: keyof Dish, value: string | number) => {
    setDish({ ...dish, [field]: value });
  };

  const validateForm = z.object({
    name: z.string().min(1, {
      message: t("validation_form.field_required", {
        field: t("labels.name"),
      }),
    }),
    description: z.string().min(1, {
      message: t("validation_form.field_required", {
        field: t("labels.description"),
      }),
    }),
    category: z
      .number()
      .positive(
        t("validation_form.field_required", { field: t("labels.category") })
      ),
    price: z
      .number()
      .positive(
        t("validation_form.field_required", { field: t("labels.price") })
      ),
    estimated_time: z.string().time({
      message: t("validation_form.field_required", {
        field: t("labels.estimated_time"),
      }),
    }),
  });

  const validate = () => {
    try {
      validateForm.parse(dish);
      setErrors({
        name: "",
        description: "",
        category: "",
        price: "",
        estimated_time: "",
      });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {
          name: "",
          description: "",
          category: "",
          price: "",
          estimated_time: "",
        };
        error.errors.forEach((err) => {
          if (err.path[0] === "name") newErrors.name = err.message;
          else if (err.path[0] === "description")
            newErrors.description = err.message;
          else if (err.path[0] === "category") newErrors.category = err.message;
          else if (err.path[0] === "price") newErrors.price = err.message;
          else if (err.path[0] === "estimated_time")
            newErrors.estimated_time = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (validate())
      if (user) {
        setLoading(true);
        createCookDish(user.id, dish)
          .then((response) => {
            console.log(response);
            setResponse({ ok: true, errors: "" });
            router.back();
          })
          .catch((error) => {
            setResponse({ ok: false, errors: error });
            console.error(error);
          })
          .finally(() => setLoading(false));
      } else {
        console.error("User not found");
        setResponse({ ok: false, errors: t("errors.user_not_found") });
      }
    else console.log(errors);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("dish.create"),
          headerLeft: () => (
            <Button
              className="pl-4"
              variant="link"
              onPress={() => router.back()}
            >
              <ButtonIcon as={ChevronLeftIcon} size="md" />
            </Button>
          ),
        }}
      />
      <SafeAreaView className="flex-1 bg-general-500">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
          }}
        >
          <InputField
            containerStyle={globalStyles}
            label={t("labels.name")}
            placeholder={t("dish.enter_name")}
            value={dish.name}
            onChangeText={(value) => handleInputChange("name", value)}
            error={errors.name}
          />
          <TextArea
            containerStyle={globalStyles}
            label={t("labels.description")}
            placeholder={t("dish.enter_description")}
            value={dish.description}
            onChangeText={(value) => handleInputChange("description", value)}
            error={errors.description}
          />
          <FormControl className={globalStyles} isInvalid={!!errors.category}>
            <FormControlLabel>
              <FormControlLabelText>
                {t("labels.category")}
              </FormControlLabelText>
            </FormControlLabel>
            <SelectDropDown
              placeholder={t("dish.select_category")}
              empty={{ label: t("dish.no_categories"), value: "" }}
              items={categories.map((category) => ({
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
            containerStyle={globalStyles}
            label={t("labels.price")}
            placeholder={t("dish.enter_price")}
            value={dish.price.toString()}
            onChangeText={(value) =>
              handleInputChange("price", parseFloat(value))
            }
            keyboardType="numeric"
            error={errors.price}
          />
          <InputField
            containerStyle={globalStyles}
            label={t("labels.discount")}
            placeholder={t("dish.enter_discount")}
            value={dish.discount?.toString()}
            onChangeText={(value) =>
              handleInputChange("discount", parseFloat(value))
            }
            keyboardType="numeric"
          />
          <InputField
            containerStyle={globalStyles}
            label={t("labels.estimated_time")}
            placeholder={t("dish.enter_estimated_time")}
            value={dish.estimated_time}
            onChangeText={(value) => handleInputChange("estimated_time", value)}
            error={errors.estimated_time}
          />
        </ScrollView>
        <Button
          className="rounded-full object-bottom mb-10 mx-10"
          disabled={loading}
          onPress={handleSubmit}
        >
          {loading && <ButtonSpinner />}
          <ButtonText>{t("labels.create")}</ButtonText>
        </Button>
        {response.errors.length > 0 && (
          <Text className="color-error-400 text-center font-bold">
            {response.errors}
          </Text>
        )}
      </SafeAreaView>
    </>
  );
};

export default DishForm;
