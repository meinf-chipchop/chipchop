import { Colors } from "./Colors";
import { Images } from "./Images";
import en from "@/i18n/locales/en-US.json";

type OnBoardingKeys = `onboarding.${keyof typeof en.onboarding}`;

export interface OnboardingItem {
  id: number;
  title: OnBoardingKeys;
  description: OnBoardingKeys;
  image: ImageData;
  backgroundColor: string;
}

export const onBoardingItems: OnboardingItem[] = [
  {
    id: 1,
    title: "onboarding.homemade_delights",
    description: "onboarding.homemade_desc",
    image: Images.onboarding1,
    backgroundColor: Colors.chestnut["50"],
  },
  {
    id: 2,
    title: "onboarding.swift_service",
    description: "onboarding.swift_desc",
    image: Images.onboarding2,
    backgroundColor: Colors.chestnut["50"],
  },
  {
    id: 3,
    title: "onboarding.personalized_cusine",
    description: "onboarding.personalized_cusine",
    image: Images.onboarding3,
    backgroundColor: Colors.chestnut["50"],
  },
];
