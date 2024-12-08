import React from "react";
import { SafeAreaView, FlatList, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { VStack } from "@/components/ui/vstack";

const Cart = () => {
  const { cart, addItem, removeItem, clearCart } = useCart();
  console.log(cart);
  const addMockItem = () => {
    addItem({
      id: (cart.length + 1).toString(),
      dishes: {
        id: 0,
        user_id: 0,
        name: "Mock Item",
        description: "Mock Description",
        category: 0,
        price: 0,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={cart}
        renderItem={(item) => <Text>{item.item.dishes.name}</Text>}
        ListEmptyComponent={
          <Button onPress={addMockItem}>
            <ButtonText>Add item</ButtonText>
          </Button>
        }
      />
      <VStack className="p-4">
        <Button variant="outline" onPress={clearCart}>
          <ButtonText>Clear Cart</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default Cart;
