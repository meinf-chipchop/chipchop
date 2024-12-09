import React from "react";
import { SafeAreaView, FlatList, Text } from "react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { VStack } from "@/components/ui/vstack";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { Stack, useRouter } from "expo-router";
import { ChevronLeftIcon, Delete, Plus } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";

const Cart = () => {
  const router = useRouter();
  const { cart, addItem, removeItem, clearCart } = useCart();

  const toast = useToast();
  const [toastId, setToastId] = React.useState(0);
  const handleToast = (
    title: string,
    desc?: string,
    action?: "error" | "warning" | "success" | "info" | "muted" | undefined
  ) => {
    if (!toast.isActive(String(toastId))) {
      showNewToast(title, desc, action);
    }
  };
  const showNewToast = (
    title: string,
    desc?: string,
    action?: "error" | "warning" | "success" | "info" | "muted" | undefined
  ) => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: String(newId),
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action={action} variant="solid">
            <ToastTitle>{title}</ToastTitle>
            {desc && <ToastDescription>{desc}</ToastDescription>}
          </Toast>
        );
      },
    });
  };
  const addMockItem = () => {
    const added = addItem({
      id: 0,
      user_id: 0,
      name: "Mock Item",
      description: "Mock Description",
      category: 0,
      price: 0,
    });
    if (added) handleToast("Dish added!", "", "success");
    else handleToast("Cant add the dish", "", "error");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Cart",
          headerLeft: () => (
            <Button
              className="pl-4"
              variant="link"
              onPress={() => router.back()}
            >
              <ButtonIcon as={ChevronLeftIcon} size="md" />
            </Button>
          ),
          headerRight: () => (
            <Button className="pr-4" variant="link" onPress={() => clearCart()}>
              <ButtonIcon as={Delete} size="md" />
            </Button>
          ),
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <FlatList
          data={cart}
          renderItem={(item) => {
            return (
              <VStack className="p-4">
                <Text>{item.item.dish.name}</Text>
                <Text>{item.item.dish.description}</Text>
                <Text>{item.item.units}</Text>
                <HStack>
                  <Button onPress={() => addItem(item.item.dish)}>
                    <ButtonText>Add another</ButtonText>
                    <ButtonIcon as={Plus} size="md" />
                  </Button>
                  <Button
                    onPress={() => removeItem(item.item.id, 1)}
                    className="rounded-full"
                  >
                    <ButtonIcon as={Delete} size="md" />
                  </Button>
                </HStack>
              </VStack>
            );
          }}
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
    </>
  );
};

export default Cart;
