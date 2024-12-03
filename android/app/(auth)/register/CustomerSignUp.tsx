import { useState } from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "@/auth/authContext";
import { NewUser } from "@/lib/auth";
import SignUpForm from "@/components/SignUpForm";

const CUstomerSignUp = () => {
  const [form, setForm] = useState<NewUser>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    birth_date: "",
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useSession();

  const [response, setResponse] = useState({ ok: true, errors: "" });
  const onSignUpPress = async () => {
    setLoading(true);
    signUp(form, "customer")
      .then((res) => {
        if (res.length === 0) {
          setResponse({ ok: true, errors: "" });
          router.push("/home");
        } else setResponse({ ok: false, errors: res });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScrollView className="flex-1 bg-white pt-4">
      <View className="flex-1 bg-white mb-10 gap-2">
        <SignUpForm
          user={form}
          loading={loading}
          onChange={(value) => setForm(value)}
          onSignUpPress={onSignUpPress}
          response={{ errors: response.errors }}
        />
      </View>
    </ScrollView>
  );
};

export default CUstomerSignUp;
