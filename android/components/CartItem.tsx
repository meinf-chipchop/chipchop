import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface CartItemProps {
  imgSrc?: string;
  title: string;
  price: number | null;
  estimatedTime?: string;
  quantity: number;
  onQuantityChange: (amount: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  imgSrc,
  title,
  price,
  estimatedTime,
  quantity,
  onQuantityChange,
  onRemove,
}) => (
  <View style={styles.cartItem}>
    <Image source={{ uri: imgSrc }} style={styles.image} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemTitle}>{title}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${price?.toFixed(2)}</Text>
      </View>
      <Text style={styles.estimatedTime}>Estimated Time: {estimatedTime}</Text>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity onPress={() => onQuantityChange(-1)}>
        <Text style={styles.actionText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={() => onQuantityChange(1)}>
        <Text style={styles.actionText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.actionText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 16,
    marginBottom: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
    color: "#333",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  estimatedTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 24,
    color: "#966d35",
    marginHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
    color: "#333",
  },
});

export default CartItem;
