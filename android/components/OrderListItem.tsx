import { Order } from "@/lib/orders";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import OrderStatus from "./OrderStatus";
import React from "react";
import { Package, Boxes } from "lucide-react-native";

interface OrderListItemProps {
    order: Order;
    callback: () => void;
}

export const OrderListItem = ({ order, callback }: OrderListItemProps) => {
    const { t } = useTranslation();

    const orderButton = (): React.JSX.Element => {

        if (order.deliverer_id) {
            if (order.order_status != 'C') {
                return (
                    <>
                        <ButtonIcon as={Package} className="mx-4 h-4 w-4" />
                        <ButtonText>{t('orders.waiting_cook')}</ButtonText>
                    </>
                )
            } else {
                return (
                    <>
                        <ButtonIcon as={Boxes} className="mx-4 h-4 w-4" />
                        <ButtonText>{t('orders.waiting_deliverer')}</ButtonText>
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
        <View className="rounded-md shadow-md border-2 border-gray-200 w-full h-full gap-y-2">
            <View className="flex-1 flex-col gap-y-2 p-4">
                <View className="flex flex-row justify-between gap-y-2">
                    <View className="flex flex-col text-wrap">
                        <Text className="font-bold text-lg">{order.user}</Text>
                        <Text className="opacity-80">{order.address}</Text>
                    </View>
                    <View className="flex flex-col items-end w-auto">
                        <OrderStatus order={order} />
                        {order.dish_list && <Text>{order.dish_list.length} {t('orders.items')}</Text>}
                    </View>
                </View>
                <View className="flex-2">
                    <Button className="rounded-lg bg-secondary-500 cursor-pointer" onPress={callback}>
                        {orderButton()}
                    </Button>
                </View>
            </View>
        </View>
    );
};
