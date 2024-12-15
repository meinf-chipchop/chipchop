import { me, Me } from "@/lib/auth";
import { acceptOrder, getFullOrders, Order, updateStatus } from "@/lib/orders";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, View, Text, Pressable, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { OrderListItem } from "@/components/OrderListItem";
import { HR } from "@expo/html-elements";
import { Stack, useRouter } from "expo-router";
import { ButtonIcon, Button as GoodButton } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/components/ui/icon";
import React from "react";

const DelivererOrders = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value of 0

    const router = useRouter();
    const { t } = useTranslation();

    const [selfUser, setSelfUser] = useState<Me>();
    const [orders, setOrders] = useState<Order[]>();
    const [pickedUpOrders, setPickedUpOrders] = useState<Order[]>();
    const [assignedOrders, setAssignedOrders] = useState<Order[]>();
    const [freeOrders, setFreeOrders] = useState<Order[]>();

    const notFinished = (order: Order) => { return order.order_status !== 'F' };

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
        setPickedUpOrders(orders?.filter((order) => order.deliverer_id === selfUser?.id && order.order_status === 'D'));
    }, [orders, selfUser]);

    useEffect(() => {
        const assignedOrders = orders?.filter((order) => order.deliverer_id === selfUser?.id && notFinished(order));
        // Sort by cooked and then the rest
        assignedOrders?.sort((a, b) => {
            if (a.order_status === 'K' && b.order_status !== 'K') {
                return -1;
            } else if (a.order_status !== 'K' && b.order_status === 'K') {
                return 1;
            } else {
                return 0;
            }
        });
        setAssignedOrders(assignedOrders);
    }, [orders, selfUser]);

    useEffect(() => {
        setFreeOrders(orders?.filter((order) => !order.deliverer && notFinished(order)));
    }, [orders]);

    useEffect(() => {
        const fetchOrders = async () => {
            setOrders(await getFullOrders());
        }
        fetchOrders();
    }, []);

    // Could be abstracted, but won't :))
    const assignOrder = async (orderId: number) => {
        freeOrders?.filter((order) => order.id === orderId).map(async (order) => {
            acceptOrder(order.id, selfUser!).then(res => {
                if (!res) return;
                order.deliverer_id = selfUser!.id;
                const newAssigned = assignedOrders ? [...assignedOrders, order] : [order];
                const newFree = freeOrders?.filter((order) => order.id !== orderId);
                setAssignedOrders(newAssigned);
                setFreeOrders(newFree);
            });
        });
    }

    const pickUpOrder = async (order: Order) => {
        const state = newState(order.order_status);
        updateStatus(order, state).then((newOrder) => {
            const newPickedUp = pickedUpOrders ? [...pickedUpOrders, newOrder] : [newOrder];
            setPickedUpOrders(newPickedUp);
            setAssignedOrders(assignedOrders?.filter((o) => o.id !== newOrder.id));
        });
    }

    const finishOrder = async (order: Order) => {
        const state = newState(order.order_status);
        updateStatus(order, state).then((newOrder) => {
            setPickedUpOrders(pickedUpOrders?.filter((o) => o.id !== newOrder.id));
        });
    }

    const newState = (currentState: string): string => {
        switch (currentState) {
            case 'K':
                return 'D';
            case 'D':
                return 'F';
            case 'F':
                return 'F';
        }
        return 'P';
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: t("orders.title"),
                    headerLeft: () => (
                        <GoodButton
                            className="pl-4"
                            variant="link"
                            onPress={() => router.back()}
                        >
                            <ButtonIcon as={ChevronLeftIcon} size="md" />
                        </GoodButton>
                    ),
                }}
            />

            {/* This could be refactored into a more general component */}
            <ScrollView className="bg-general-500 flex-1 w-full pb-40">
                <View className="my-4 items-center flex flex-col gap-y-2 w-full">
                    <Text className="text-3xl my-4">{t('orders.picked_up_title')}</Text>
                    {pickedUpOrders && pickedUpOrders.length > 0
                        ? (pickedUpOrders.map((order, index) => (
                            <View key={"pickedup-" + index} className="w-full">
                                <HR className="pt-2" />
                                <Pressable key={"press-" + index}>
                                    <OrderListItem key={"order-" + index} order={order} callback={() => finishOrder(order)}></OrderListItem>
                                </Pressable>
                            </View>)
                        )) : (
                            <View className="w-75 h-25 items-center">
                                <Text className="text-md italic">{t('orders.no_picked_up_orders')}</Text>
                            </View>
                        )}
                </View>

                <View className="my-4 items-center flex flex-col gap-y-2 w-full">
                    <Text className="text-3xl my-4">{t("orders.assigned")}</Text>
                    {assignedOrders && assignedOrders.length > 0
                        ? (assignedOrders.map((order, index) => (
                            <View key={"assigned-" + index} className="w-full">
                                <HR className="pt-2" />
                                <Pressable key={"press-" + index}>
                                    <OrderListItem key={"order-" + index} order={order} callback={() => pickUpOrder(order)}></OrderListItem>
                                </Pressable>
                            </View>)
                        )) : (
                            <View className="w-75 h-25 items-center">
                                <Text className="text-md italic">{t('orders.no_assigned_orders')}</Text>
                            </View>
                        )}
                </View>
                <View className="px-4 items-center pb-50 w-full">
                    <Text className="text-3xl my-4">{t("orders.unassigned")}</Text>
                    {freeOrders && freeOrders.length > 0
                        ? (freeOrders.map((order, index) => (
                            <View key={"free-" + index} className="w-full">
                                <HR className="pt-2" />
                                <Pressable key={"press-" + index}>
                                    <OrderListItem key={"order-" + index} order={order} callback={() => assignOrder(order.id)}></OrderListItem>
                                </Pressable>
                            </View>)
                        )) : (
                            <View className="w-75 h-25 items-center">
                                <Text className="text-md italic">{t('orders.no_unassigned_orders')}</Text>
                            </View>
                        )}
                </View>
            </ScrollView>
        </>
    );
}

export default DelivererOrders;