import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Order, getOrdersWithDishesAndUser } from "@/lib/orders";

const { width } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Orders = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await getOrdersWithDishesAndUser();
        setOrders(ordersResponse);
        // console.log( ordersResponse);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleOrder = (orderId: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "d":
        return "#4CAF50";
      case "p":
        return "#FFC107";
      default:
        return "#9E9E9E";
    }
  };

  const getName = (status: string) => {
    switch (status.toLowerCase()) {
      case "d":
        return "Delivered";
      case "p":
        return "Pending";
      default:
        return "";
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Orders</Text>
        <Animated.View style={{ ...styles.orderGrid, opacity: fadeAnim }}>

          {orders.map((order, index) => (
            <Animated.View key={order.id || index} style={styles.orderCard}>
              <TouchableOpacity
                style={styles.orderHeader}
                onPress={() => toggleOrder(order.id)}
                activeOpacity={0.7}
              >
                <View style={styles.orderInfo}>
                  <Text style={styles.customerName}>{order.firstName}</Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </Text>
                  <Text style={styles.orderTotal}>
                    Total: ${order.dishesDetails.reduce((sum: number, dish: { price: number; amount: number; }) => sum + dish.price * dish.amount, 0).toFixed(2)}
                  </Text>
                  <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(order.order_status) }]} />
                    <Text style={styles.statusText}>{getName(order.order_status)}</Text>
                  </View>
                </View>
                <Animated.View
                  style={{
                    transform: [
                      {
                        rotate: expandedOrderId === order.id ? "180deg" : "0deg",
                      },
                    ],
                  }}
                >
                  <FontAwesome name="chevron-down" size={16} color="#333" />
                </Animated.View>
              </TouchableOpacity>


              {expandedOrderId === order.id && (
                <View style={styles.orderDetails}>
                  <Text style={styles.dishesTitle}>Order Details:</Text>


                  {order.dishesDetails.map((dish: { dishDetails: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; amount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; price: number; }, index: React.Key | null | undefined) => (
                    <View key={index} style={styles.dishItem}>
                      <View style={styles.dishInfo}>
                        <Text style={styles.dishName}>{dish.dishDetails?.name}</Text>
                        <Text style={styles.dishQuantity}>x{dish.amount}</Text>
                      </View>

                    </View>
                  ))}

                </View>
              )}
              
            </Animated.View>
          ))}

        </Animated.View>
      </ScrollView>
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
  },
  dishName: {
    fontSize: 16,
    color: "#333",
    marginRight: 8,
  },
  dishQuantity: {
    fontSize: 14,
    color: "#666",
  },
  dishPrice: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
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
});

export default Orders;
