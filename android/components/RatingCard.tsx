import { Star, StarHalf } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

interface RatingCardProps {
    rating_average: number;
    rating_count: number | null;
}

const RatingCard = ({ rating_average, rating_count }: RatingCardProps) => {

    const { t } = useTranslation();

    return (
        <View className="w-auto">
            <View className="flex flex-col">
                <View className="flex flex-row gap-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} fill="#111" strokeWidth={0} />
                    ))}
                </View>
                <View className="flex flex-row absolute gap-x-1">
                    {Array.from({ length: Math.floor(rating_average) }, (_, index) => (
                        <Star key={index} fill="yellow" strokeWidth={0} />
                    ))}
                    {rating_average % 1 !== 0 && <StarHalf fill="yellow" strokeWidth={0} />}
                </View>
                {rating_count ? <View className="mx-2 flex w-auto align-center">
                    <Text className="italic text-primary-200 drop-shadow-lg text-center w-full">{rating_count} {t('rating.ratings')}</Text>
                </View> : null
                }
            </View>
        </View>
    );
}

export default RatingCard;