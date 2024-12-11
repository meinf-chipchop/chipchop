import { ScrollView, View, Text } from "react-native";
import { z } from "zod";
import InputField from "@/components/InputField";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { NewUser } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface UserFormProps {
  user: NewUser;
  onChange: (user: NewUser) => void;
  loading: boolean;
  onSignUpPress: () => void;
  response: { errors: string };
  additionalFields?: React.ReactNode;
  additionalFieldsValidation?: () => boolean
}

const SignUpForm = ({
  user,
  onChange,
  loading,
  onSignUpPress,
  response,
  additionalFields,
  additionalFieldsValidation
}: UserFormProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const signUpValidationSchema = z.object({
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
      signUpValidationSchema.parse(user);
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

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10 gap-2">
        <InputField
          label={t("user.first_name")}
          placeholder={t("user.first_name")}
          leftIcon={<Ionicons name="person" size={14} />}
          value={user.first_name}
          onChangeText={(value: string) =>
            onChange({ ...user, first_name: value })
          }
          error={errors.first_name}
        />
        <InputField
          label={t("user.second_name")}
          placeholder={t("user.second_name")}
          leftIcon={<Ionicons name="person" size={14} />}
          value={user.last_name}
          onChangeText={(value: string) =>
            onChange({ ...user, last_name: value })
          }
        />
        <InputField
          label={t("user.email")}
          placeholder={t("user.email")}
          leftIcon={<Ionicons name="mail" size={14} />}
          textContentType="emailAddress"
          value={user.email}
          onChangeText={(value: string) => onChange({ ...user, email: value })}
          error={errors.email}
        />
        <InputField
          label={t("user.password")}
          placeholder={t("user.password")}
          leftIcon={<Ionicons name="lock-closed" size={14} />}
          secureTextEntry={true}
          textContentType="password"
          value={user.password}
          onChangeText={(value: string) =>
            onChange({ ...user, password: value })
          }
          error={errors.password}
        />
        <InputField
          label={t("user.phone_number")}
          placeholder={t("user.phone_number")}
          leftIcon={<Ionicons name="call" size={14} />}
          textContentType="telephoneNumber"
          value={user.phone}
          onChangeText={(value: string) => onChange({ ...user, phone: value })}
          error={errors.phone}
        />
        <InputField
          label={t("user.age")}
          placeholder={t("user.age")}
          leftIcon={<Ionicons name="calendar" size={14} />}
          textContentType="birthdateDay"
          value={user.birth_date}
          onChangeText={(value: string) =>
            onChange({ ...user, birth_date: value })
          }
          error={errors.birth_date}
        />
        {additionalFields}
        <Button
          disabled={loading}
          onPress={() => {
            let validation = true;
            if (additionalFieldsValidation)
              validation = additionalFieldsValidation();
            if (validateForm() && validation) onSignUpPress();
          }}
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

export default SignUpForm;
