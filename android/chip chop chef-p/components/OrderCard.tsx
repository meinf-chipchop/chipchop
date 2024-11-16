import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { formatDate, OrderStatus, OrderType } from "@/lib/utils";
import { allDishes, customers } from "@/constants";

const OrderCard = ({ order }: { order: Order }) => {
  const { user_uuid, recipe_id } = order;
  const customer = customers.find((c) => c.uuid === user_uuid);
  const recipe = allDishes.find((dish) => dish.id === recipe_id);
  if (recipe == null || customer == null) return null;
  return (
    // <View className="mb-2 mt-10 relative">
    //   {/* Large circular icon (placeholder for order type) */}
    //   <View className="absolute -top-10 translate-x-1 right-0 z-10">
    //     <View className="w-32 h-32 rounded-full border-4 border-white bg-primary-600 flex items-center justify-center">
    //       <Text className="text-white font-bold text-lg">
    //         {order.type === OrderType.DELIVERY ? "🚚" : "📦"}
    //       </Text>
    //     </View>
    //   </View>

    //   {/* Card content */}
    //   <View className="bg-primary-500 rounded-3xl shadow-sm shadow-neutral-300 pt-2 pb-4 px-2">
    //     <View className="w-[70%]">
    //       <Text className="font-bold text-white text-xl mb-2 bg-primary-700 p-2 w-fit rounded-full">
    //         Order #{order.id}
    //       </Text>
    //       <Text className="mb-4 font-semibold text-primary-900">
    //         {order.type === OrderType.DELIVERY ? "Delivery" : "Pickup"}
    //       </Text>
    //     </View>

    //     <View className="flex flex-row items-center justify-between mb-4">
    //       {customer && (
    //         <View className="flex flex-row items-center bg-primary-700 px-3 py-2 rounded-full">
    //           <Image
    //             source={{ uri: customer.image_url }}
    //             className="w-10 h-10 rounded-full mr-2"
    //           />
    //           <View>
    //             <Text className="font-bold text-white ">{`${customer.name} ${customer.last_name}`}</Text>
    //             <Text className="text-primary-500 font-bold">Customer</Text>
    //           </View>
    //         </View>
    //       )}
    //       <View className="bg-white px-4 py-2 rounded-full">
    //         <Text
    //           className={`font-extrabold text-lg ${getStatusColor(order.status)}`}
    //         >
    //           {order.status.toUpperCase()}
    //         </Text>
    //       </View>
    //     </View>

    //     <Text className="text-primary-900 text-right">
    //       {formatDate(order.created_at)}
    //     </Text>
    //   </View>
    // </View>
    <View className="mb-2 mt-10 relative">
      {/* Large circular dish image */}
      <View className="absolute -top-10 translate-x-1 right-0 z-10">
        <Image
          source={recipe.image_url as ImageSourcePropType}
          className="w-32 h-32 rounded-full border-4 border-white"
        />
      </View>

      {/* Card content */}
      <View className="bg-primary-500 rounded-3xl shadow-sm shadow-neutral-300 pt-2 pb-4 px-2">
        <View className="w-[70%]">
          <Text className="font-bold text-white text-xl mb-2 bg-primary-700 p-2 w-fit rounded-full">
            {recipe.name}
          </Text>
          <Text className="mb-4 font-semibold text-primary-900">
            {recipe.description}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between mb-4">
          {customer && (
            <View className="flex flex-row items-center bg-primary-700 px-3 py-2 rounded-full">
              <Image
                source={{ uri: customer.image_url }}
                className="w-10 h-10 rounded-full mr-2"
              />
              <View>
                <Text className="font-bold text-white ">{`${customer.name}`}</Text>
                <Text className="text-primary-500 font-bold">Customer</Text>
                {/* <View className="flex flex-row items-center">
                <Image
                  source={icons.star}
                  className="w-4 h-4 mr-1"
                  tintColor="#E7D4B5"
                />
                <Text className="text-primary-900 font-bold">
                  {recipe.chef.rating}
                </Text>
              </View> */}
              </View>
            </View>
          )}
          <View className="bg-white px-4 py-2 rounded-full">
            <Text className="font-extrabold text-lg text-primary-900">
              ${recipe.price.toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-between mb-4">
          <View className="bg-white px-4 py-2 rounded-full">
            <Text
              className={`font-extrabold text-lg ${getStatusColor(order.status)}`}
            >
              {order.status.toUpperCase()}
            </Text>
          </View>
          <Text className=" text-lg font-semibold px-2 text-primary-900">
            {order.type === OrderType.DELIVERY ? "Delivery" : "Pickup"}
          </Text>
        </View>
        <Text className="text-primary-900 text-right">
          {formatDate(recipe.created_at)}
        </Text>
        <Text className="font-bold text-white text-xl bg-primary-700 absolute bottom-0 rounded-full rounded-br-none p-2 w-fit">
          Order #{order.id}
        </Text>
      </View>
    </View>
  );
};

// Helper function to get the status color
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.APPROVED:
      return "text-green-600";
    case OrderStatus.REJECTED:
      return "text-red-600";
    default:
      return "text-yellow-600";
  }
};

export default OrderCard;
