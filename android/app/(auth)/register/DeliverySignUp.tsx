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
import { NewDeliver, Vehicle } from "@/lib/delivery";
import { router } from "expo-router";
import { useSession } from "@/auth/authContext";
import SignUpForm from "@/components/SignUpForm";

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
    vehicle: z.string(). min(1, t("validation_form.first_name_required")),
  });

  const validateForm = () => {
    try {
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
    <ScrollView className="flex bg-white pt-4">
      <View className="flex-1 bg-white mb-10 gap-2">
        <Heading className="mb-4">
          {t("auth.register_as") + " " + t("labels.deliver").toLowerCase()}
        </Heading>

        <SignUpForm
          user={form.user}
          loading={loading}
          onChange={(value) => setForm({ ...form, user: value })}
          onSignUpPress={onSignUpPress}
          response={{ errors: response.errors }}
          additionalFields={
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
                    <SelectItem label={t("vehicle.bycicle")} value="B" />
                    <SelectItem label={t("vehicle.car")} value="C" />
                    <SelectItem label={t("vehicle.scooter")} value="S" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>
          }
        />
      </View>
    </ScrollView>
  );
};

export default DeliverySignUp;
