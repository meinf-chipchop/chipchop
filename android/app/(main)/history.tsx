import React, { useState } from 'react';
import { Button, ButtonIcon } from "@/components/ui/button";
import { router, Stack } from "expo-router";
import { t } from "i18next";
import { ChevronLeftIcon, Star } from "lucide-react-native";
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { RatingModal } from '../(main)/(tabs)/rating';
import { OrderDetail } from '@/lib/orders';

const mockOrders = [
  {
    id: 1,
    created_at: "2025-01-01T12:00:00Z",
    total_price: 120.5,
    order_type: "D", // Delivery
    order_status: "P", // Pending
  },
  {
    id: 2,
    created_at: "2025-01-02T15:30:00Z",
    total_price: 45.99,
    order_type: "P", // Pickup
    order_status: "A", // Approved
  },
  {
    id: 3,
    created_at: "2025-01-03T18:45:00Z",
    total_price: 89.0,
    order_type: "D", // Delivery
    order_status: "R", // Rejected
  },
];


export default function DetailsScreen() {
  const [orders, setOrders] = useState<OrderDetail[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);

  // useEffect(() => {
  //   getOrderHistory().then((orders) => setOrders(orders));
  // }, []);

  // console.log(orders);

  const openRatingModal = (order: OrderDetail) => {
    setSelectedOrder(order);
    setIsRatingModalVisible(true);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: t("user.history"),
          headerLeft: () => (
            <Button
              className="pl-4"
              variant="link"
              onPress={() => router.back()}
            >
              <ButtonIcon as={ChevronLeftIcon} size="md" />
            </Button>
          ),
        }}
      />
      <SafeAreaView className="flex-1">
        <ScrollView
          className="mx-4 mt-2"
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          {orders?.map((order, i) => (
            <OrderComponent
              order={order}
              key={"order" + i}
              onRatePress={() => openRatingModal(order)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <RatingModal
        isVisible={isRatingModalVisible}
        onClose={() => setIsRatingModalVisible(false)}
        order={selectedOrder}
      />
    </>
  );
}

function OrderComponent({ order, onRatePress }: { order: OrderDetail; onRatePress: () => void }) {
  const orderStatusDict = {
    P: { text: t("order_status.P"), color: "bg-yellow-500" },
    A: { text: t("order_status.A"), color: "bg-green-500" },
    R: { text: t("order_status.R"), color: "bg-red-500" },
    C: { text: t("order_status.C"), color: "bg-yellow-500" },
    B: { text: t("order_status.B"), color: "bg-red-500" },
    K: { text: t("order_status.K"), color: "bg-green-500" },
    D: { text: t("order_status.D"), color: "bg-yellow-500" },
    T: { text: t("order_status.T"), color: "bg-red-500" },
    S: { text: t("order_status.S"), color: "bg-red-500" },
    F: { text: t("order_status.F"), color: "bg-green-500" },
  };
  const orderTypeDict = {
    D: t("order_type.D"),
    P: t("order_type.P"),
  };

  const orderStatusColor =
    orderStatusDict[order.order_status as keyof typeof orderStatusDict].color;

  return (
    <View className="flex-col gap-2 rounded p-2 shadow border-[1.5px] border-gray-500 mb-4">

      <View className="flex-row gap-2 ">

        <Text className="text-[14pt]">
          {new Date(order.created_at).toLocaleDateString()}
        </Text>
        <Text className="text-[14pt] h-full w-full text-end font-bold">
          {order.total_price} €
        </Text>

      </View>

      <View className="flex-row gap-2 w-full justify-between">

        <Text className="bg-white p-2 rounded font-bold">
          {orderTypeDict[order.order_type as keyof typeof orderTypeDict]}
        </Text>

        <Text className={`${orderStatusColor} p-2 rounded font-bold`}>
          {orderStatusDict[order.order_status as keyof typeof orderStatusDict].text}
        </Text>
        
      </View>

      <Button
        style={{ backgroundColor: "#9f693b" }}
        className="rounded w-auto"
        variant="link"
        onPress={onRatePress}
      >
        <ButtonIcon as={Star} size="md" color="black" className="w-auto pr-4" />
        <Text className="text-black font-bold text-center">{t("rating_system.title")}</Text>
      </Button>


    </View>
  );
}

