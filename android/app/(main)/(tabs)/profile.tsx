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

const Profile = () => {
  const { user, signOut } = useSession();
  const { t } = useTranslation();

  return (
    <ScrollView className="px-12">
      <VStack space="md">
        <Avatar>
          <AvatarFallbackText>{user?.first_name}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
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
