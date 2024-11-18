import ActionableItem from "@/components/ActionableItem";
import LanguageSelector from "@/components/LanguageSelector";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { getLanguageCode, getLanguageName } from "@/i18n/languageUtils";
import { useStorageState } from "@/storage/useStorageState";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [[loading, languageCode], setLanguageCode] =
    useStorageState("selectedLanguage");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (!loading && languageCode) {
      const name = getLanguageName(languageCode);
      console.log("name " + name + "code " + languageCode);
      if (name) setLanguage(name);
    }
  }, [loading, languageCode]);

  return (
    <SafeAreaView>
      <Box className="w-full max-w-[600px] m-auto p-4">
        <VStack space="md">
          <Box>
            <Divider className="mt-4 mb-4" />
            <Heading size="sm" className="mb-2">
              Language
            </Heading>
            <LanguageSelector
              language={language ?? ""}
              setLanguage={(name) => {
                setLanguage(name);
                const code = getLanguageCode(name);
                console.log("code", code);
                if (code) setLanguageCode(code);
              }}
              availableLanguages={["English", "Spanish"]}
              className="w-fit"
            />
          </Box>
          <Divider />
          <ActionableItem text="Profile" onPress={() => {}} />
          <ActionableItem text="Policy and Privacy" onPress={() => {}} />
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default Settings;
