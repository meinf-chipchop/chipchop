import { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { z } from "zod";
import InputField from "@/components/InputField";
import { router } from "expo-router";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "@/auth/authContext";
import { useTranslation } from "react-i18next";
import { NewCook } from "@/lib/cook";
import { Heading } from "@/components/ui/heading";

const CookSignUp = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<NewCook>({
    public_name: "",
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      birth_date: "",
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { signUp } = useSession();

  const signUpValidationSchema = z.object({
    public_name: z.string().min(1, t("validation_form.first_name_required")),
    first_name: z.string().min(1, t("validation_form.first_name_required")),
    email: z.string().email(t("validation_form.invalid_email")),
    password: z.string().min(8, t("validation_form.password_min_length")),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, t("validation_form.invalid_phone_number")),
    birth_date: z
      .string()
      .min(1, t("validation_form.age_required"))
      .regex(/^\d{4}-\d{2}-\d{2}$/, t("validation_form.age_invalid")),
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
      signUp(form, "cook")
        .then((res) => {
          if (res.length === 0) {
            setResponse({ ok: true, errors: "" });
            router.push("/");
          } else setResponse({ ok: false, errors: res });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10 gap-2">
        <Heading className="mb-4">
          {t("auth.register_as") + " " + t("labels.cook").toLowerCase()}
        </Heading>

        <InputField
          label={t("user.first_name")}
          placeholder={t("user.first_name")}
          leftIcon={<Ionicons name="person" size={14} />}
          value={form.user.first_name}
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

        <InputField
          label={t("user.public_name")}
          placeholder={t("user.public_name")}
          leftIcon={<Ionicons name="restaurant-outline" size={14} />}
          value={form.public_name}
          onChangeText={(value: string) =>
            setForm({ ...form, public_name: value })
          }
          error={errors.public_name}
        />
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
  );
};

export default CookSignUp;
