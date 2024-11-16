import { useSession } from "@/auth/authContext";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut } = useSession();
  return (
    <SafeAreaView>
      <Text>Profile Page</Text>
      <Button
        onPress={() => {
          signOut();
        }}
      >
        <ButtonText>Logout</ButtonText>
      </Button>
    </SafeAreaView>
  );
};

export default Profile;
