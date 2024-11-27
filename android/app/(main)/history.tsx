import NotFoundScreen from "@/app/+not-found";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Dish, getDish, updateDish } from "@/lib/dishes";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import {
  AlertCircleIcon,
  ChevronLeftIcon,
  PencilIcon,
  SaveIcon,
} from "lucide-react-native";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

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
    P: t("order_status.P"),
    A: t("order_status.A"),
    R: t("order_status.R"),
    C: t("order_status.C"),
    B: t("order_status.B"),
    K: t("order_status.K"),
    D: t("order_status.D"),
    T: t("order_status.T"),
    S: t("order_status.S"),
    F: t("order_status.F"),
  };

  const orderTypeDict = {
    D: t("order_type.D"),
    P: t("order_type.P"),
  };

  return (
    <View className="flex-col gap-2 bg-yellow-600  rounded p-2">
      <Text className="text-[14pt]">
        {new Date(order.created_at).toLocaleDateString()}
      </Text>
      <View className="flex-row gap-2 ">
        <Text className="bg-white px-2 py-2 rounded  font-bold">
          {orderTypeDict[order.order_type as keyof typeof orderTypeDict]}
        </Text>
        <Text className="bg-white px-2 py-2 rounded  font-bold">
          {orderStatusDict[order.order_status as keyof typeof orderStatusDict]}
        </Text>
      </View>
    </View>
  );
}
