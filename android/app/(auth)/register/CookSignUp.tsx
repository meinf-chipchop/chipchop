import { useState } from "react";
import { ScrollView, View } from "react-native";
import { z } from "zod";
import InputField from "@/components/InputField";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "@/auth/authContext";
import { useTranslation } from "react-i18next";
import { NewCook } from "@/lib/cook";
import { Heading } from "@/components/ui/heading";
import SignUpForm from "@/components/SignUpForm";

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

        <SignUpForm
          user={form.user}
          loading={loading}
          onChange={(value) => setForm({ ...form, user: value })}
          onSignUpPress={onSignUpPress}
          response={{ errors: response.errors }}
          additionalFields={
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
          }
        />
      </View>
    </ScrollView>
  );
};

export default CookSignUp;
