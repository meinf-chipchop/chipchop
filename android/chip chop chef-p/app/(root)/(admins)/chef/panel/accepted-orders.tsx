import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { allOrders } from "@/constants";
import { OrderStatus } from "@/lib/utils";
import OrderCard from "@/components/OrderCard";

const ChefPanel = () => {
  const [orders] = useState(
    // eslint-disable-next-line prettier/prettier
    allOrders.filter((order) => order.status !== OrderStatus.PENDING)
  );
  const [loading] = useState(false);

  //   const handleAcceptOrder = () => {};

  //   const handleDeclineOrder = () => {};
  return (
    <SafeAreaView className="flex gap-4 px-2  flex-col h-full bg-gray-100">
      {/* Title Section */}
      <View className="mt-1 bg-general-100 rounded-sm p-2">
        <Text className="text-2xl  py-1  font-bold text-center text-white">
          Accepted Orders
        </Text>
      </View>
      {/* Dish List Section */}
      <FlatList
        data={orders?.slice(0, 5)}
        // renderItem={({ item }) => <DishCard dish={item} />}
        renderItem={({ item }) => (
          <View className="px-4 py-3 mb-2">
            <OrderCard order={item} />
            {/* <View className="flex flex-row justify-end space-x-2 mt-2">
                <CustomButton
                  title="Accept"
                  onPress={() => handleAcceptOrder()}
                  className="w-[45%]"
                />
                <CustomButton
                  title="Decline"
                  onPress={() => handleDeclineOrder()}
                  className="w-[45%]"
                />
              </View> */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        className="px-2"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Text className="text-sm">No orders found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ChefPanel;
