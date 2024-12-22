import { OrderDetail } from "@/lib/orders";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import OrderStatus from "./OrderStatus";
import React, { ReactNode } from "react";
import { Package, Boxes } from "lucide-react-native";


interface OrderListProps {
    icon: ReactNode;
    title: string;
    empty: string;
    orders?: OrderDetail[];
    callback: (order: OrderDetail) => void;
}

interface OrderListItemProps {
    order: OrderDetail;
    callback: () => void;
}

export const OrderList = ({ icon, title, empty, orders, callback }: OrderListProps) => {
    return (
        <View className="flex flex-col w-[90%] mx-auto h-25 bg-white rounded-md shadow-md my-2 py-4">
            <View className="flex-row gap-x-4 mx-4 pb-2 items-center text-center align-middle">
                {icon}
                <Text className="text-xl font-bold color-grey-700 opacity-80">{title}</Text>
            </View>
            {orders && orders.length > 0
                ? (orders.map((order, index) =>
                (
                    <View key={index} className="w-full">
                        <Pressable key={"press-" + index}>
                            <OrderListItem key={"order-" + index} order={order} callback={() => callback(order)}></OrderListItem>
                        </Pressable>
                    </View>
                ))) :
                (
                    <View className="w-75 h-25 items-center">
                        <Text className="text-md italic">{empty}</Text>
                    </View>
                )}
        </View>
    );
}

export const OrderListItem = ({ order, callback }: OrderListItemProps) => {
    const { t } = useTranslation();

    const orderButton = (): React.JSX.Element => {
        const buttonActive = !order.deliverer_id || order.order_status == 'K' || order.order_status == 'D';
        const buttonColor = order.order_status == 'D' ? 'bg-green-500' : 'bg-secondary-500';

        if (!buttonActive) return (<></>);
        return (
            <Button className={`rounded-lg cursor-pointer ${buttonColor}`} onPress={callback}>
                {orderButtonContent()}
            </Button>
        )
    }

    const orderButtonContent = (): React.JSX.Element => {

        if (order.deliverer_id) {
            switch (order.order_status) {
                case 'K':
                    return (
                        <>
                            <ButtonIcon as={Boxes} className="mx-4 h-4 w-4" />
                            <ButtonText>{t('orders.waiting_deliverer')}</ButtonText>
                        </>
                    )
                case 'D':
                    return (
                        <>
                            <ButtonIcon as={Package} className="mx-4 h-4 w-4" />
                            <ButtonText>{t('orders.delivered')}</ButtonText>
                        </>
                    )
                default:
                    return (
                        <>
                            <ButtonIcon as={Package} className="mx-4 h-4 w-4" />
                            <ButtonText>{t('orders.waiting_cook')}</ButtonText>
                        </>
                    )
            }
        } else {
            if (order.order_status == 'P') {
                return (
                    <>
                        <ButtonIcon as={Package} className="mx-4 h-4 w-4" />
                        <ButtonText>{t('orders.assign_deliverer')}</ButtonText>
                    </>
                )
            }
        }

        return <></>
    }

    return (
        <View className="border-y-2 border-gray-200 w-full h-full">
            <View className="flex-1 flex-col gap-y-2 p-2">
                <View className="flex flex-row justify-between gap-y-2">
                    <View className="flex flex-col text-wrap gap-y-2">
                        {order && order.user && <Text className="font-bold text-lg">{`${order.user.first_name} ${order.user.last_name}`}</Text>}
                        <Text className="opacity-80">{order.address}</Text>
                    </View>
                    <View className="flex flex-col items-end w-auto gap-y-2">
                        <OrderStatus order={order} />
                        {order.dishes && <Text>{order.dish_count} {t('orders.items')}</Text>}
                    </View>
                </View>
                <View className="flex-2">
                    {orderButton()}
                </View>
            </View>
        </View>
    );
};
