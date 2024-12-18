import { useSession } from "@/context/authContext";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { ScrollView } from "react-native";
import { Divider } from "@/components/ui/divider";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Me, me } from "@/lib/auth";

const Profile = () => {
  const { signOut } = useSession();
  const { t } = useTranslation();

  const [user, setSelfUser] = useState<Me | null>(null);
  useEffect(() => {
    me().then((user) => setSelfUser(user));
  }, []);

  return (
    <ScrollView className="px-12 pt-[2rem]">
      <VStack space="md">
        <Avatar>
          <AvatarFallbackText>{user?.first_name || "?"}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: `https://ui-avatars.com/api/?name=${
                user?.first_name || "?"
              }`,
            }}
          />
        </Avatar>
        <Text>{user?.first_name + " " + user?.last_name}</Text>
        <Button
          variant="outline"
          className="bg-red-400 color-red-400"
          onPress={() => signOut()}
        >
          <ButtonText className="color-white">{t("auth.sign_out")}</ButtonText>
        </Button>
        <Divider />
      </VStack>
    </ScrollView>
  );
};

export default Profile;
