import { me, Me, register } from "@/lib/auth";
import { acceptOrder, getOrdersDetailed, OrderDetail, updateStatus } from "@/lib/orders";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { OrderExpandableList, OrderList } from "@/components/OrderListItem";
import { Stack, useRouter } from "expo-router";
import { ButtonIcon, Button as GoodButton } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/components/ui/icon";
import React from "react";
import { ArrowDownUp, ChevronUpIcon, CircleCheck, CircleCheckBig, Package, Truck } from "lucide-react-native";
import { TouchableOpacity, Text, View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

const DelivererOrders = () => {

    const router = useRouter();
    const { t } = useTranslation();

    const [selfUser, setSelfUser] = useState<Me>();
    const [orders, setOrders] = useState<OrderDetail[]>();
    const [pickedUpOrders, setPickedUpOrders] = useState<OrderDetail[]>();
    const [assignedOrders, setAssignedOrders] = useState<OrderDetail[]>();
    const [freeOrders, setFreeOrders] = useState<OrderDetail[]>();
    const [finishedOrders, setFinishedOrders] = useState<OrderDetail[]>();

    const [isEnabledScrollToTop, setIsEnabledScrollToTop] = useState(false);
    const [isAllExpanded, setIsAllExpanded] = useState(false);

    const scrollRef = useRef<ScrollView>(null);

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }

    useEffect(() => {
        const fetchSelfUser = async () => {
            const user = await me();
            setSelfUser(user);
        };

        fetchSelfUser();
    }, []);

    useEffect(() => {
        const assignedOrders = orders?.filter((order) => order.deliverer_id === selfUser?.id && order.order_status !== 'D' && order.order_status !== 'F');
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
    }, [orders]);

    useEffect(() => {
        setPickedUpOrders(orders?.filter((order) => order.deliverer_id === selfUser?.id && order.order_status === 'D'));
        setFinishedOrders(orders?.filter((order) => order.deliverer_id === selfUser?.id && order.order_status === 'F'));
        setFreeOrders(orders?.filter((order) => !order.deliverer && order.order_status !== 'F'));
    }, [orders]);

    useEffect(() => {
        const fetchOrders = async () => {
            setOrders(await getOrdersDetailed());
        }
        fetchOrders();
    }, [selfUser]);

    // Could be abstracted
    const assignOrder = async (o: OrderDetail) => {
        freeOrders?.filter((order) => order.id === o.id).map(async (order) => {
            acceptOrder(order.id).then(res => {
                if (!res) return;
                order.deliverer_id = selfUser!.id;
                const newAssigned = assignedOrders ? [...assignedOrders, order] : [order];
                const newFree = freeOrders?.filter((order) => order.id !== o.id);
                setAssignedOrders(newAssigned);
                setFreeOrders(newFree);
            });
        });
    }

    const pickUpOrder = async (order: OrderDetail) => {
        const state = newState(order.order_status);
        updateStatus(order, state).then((new_status) => {
            order.order_status = new_status.order_status;
            const newPickedUp = pickedUpOrders ? [...pickedUpOrders, order] : [order];
            setPickedUpOrders(newPickedUp);
            setAssignedOrders(assignedOrders?.filter((o) => o.id !== order.id));
        });
    }

    const finishOrder = async (order: OrderDetail) => {
        const state = newState(order.order_status);
        updateStatus(order, state).then((new_status) => {
            order.order_status = new_status.order_status;
            setPickedUpOrders(pickedUpOrders?.filter((o) => o.id !== order.id));
            setFinishedOrders(finishedOrders ? [...finishedOrders, order] : [order]);
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
                            className="px-4"
                            variant="link"
                            onPress={() => router.back()}
                        >
                            <ButtonIcon as={ChevronLeftIcon} size="md" />
                        </GoodButton>
                    ),
                }}
            />

            <ScrollView ref={scrollRef} className="flex flex-col w-full pb-40">
                <OrderList icon={<Truck color="green" />} title={t("orders.picked_up_title")} empty={t("orders.no_picked_up_orders")} orders={pickedUpOrders} callback={finishOrder} />
                <OrderList icon={<Package color="blue" />} title={t("orders.assigned")} empty={t("orders.no_assigned_orders")} orders={assignedOrders} callback={pickUpOrder} />
                <OrderExpandableList icon={<CircleCheckBig color="orange" />} title={t("orders.unassigned")} empty={t("orders.no_unassigned_orders")} orders={freeOrders} callback={assignOrder} isAllExpanded={isAllExpanded} />
                <OrderExpandableList icon={<CircleCheck color="gray" />} title={t("orders.finished")} empty={t("orders.no_finished_orders")} orders={finishedOrders} isAllExpanded={isAllExpanded} />
            </ScrollView>
            <View className="absolute w-full items-center flex flex-row justify-center bottom-0 mb-10 gap-x-2">
                <TouchableOpacity onPress={() => setIsAllExpanded(!isAllExpanded)} className="p-2 shadow-md flex flex-row items-center gap-x-2 bg-primary-300 rounded-lg">
                    <ArrowDownUp color="white" width={24} height={24} className="drop-shadow-lg" />
                </TouchableOpacity>
                <View className={`transition-opacity duration-300 opacity-${isEnabledScrollToTop ? 100 : 0}`}>
                    <TouchableOpacity onPress={scrollToTop} className="p-2 shadow-md flex flex-row items-center gap-x-2 bg-primary-300 rounded-lg">
                        <ChevronUpIcon color="white" width={24} height={24} className="drop-shadow-lg" />
                        <Text className="font-semibold text-white" style={styles.shadowedText}>{t('scroll.to_top')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    shadowedText: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
    },
})

export default DelivererOrders;