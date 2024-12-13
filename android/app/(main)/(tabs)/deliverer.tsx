import { me, Me } from "@/lib/auth";
import { acceptOrder, getFullOrders, getOrderDishesByUrl, getOrders, Order } from "@/lib/orders";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { OrderListItem } from "@/components/OrderListItem";
import { HR } from "@expo/html-elements";

const DelivererOrders = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value of 0

    const { t } = useTranslation();

    const [selfUser, setSelfUser] = useState<Me>();
    const [orders, setOrders] = useState<Order[]>();
    const [assignedOrders, setAssignedOrders] = useState<Order[]>();
    const [freeOrders, setFreeOrders] = useState<Order[]>();

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1, // Animate to opacity value of 1
            duration: 1000, // Duration of the animation
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        const fetchSelfUser = async () => {
            const user = await me();
            setSelfUser(user);
        };

        fetchSelfUser();
    }, []);

    useEffect(() => {
        setAssignedOrders(orders?.filter((order) => order.deliverer_id === selfUser?.id ));
    }, [orders, selfUser]);
    
    useEffect(() => {
        setFreeOrders(orders?.filter((order) => !order.deliverer));
    }, [orders]);

    useEffect(() => {
        const fetchOrders = async () => {
            setOrders(await getFullOrders());
        }
        fetchOrders();
    }, []);

    const assignOrder = async (orderId: number) => {
        freeOrders?.filter((order) => order.id === orderId).map(async (order) => {
            const res = await acceptOrder(order.id, selfUser!);
            if (res) {
                const newAssigned = [order];
                if (assignedOrders) {
                    newAssigned.push(...assignedOrders);
                }
                const newFree = freeOrders?.filter((order) => order.id !== orderId);
                setAssignedOrders(newAssigned);
                setFreeOrders(newFree);
            }
        });
    }

    return (
        <ScrollView className="bg-general-500 flex-1">
            <View className="my-8 items-center">
                <Text className="text-3xl font-bold">{t("orders.title")}</Text>
            </View>
            <View className="my-4 items-center flex flex-col gap-y-2">
                <Text className="text-3xl my-4">{t("orders.assigned")}</Text>
                {assignedOrders && assignedOrders.length > 0
                    ? (assignedOrders.map((order, index) => (
                        <>
                            <HR />
                            <Pressable key={"press-" + index} className="w-full">
                                <OrderListItem key={"order-" + index} order={order} callback={() => console.log()}></OrderListItem>
                            </Pressable>
                        </>)
                    )) : ( 
                        <View className="w-75 h-25 items-center">
                            <Text className="text-md italic">{t('orders.no_assigned_orders')}</Text>
                        </View>
                    )}
            </View>
            <View className="px-4 items-center">
                <Text className="text-3xl my-4">{t("orders.unassigned")}</Text>
                {freeOrders && freeOrders.length > 0 
                    ? (freeOrders.map((order, index) => (
                        <>
                            <HR />
                            <Pressable key={"press-" + index} className="w-full">
                                <OrderListItem key={"order-" + index} order={order} callback={() => assignOrder(order.id)}></OrderListItem>
                            </Pressable>
                        </>)
                    )) : (
                        <View className="w-75 h-25 items-center">
                            <Text className="text-md italic">{t('orders.no_unassigned_orders')}</Text>
                        </View>
                    )}
            </View>
        </ScrollView>
    );
}

export default DelivererOrders;