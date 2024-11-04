import { Colors } from './Colors'
import { Images } from './Images'

export interface OnboardingItem {
  id: number
  title: string
  description: string
  image: ImageData
  backgroundColor: string
}

export const onBoardingItems: OnboardingItem[] = [
  {
    id: 1,
    title: 'Homemade Delights',
    description:
      'Home-cooked favorites, crafted by the chef and delivered fresh to you!',
    image: Images.onboarding1,
    backgroundColor: Colors.chestnut['50'],
  },
  {
    id: 2,
    title: 'Swift Service',
    description:
      'Fast, fresh delivery right to your door—enjoy every meal with ease!',
    image: Images.onboarding2,
    backgroundColor: Colors.chestnut['50'],
  },
  {
    id: 3,
    title: 'Personalized Cuisine',
    description: 'Your favorite meals, delivered to you!',
    image: Images.onboarding3,
    backgroundColor: Colors.chestnut['50'],
  },
]
