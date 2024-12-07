import React, { useState } from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { formatDate } from '@/lib/utils';
import { Dish, getDiscountedPrice } from '@/lib/dishes';
import RatingCard from './RatingCard';
import { Button, ButtonIcon, ButtonText } from './ui/button';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUp, ShoppingCartIcon } from 'lucide-react-native';
import { HR } from '@expo/html-elements';


export const CookProfileExpandableDishCard = ({ dish }: { dish: Dish }) => {
  const discountedPrice = getDiscountedPrice(dish);
  const [isExpanded, setExpanded] = useState(false);

  const { t } = useTranslation();

  return (
    <View className="flex flex-col w-full bg-white rounded-md px-3 py-1 shadow-sm">
      <View className="flex flex-row items-center gap-x-2 w-full mb-2">
        {/* Dish Image */}
        <View className="w-16 h-16 mr-4">
          <Image
            source={dish.image_url as ImageSourcePropType}
            className="w-full h-full object-cover rounded-md"
          />
        </View>

        {/* Dish Details */}
        <View className="flex-1 mx-2">
          <View className="flex flex-row gap-x-2">
            <Text className="font-bold text-md text-gray-800 align-baseline">{dish.name}</Text>
            {!isExpanded && dish.rating_average && <Text className="text-sm text-gray-500">{dish.rating_average}/5 ({dish.rating_count})</Text>}
          </View>
          <View className="flex flex-row gap-x-2">
            <Text className="text-primary-500 font-semibold align-baseline">
              ${discountedPrice ? discountedPrice.toFixed(2) : dish.price.toFixed(2)}
            </Text>
            {discountedPrice && (
              <Text className="line-through text-red-900 text-sm">
                ${dish.price.toFixed(2)}
              </Text>
            )}
          </View>
        </View>

        {/* Add to Cart Button */}
        <Button
          className="pl-4 bg-secondary-500 rounded w-auto shadow-lg border-primary-500 border-solid border-2"
          variant="link"
          onPress={() => console.log("Add to Cart")}
        >
          <ButtonIcon as={ShoppingCartIcon} size="md" color='white' className="w-auto pr-4" />
        </Button>
      </View>

      {
        isExpanded && (
          <View className="flex flex-col gap-2 mb-2">
            {/* Dish Description */}

            {/* Rating */}
            <View className="w-auto align-center items-center bg-gradient-to-br from-primary-500 to-primary-700 rounded-md py-2">
              {(dish.rating_average !== undefined && Number(dish.rating_average) != 0) ? (
                <RatingCard
                  rating_average={Number(dish.rating_average)}
                  rating_count={Number(dish.rating_count)}
                />
              ) : (
                <Text className="text-white text-center">{t('rating.no_ratings')}</Text>
              )}
            </View>

            <Text className="text-gray-600 text-sm">{dish.description}</Text>
            <View className="flex flex-row gap-x-2 m-auto">
              <Button className="w-auto h-6 mt-1">
                <ButtonText className="text-primary-200 text-xs">
                  {dish.category ?? t('dish.uncategorized')}
                </ButtonText>
              </Button>
              {dish.estimated_time && (
                <Text className="text-xs italic">
                  {t('dish.estimated_time')}: <b className="text-md">{dish.estimated_time}</b>
                </Text>
              )}
            </View>
          </View>
        )
      }

      <HR className="pt-2" />
      <View className="w-full m-auto align-center">
        <Button
          className="w-auto"
          variant="link"
          onPress={() => setExpanded(!isExpanded)}
        >
          <ButtonIcon as={isExpanded ? ArrowUp : ArrowDown} />
        </Button>
      </View>
    </View>
  );
};

export const CookProfileDishCard = ({ dish }: { dish: Dish }) => {
  const discountedPrice = getDiscountedPrice(dish);
  const { t } = useTranslation();

  return (
    <View className="bg-gradient-to-br from-primary-500 to-primary-700 p-4 shadow-xl flex flex-row w-full justify-between">
      {/* Left Section */}
      <View className="flex flex-col gap-3">
        {/* Dish Image */}
        <View className="w-28 h-28 bg-white shadow-md rounded-md overflow-hidden">
          <Image
            source={dish.image_url as ImageSourcePropType}
            className="w-full h-full object-cover"
          />
        </View>

        {/* Rating */}
        {dish.rating_average !== undefined && dish.rating_count !== undefined && (
          <RatingCard
            rating_average={Number(dish.rating_average)}
            rating_count={Number(dish.rating_count)}
          />
        )}

        {/* Estimated Time & Price */}
        <View className="flex flex-col gap-1">
          {dish.estimated_time && (
            <Text className="text-primary-200 text-xs italic">
              {t('dish.estimated_time')}: <b className="text-md">{dish.estimated_time}</b>
            </Text>
          )}
          {discountedPrice ? (
            <View className="flex flex-col rounded p-2">
              <View className="flex flex-row gap-x-2 align-bottom">
                <Text className="font-extrabold text-lg text-white">
                  ${discountedPrice.toFixed(2)}
                </Text>
                <Text className="line-through text-red-900 text-md">
                  ${dish.price.toFixed(2)}
                </Text>
              </View>
              <Text className="text-secondary-300 text-xs">
                {t('dish.save_price')} {dish.discount}%
              </Text>
            </View>
          ) : (
            <Text className="font-extrabold text-lg text-white">
              ${dish.price.toFixed(2)}
            </Text>
          )}
        </View>
      </View>

      {/* Right Section */}
      <View className="flex flex-col justify-between w-auto">
        {/* Dish Name & Category */}
        <View className="flex flex-col justify-end items-end">
          <Text className="font-bold underline text-white text-xl align-baseline">
            {dish.name}
          </Text>
          {dish.created_at && (
            <Text className="text-primary-200 text-xs mt-1 align-baseline">
              {t('dish.added_on')} {formatDate(dish.created_at)}
            </Text>
          )}
          <Button className="w-auto h-6 mt-1">
            <ButtonText className="text-primary-200 text-xs align-baseline">
              {dish.category ?? t('dish.uncategorized')}
            </ButtonText>
          </Button>
          <br />
          {/* Dish Description */}
          <Text className="text-primary-100 text-sm pt-2">
            {dish.description}
          </Text>
        </View>

        {/* Add to Cart Button */}
        <View className="flex justify-end items-end mt-4">
          <Button
            className="pl-4 bg-secondary-500 rounded w-auto border-white border-solid border-2"
            variant="link"
            onPress={() => console.log("Add to Cart")}
          >
            <ButtonIcon as={ShoppingCartIcon} size="md" color='white' />
            <Text className="text-white font-bold text-center px-4">
              {t('cart.add')}
            </Text>
          </Button>
        </View>
      </View>
    </View >

  );
};
