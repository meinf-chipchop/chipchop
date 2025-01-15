import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
  UIManager,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  OrderDetailWithDishes,
  OrderDishesDetail,
  OrderDishesFullDetail,
  OrderStatus,
  getOrderHistory,
  updateOrderStatus,
} from "@/lib/orders";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OrdersCook = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [orders, setOrders] = useState<OrderDetailWithDishes[]>([]);
  const [selectedOrder, setSelectedOrder] =
    useState<OrderDetailWithDishes | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>();
  const [statusUpdateModal, setStatusUpdateModal] = useState({
    visible: false,
    success: false,
    message: "",
  });

  selectedOrder?.dishes;

  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await getOrderHistory();
        setOrders(ordersResponse);
        // console.log(ordersResponse)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const openOrderDetails = (order: OrderDetailWithDishes) => {
    setSelectedOrder(order);
    setSelectedStatus(order.order_status);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const showStatusUpdateModal = (success: boolean, message: string) => {
    setStatusUpdateModal({ visible: true, success, message });
    setTimeout(() => {
      setStatusUpdateModal({ visible: false, success: false, message: "" });
      setModalVisible(false);
    }, 1200);
  };

  const changeOrderStatus = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus.toUpperCase());
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, order_status: newStatus } : order
      );
      setOrders(updatedOrders);
      showStatusUpdateModal(true, t("order_text.order_positive_feedback"));
    } catch (error) {
      console.error("Error updating order status:", error);
      showStatusUpdateModal(false, t("order_text.order_negative_feedback"));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "a":
        return "#0F0";
      case "p":
        return "#FFC107";
      case "r":
        return "#FF5722";
      case "c":
        return "#F44336";
      case "b":
        return "#9C27B0";
      case "k":
        return "#2196F3";
      default:
        return "#9E9E9E";
    }
  };

  const getName = (status: string) => {
    switch (status.toLowerCase()) {
      case "a":
        return t("order_status.A");
      case "p":
        return t("order_status.P");
      case "r":
        return t("order_status.R");
      case "c":
        return t("order_status.C");
      case "b":
        return t("order_status.B");
      case "k":
        return t("order_status.K");
      default:
        return t("order_status.M");
    }
  };

  const renderOrderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {t("order_text.order_details")}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          {selectedOrder && (
            <>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>
                  {selectedOrder.user.first_name}
                </Text>
                <Text style={styles.orderDate}>
                  {t("order_text.order_date")}:{" "}
                  {new Date(selectedOrder.created_at).toLocaleDateString()}
                </Text>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {selectedOrder.dishesDetails.map(
                  (
                    dish: OrderDishesFullDetail,
                    index: React.Key | null | undefined
                  ) => (
                    <View key={index} style={styles.dishItem}>
                      <View style={styles.dishInfo}>
                        <Text style={styles.dishName}>
                          {dish.dishDetails.name}
                        </Text>
                        <Text style={styles.dishQuantity}> x{dish.amount}</Text>
                      </View>
                      <Text style={styles.dishPrice}>
                        ${(dish.price * Number(dish.amount)).toFixed(2)}
                      </Text>
                    </View>
                  )
                )}
              </ScrollView>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalAmount}>
                  $
                  {selectedOrder.dishesDetails
                    .reduce(
                      (sum: number, dish: { price: number; amount: number }) =>
                        sum + dish.price * dish.amount,
                      0
                    )
                    .toFixed(2)}
                </Text>
              </View>
              <View style={styles.statusSituation}>
                <Text style={styles.statusLabel}>
                  {t("order_text.order_status")}:
                </Text>
                <Picker
                  selectedValue={selectedStatus}
                  style={styles.statusPicker}
                  onValueChange={(itemValue) => {
                    setSelectedStatus(itemValue);
                    changeOrderStatus(selectedOrder.id, itemValue);
                  }}
                >
                  <Picker.Item label={t("order_status.A")} value="A" />
                  <Picker.Item label={t("order_status.R")} value="R" />
                  <Picker.Item label={t("order_status.C")} value="C" />
                  <Picker.Item label={t("order_status.B")} value="B" />
                  <Picker.Item label={t("order_status.K")} value="K" />
                </Picker>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  const renderStatusUpdateModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={statusUpdateModal.visible}
    >
      <View style={styles.statusUpdateModalOverlay}>
        <View
          style={[
            styles.statusUpdateModalContent,
            {
              backgroundColor: statusUpdateModal.success
                ? "#4CAF50"
                : "#F44336",
            },
          ]}
        >
          <Text style={styles.statusUpdateModalText}>
            {statusUpdateModal.message}
          </Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{t("order_text.order_title")}</Text>
        <Animated.View style={{ ...styles.orderGrid, opacity: fadeAnim }}>
          {orders.map((order, index) => (
            <Animated.View key={order.id || index} style={styles.orderCard}>
              <TouchableOpacity
                style={styles.orderHeader}
                onPress={() => openOrderDetails(order)}
                activeOpacity={0.7}
              >
                <View style={styles.orderInfo}>
                  <Text style={styles.customerName}>
                    {order.user.first_name}
                  </Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </Text>
                  <Text style={styles.orderTotal}>
                    Total: $
                    {order.dishesDetails
                      .reduce(
                        (
                          sum: number,
                          dish: { price: number; amount: number }
                        ) => sum + dish.price * dish.amount,
                        0
                      )
                      .toFixed(2)}
                  </Text>
                  <View style={[styles.statusContainer]}>
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor(order.order_status) },
                      ]}
                    />
                    <Text style={styles.statusText}>
                      {getName(order.order_status)}
                    </Text>
                  </View>
                </View>
                <FontAwesome name="chevron-right" size={16} color="#333" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
      {renderOrderModal()}
      {renderStatusUpdateModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  orderGrid: {
    width: "100%",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  orderInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
  },
  orderDetails: {
    padding: 16,
    backgroundColor: "#fff",
  },
  dishesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  dishItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dishInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
  },
  dishName: {
    fontSize: 16,
    color: "#333",
  },
  dishQuantity: {
    fontSize: 14,
    color: "#666",
  },
  dishPrice: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginLeft: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalScrollView: {
    maxHeight: 300,
    paddingHorizontal: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    justifyContent: "space-around",
  },

  statusSituation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    justifyContent: "space-around",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    width: 150,
  },
  statusPicker: {
    height: 40,
    width: 150,
  },
  customerInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statusUpdateModalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  statusUpdateModalContent: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  statusUpdateModalText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrdersCook;
