import { OrderDetail } from "@/lib/orders";
import { useTranslation } from "react-i18next";
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Touchable, Modal } from "react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import OrderStatus from "./OrderStatus";
import React, { ReactNode, useEffect, useState } from "react";
import { Package, Boxes, ArrowUp, ArrowDown, Map } from "lucide-react-native";
import { HR } from "@expo/html-elements";
import { MapPopup } from "./MapPopup";

interface OrderListProps {
    icon: ReactNode;
    title: string;
    empty: string;
    orders?: OrderDetail[];
    callback: (order: OrderDetail) => void;
}

interface OrderExpandableListProps {
    icon: ReactNode;
    title: string;
    empty: string;
    orders?: OrderDetail[];
    callback?: (order: OrderDetail) => void;
    isAllExpanded: boolean;
}

interface OrderListItemProps {
    order: OrderDetail;
    callback: () => void;
}

interface ListContainerProps {
    icon: ReactNode;
    title: string;
    amount?: number;
    children: ReactNode;
}

const ListContainer = ({ icon, title, amount, children }: ListContainerProps) => {
    const bgColor = amount === 0 ? 'bg-red-400' : 'bg-secondary-400';

    return (
        <View className="flex flex-col w-[90%] mx-auto h-25 bg-white rounded-md shadow-md my-2 py-4 z-1">
            <View className="flex-row gap-x-4 mx-4 pb-2 items-center text-center align-middle">
                {icon}
                <Text className="text-xl font-bold color-grey-700 opacity-80">{title}</Text>
                <View className="flex-1 flex items-end">
                    <View className={`rounded-full px-3 ${bgColor}`} >
                        <Text className="text-sm font-semibold text-white" style={styles.shadowedText}>{amount}</Text>
                    </View>
                </View>
            </View>
            <HR className="w-[90%] h-2 mx-auto mb-2" />
            {children}
        </View>
    );
}

export const OrderList = ({ icon, title, empty, orders, callback }: OrderListProps) => {
    return (
        <ListContainer icon={icon} title={title}>
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
        </ListContainer >
    );
}

export const OrderExpandableList = ({ icon, title, empty, orders, callback, isAllExpanded }: OrderExpandableListProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        setIsExpanded(isAllExpanded);
    }, [isAllExpanded]);

    return (
        <ListContainer icon={icon} title={title} amount={orders?.length ?? 0}>
            <View className="w-75 h-25 items-center">
                {orders && orders.length > 0 ? (
                    <View className="w-full m-auto align-center">
                        {isExpanded && orders.map((order, index) => (
                            <Pressable key={"press-" + index}>
                                <OrderListItem key={"order-" + index} order={order} callback={() => callback && callback(order)}></OrderListItem>
                            </Pressable>
                        ))}
                        <Button
                            className="w-auto"
                            variant="link"
                            onPress={toggleExpand}
                        >
                            <ButtonIcon as={isExpanded ? ArrowUp : ArrowDown} />
                        </Button>
                    </View>
                ) : (
                    <Text className="text-md italic">{empty}</Text>
                )
                }
            </View>
        </ListContainer >
    );
}

export const OrderListItem = ({ order, callback }: OrderListItemProps) => {
    const { t } = useTranslation();

    const [isMapShown, setIsMapShown] = useState(false);

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
        <View className="w-[90%] h-full mx-auto relative">
            <View className="flex flex-col gap-y-2 p-2">
                <View className="flex flex-row justify-between gap-y-2">
                    <View className="flex flex-col text-wrap gap-y-2">
                        {order && order.user && (
                            <Text className="font-bold text-lg">{`${order.user.first_name} ${order.user.last_name}`}</Text>
                        )}
                        <TouchableOpacity
                            className="flex flex-row items-center gap-x-2"
                            onPress={() => setIsMapShown(true)}
                        >
                            <Map className="size-4" />
                            <Text className="opacity-80 text-pretty underline underline-offset-2">
                                {order.address}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-col items-end w-auto gap-y-2">
                        <OrderStatus order={order} />
                        {order.dishes && <Text>{order.dish_count} items</Text>}
                    </View>
                </View>
                <View className="flex-2">{orderButton()}</View>
            </View>
            <HR className="w-[90%] h-2 mx-auto" />

            <Modal
                visible={isMapShown}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsMapShown(false)}
            >
                <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
                    <View className="w-full h-full bg-white relative">
                        <Text style={{ fontSize: 18 }}>✕</Text>
                        <MapPopup address={order.address} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    shadowedText: {
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
    }
})