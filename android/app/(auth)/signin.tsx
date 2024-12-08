import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { z } from "zod";
import { useSession } from "@/context/authContext";
import { router } from "expo-router";
import InputField from "@/components/InputField";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation();
  const { signIn } = useSession();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ ok: true, errors: "" });

  const signInValidationSchema = z.object({
    email: z.string().email(t("validation_form.invalid_email")),
  });

  const validateForm = () => {
    try {
      setErrors({ email: "", password: "" });
      signInValidationSchema.parse(form);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = { email: "", password: "" };
        error.errors.forEach((err) => {
          if (err.path[0] === "email") newErrors.email = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const onSignInPress = async () => {
    if (validateForm()) {
      setLoading(true);
      signIn(form.email, form.password)
        .then((res) => {
          if (res.length === 0) {
            setResponse({ ok: true, errors: "" });
            router.push("/home");
          } else setResponse({ ok: false, errors: res });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white gap-4">
        <InputField
          label={t("user.email")}
          placeholder={t("user.email")}
          leftIcon={<Ionicons name="mail" size={14} />}
          textContentType="emailAddress"
          value={form.email}
          onChangeText={(value: string) => setForm({ ...form, email: value })}
          error={errors.email}
        />
        <InputField
          label={t("user.password")}
          placeholder={t("user.password")}
          leftIcon={<Ionicons name="lock-closed" size={16} />}
          secureTextEntry={true}
          textContentType="password"
          value={form.password}
          onChangeText={(value: string) =>
            setForm({ ...form, password: value })
          }
          error={errors.password}
        />
        <Text className="text-sm text-right font-JakartaSemiBold text-primary-500 my-2">
          {t("auth.forgot_password")}
        </Text>
        <Button
          disabled={loading}
          onPress={onSignInPress}
          className="mt-6 rounded-full"
        >
          {loading && <ButtonSpinner />}
          <ButtonText>{t("auth.sign_in")}</ButtonText>
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
export default SignIn;
