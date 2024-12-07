import { useStorageState } from "@/storage/useStorageState";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "./ui/select";
import { ChevronDownIcon } from "lucide-react-native";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages?: string[];
  className?: string;
}

const LanguageSelector = ({
  language,
  setLanguage,
  availableLanguages,
  className,
}: LanguageSelectorProps) => {

  return (
    <Select
      initialLabel={language}
      selectedValue={language}
      onValueChange={setLanguage}
      className={className}
    >
      <SelectTrigger variant="rounded">
        <SelectInput placeholder="Select language" />
        <SelectIcon as={ChevronDownIcon} className="mr-3" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {availableLanguages?.map((name) => (
            <SelectItem key={name} label={name} value={name} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default LanguageSelector;
