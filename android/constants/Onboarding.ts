import { Colors } from "./Colors";
import { Images } from "./Images";
import i18n from "@/i18n";

export interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: ImageData;
  backgroundColor: string;
}

export const onBoardingItems: OnboardingItem[] = [
  {
    id: 1,
    title: i18n.t("onboarding.homemade_delights"),
    description: i18n.t("onboarding.homemade_desc"),
    image: Images.onboarding1,
    backgroundColor: Colors.chestnut["50"],
  },
  {
    id: 2,
    title: i18n.t("onboarding.swift_service"),
    description: i18n.t("onboarding.swift_desc"),
    image: Images.onboarding2,
    backgroundColor: Colors.chestnut["50"],
  },
  {
    id: 3,
    title: i18n.t("onboarding.personalized_cusine"),
    description: i18n.t("onboarding.personalized_desc"),
    image: Images.onboarding3,
    backgroundColor: Colors.chestnut["50"],
  },
];
