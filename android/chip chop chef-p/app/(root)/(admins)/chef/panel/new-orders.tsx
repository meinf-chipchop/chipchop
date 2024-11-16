import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { allOrders } from "@/constants";
import OrderCard from "@/components/OrderCard";
import { OrderStatus } from "@/lib/utils";

const ChefPanel = () => {
  // const [dishes] = useState(allDishes);
  const [orders] = useState(
    // eslint-disable-next-line prettier/prettier
    allOrders.filter((order) => order.status !== OrderStatus.APPROVED)
  );
  const [loading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "accept" | "decline" | null
  >(null);

  const handleOpenModal = (action: "accept" | "decline") => {
    setSelectedAction(action);
    setModalVisible(true);
  };

  const handleConfirmAction = () => {
    if (selectedAction === "accept") {
      // Handle accept logic
    } else if (selectedAction === "decline") {
      // Handle decline logic
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex gap-4 px-2 flex-col h-full bg-gray-100">
      <View className="mt-1 bg-general-100 rounded-sm p-2">
        <Text className="text-2xl py-1 font-bold text-center text-white">
          New Orders
        </Text>
      </View>
      <FlatList
        data={orders?.slice(0, 5)}
        renderItem={({ item }) => (
          <View className="px-4 py-3 mb-2">
            <OrderCard order={item} />
            <View className="flex flex-row justify-center space-x-2 mt-2">
              <CustomButton
                title="Accept"
                onPress={() => handleOpenModal("accept")}
                className="w-[45%]"
              />
              <CustomButton
                title="Decline"
                onPress={() => handleOpenModal("decline")}
                className="w-[45%]"
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        className="px-2"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <Text className="text-sm">No dishes found</Text>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
      />
      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View className="bg-white rounded-lg p-6 w-80">
            <Text className="text-lg font-semibold text-center mb-4">
              {selectedAction === "accept"
                ? "Confirm Accept Order?"
                : "Confirm Decline Order?"}
            </Text>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 px-6 py-3 rounded-full"
              >
                <Text className="text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmAction}
                className={`${
                  selectedAction === "accept"
                    ? "bg-primary-500"
                    : "bg-primary-800"
                } px-6 py-3 rounded-full`}
              >
                <Text className="text-white text-center">
                  {selectedAction === "accept" ? "Accept" : "Decline"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChefPanel;
