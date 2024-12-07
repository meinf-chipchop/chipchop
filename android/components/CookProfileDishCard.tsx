import React from 'react';
import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { formatDate } from '@/lib/utils';
import { Dish } from '@/lib/dishes';
import RatingCard from './RatingCard';
import { Button, ButtonText } from './ui/button';
import { useTranslation } from 'react-i18next';


export const CookProfileSimpleDishCard = ({ dish }: { dish: Dish }) => {
  const discountedPrice = dish.discount
    ? dish.price * (1 - dish.discount)
    : dish.price;

  return (
    <View className="flex flex-row items-center bg-white p-3 mb-2 shadow-sm rounded-md">
      {/* Dish Image */}
      <View className="w-16 h-16 mr-4">
        <Image
          source={dish.image_url as ImageSourcePropType}
          className="w-full h-full object-cover rounded-md"
        />
      </View>

      {/* Dish Details */}
      <View className="flex-1">
        <Text className="font-bold text-md text-gray-800">{dish.name}</Text>
        <Text className="text-primary-500 font-semibold">
          ${dish.discount ? discountedPrice.toFixed(2) : dish.price.toFixed(2)}
        </Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        onPress={() => console.log('Add to cart:', dish.name)}
        className="p-2 bg-secondary-500 rounded-full">
        <Text className="text-white font-bold text-lg">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CookProfileDishCard = ({ dish }: { dish: Dish }) => {
  const discountedPrice = dish.discount ? dish.price * (1 - dish.discount) : dish.price;
  const { t } = useTranslation(); 

  return (
    <View className="bg-gradient-to-br from-primary-500 to-primary-700 p-4 shadow-xl flex flex-row w-full rounded-md">
  {/* Left Section */}
  <View className="flex flex-col gap-3 w-auto">
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
          {t('dish.estimated_time')}: {dish.estimated_time}
        </Text>
      )}
      {dish.discount && dish.discount > 0 ? (
        <>
          <Text className="line-through text-amber-900 text-md">
            ${dish.price.toFixed(2)}
          </Text>
          <Text className="font-extrabold text-lg text-white">
            ${discountedPrice.toFixed(2)}
          </Text>
          <Text className="text-secondary-300 text-xs">
            {t('dish.save_price')} {(dish.discount * 100).toFixed(0)}%
          </Text>
        </>
      ) : (
        <Text className="font-extrabold text-lg text-white">
          ${dish.price.toFixed(2)}
        </Text>
      )}
    </View>
  </View>

  {/* Right Section */}
  <View className="flex flex-col gap-3 w-auto pl-4">
    {/* Dish Name & Category */}
    <View className="flex flex-col justify-end items-end">
      <Text className="font-bold underline text-white text-xl">
        {dish.name}
      </Text>
      {dish.created_at && (
        <Text className="text-primary-200 text-xs mt-1">
          {t('dish.added_on')} {formatDate(dish.created_at)}
        </Text>
      )}
      <Button className="w-auto h-6 mt-1">
        <ButtonText className="text-primary-200 text-xs">
          {dish.category ?? 'Uncategorized'}
        </ButtonText>
      </Button>
    </View>

    {/* Dish Description */}
    <Text className="text-primary-100 text-sm pt-2">
      {dish.description}
    </Text>

    {/* Add to Cart Button */}
    <View className="flex justify-end items-end mt-4">
      <Button
        className="bg-secondary-500 py-2 px-4 rounded-md"
        onPress={() => console.log('Add to cart:', dish.name)}
      >
        <ButtonText className="text-white font-bold text-center">
          {t('cart.add')}
        </ButtonText>
      </Button>
    </View>
  </View>
</View>

  );
};
