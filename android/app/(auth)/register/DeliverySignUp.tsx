import { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { z } from "zod";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import InputField from "@/components/InputField";
import { Heading } from "@/components/ui/heading";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Bike, ChevronDownIcon } from "lucide-react-native";
import { NewDeliver, Vehicle, createDeliver } from "@/lib/delivery";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSession } from "@/auth/authContext";

const DeliverySignUp = () => {
  const { signUp } = useSession();
  const { t } = useTranslation();
  const [form, setForm] = useState<NewDeliver>({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      birth_date: "",
    },
    vehicle: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const signUpValidationSchema = z.object({
    vehicle: z.string().min(1, t("validation_form.first_name_required")),
  });

  const validateForm = () => {
    try {
      if (!form.user) return false;
      setErrors({});
      signUpValidationSchema.parse(form);
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

  const [response, setResponse] = useState({ ok: true, errors: "" });
  const onSignUpPress = async () => {
    if (validateForm()) {
      setLoading(true);
      signUp(form, "deliver")
        .then((res) => {
          if (res.length === 0) {
            setResponse({ errors: "", ok: true });
            router.push("/home");
          } else setResponse({ ok: false, errors: res });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <ScrollView className="flex bg-white pt-4">
        <View className="flex-1 bg-white mb-10 gap-2">
          <Heading className="mb-4">
            {t("auth.register_as") + " " + t("labels.deliver").toLowerCase()}
          </Heading>

          <InputField
            label={t("user.first_name")}
            placeholder={t("user.first_name")}
            leftIcon={<Ionicons name="person" size={14} />}
            value={form.user?.first_name}
            onChangeText={(value: string) =>
              setForm({ ...form, user: { ...form.user, first_name: value } })
            }
            error={errors.first_name}
          />
          <InputField
            label={t("user.second_name")}
            placeholder={t("user.second_name")}
            leftIcon={<Ionicons name="person" size={14} />}
            value={form.user.last_name}
            onChangeText={(value: string) =>
              setForm({ ...form, user: { ...form.user, last_name: value } })
            }
          />
          <InputField
            label={t("user.email")}
            placeholder={t("user.email")}
            leftIcon={<Ionicons name="mail" size={14} />}
            textContentType="emailAddress"
            value={form.user.email}
            onChangeText={(value: string) =>
              setForm({ ...form, user: { ...form.user, email: value } })
            }
            error={errors.email}
          />
          <InputField
            label={t("user.password")}
            placeholder={t("user.password")}
            leftIcon={<Ionicons name="lock-closed" size={14} />}
            secureTextEntry={true}
            textContentType="password"
            value={form.user.password}
            onChangeText={(value: string) =>
              setForm({ ...form, user: { ...form.user, password: value } })
            }
            error={errors.password}
          />
          <InputField
            label={t("user.phone_number")}
            placeholder={t("user.phone_number")}
            leftIcon={<Ionicons name="call" size={14} />}
            textContentType="telephoneNumber"
            value={form.user.phone}
            onChangeText={(value: string) =>
              setForm({ ...form, user: { ...form.user, phone: value } })
            }
            error={errors.phone}
          />
          <InputField
            label={t("user.age")}
            placeholder={t("user.age")}
            leftIcon={<Ionicons name="calendar" size={14} />}
            textContentType="birthdateDay"
            value={form.user.birth_date}
            onChangeText={(value: string) =>
              setForm({ ...form, user: { ...form.user, birth_date: value } })
            }
            error={errors.birth_date}
          />

          <FormControl isInvalid={!!errors.vehicle}>
            <FormControlLabel>
              <FormControlLabelText>{t("vehicle.type")}</FormControlLabelText>
            </FormControlLabel>
            <Select
              className="bg-background-50"
              onValueChange={(value) =>
                setForm({ ...form, vehicle: value as Vehicle })
              }
            >
              <SelectTrigger variant="rounded" size="md">
                <Bike className="ml-3" />
                <SelectInput placeholder={t("vehicle.select")} />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label={t("vehicle.car")} value="C" />
                  <SelectItem label={t("vehicle.bycicle")} value="B" />
                  <SelectItem label={t("vehicle.scooter")} value="S" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormControl>

          <Button
            disabled={loading}
            onPress={onSignUpPress}
            className="rounded-full mt-6"
          >
            {loading && <ButtonSpinner />}
            <ButtonText>{t("auth.sign_up")}</ButtonText>
          </Button>
          {response.errors.length > 0 && (
            <Text className="color-error-400 text-center font-bold">
              {response.errors}
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default DeliverySignUp;
