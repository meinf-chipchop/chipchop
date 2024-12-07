import ActionableItem from "@/components/ActionableItem";
import LanguageSelector from "@/components/LanguageSelector";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import i18n from "@/i18n";
import { getLanguageCode, getLanguageName } from "@/i18n/languageUtils";
import { useStorageState } from "@/storage/useStorageState";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [[loading, languageCode], setLanguageCode] =
    useStorageState("selectedLanguage");
  const [language, setLanguage] = useState("");
  const { t } = useTranslation();

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
            <Heading size="sm" className="mb-2">
              {t("labels.language")}
            </Heading>
            <LanguageSelector
              language={language ?? ""}
              setLanguage={(name) => {
                setLanguage(name);
                const code = getLanguageCode(name);
                console.log("code", code);
                if (code) setLanguageCode(code);
                i18n.changeLanguage(code);
              }}
              availableLanguages={["English", "Spanish"]}
              className="w-fit"
            />
          </Box>
          <Divider />
          <ActionableItem text={t("labels.profile")} onPress={() => {}} />
          <ActionableItem
            text={t("labels.policy_and_privacy")}
            onPress={() => {}}
          />
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default Settings;
