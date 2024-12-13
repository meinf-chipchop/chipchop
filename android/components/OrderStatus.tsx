import { Order } from '@/lib/orders';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

interface OrderStatusProps {
    order: Order;
}

const OrderStatus = ({ order }: OrderStatusProps) => {
    const { t } = useTranslation();

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

    const orderStatusColor = orderStatusDict[order.order_status as keyof typeof orderStatusDict].color;

    return (
        <View className={`${orderStatusColor}  p-2 rounded-lg  font-bold`} >
            <Text>{orderStatusDict[order.order_status as keyof typeof orderStatusDict].text}</Text>
        </View >
    );
};

export default OrderStatus;