import { me, Me } from "@/lib/auth";
import { acceptOrder, getOrdersDetailed, OrderDetail, updateStatus, OrderStatus } from "@/lib/orders";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { OrderList } from "@/components/OrderListItem";
import { Stack, useRouter } from "expo-router";
import { ButtonIcon, Button as GoodButton } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/components/ui/icon";
import React from "react";
import { CircleCheckBig, Package, Truck } from "lucide-react-native";

const DelivererOrders = () => {

    const router = useRouter();
    const { t } = useTranslation();

    const [selfUser, setSelfUser] = useState<Me>();
    const [orders, setOrders] = useState<OrderDetail[]>();
    const [pickedUpOrders, setPickedUpOrders] = useState<OrderDetail[]>();
    const [assignedOrders, setAssignedOrders] = useState<OrderDetail[]>();
    const [freeOrders, setFreeOrders] = useState<OrderDetail[]>();

    const notFinished = (order: OrderDetail) => { return order.order_status !== 'F' };

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
        const assignedOrders = orders?.filter((order) => order.deliverer_id === selfUser?.id && order.order_status !== 'D');
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
        setFreeOrders(orders?.filter((order) => !order.deliverer));
    }, [orders]);

    useEffect(() => {
        const fetchOrders = async () => {
            setOrders((await getOrdersDetailed()).filter(notFinished));
        }
        fetchOrders();
    }, []);

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

            <ScrollView className="flex flex-col w-full pb-40">
                <OrderList icon={<Truck color="green" />} title={t("orders.picked_up_title")} empty={t("orders.no_picked_up_orders")} orders={pickedUpOrders} callback={finishOrder} />
                <OrderList icon={<Package color="blue" />} title={t("orders.assigned")} empty={t("orders.no_assigned_orders")} orders={assignedOrders} callback={pickUpOrder} />
                <OrderList icon={<CircleCheckBig color="orange" />} title={t("orders.unassigned")} empty={t("orders.no_unassigned_orders")} orders={freeOrders} callback={assignOrder} />
            </ScrollView>
        </>
    );
}

export default DelivererOrders;