import { Button, ButtonIcon } from "@/components/ui/button";

import { router, Stack, useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import { ChevronLeftIcon } from "lucide-react-native";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { useEffect, useState } from "react";

import { getOrderHistory, Order } from "@/lib/orders";

export default function DetailsScreen() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrderHistory().then((orders) => setOrders(orders));
  }, []);

  console.log(orders);

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
            <OrderComponent order={order} key={"order" + i} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function OrderComponent({ order }: { order: Order }) {
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
    <View className="flex-col gap-2  rounded p-2 shadow border-[1.5px] border-gray-500">
      <View className="flex-row gap-2 ">
        <Text className="text-[14pt]">
          {new Date(order.created_at).toLocaleDateString()}
        </Text>
        <Text className="text-[14pt] h-full w-full text-end font-bold">
          {order.total_price} €
        </Text>
      </View>
      <View className="flex-row gap-2 w-full justify-between">
        <Text className="bg-white  p-2 rounded  font-bold">
          {orderTypeDict[order.order_type as keyof typeof orderTypeDict]}
        </Text>
        <Text className={`${orderStatusColor}  p-2 rounded  font-bold`}>
          {
            orderStatusDict[order.order_status as keyof typeof orderStatusDict]
              .text
          }
        </Text>
      </View>
    </View>
  );
}
