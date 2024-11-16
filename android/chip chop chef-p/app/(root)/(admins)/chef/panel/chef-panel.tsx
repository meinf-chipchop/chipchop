import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import DishCard from "@/components/DishCard";
import { router } from "expo-router";
import { allDishes } from "@/constants";

// const ChefPanel = () => {
//   const [dishes] = useState(allDishes);
//   const [loading] = useState(false);

//   const handleCreateDish = () => {
//     router.push("/(root)/(admins)/chef/recipe/create" as any);
//   };

//   const handleEditDish = () => {
//     router.push("/(root)/(admins)/chef/recipe/update" as any);
//   };

//   const handleDeleteDish = () => {
//     // Add logic to delete a dish
//     // console.log('Deleting a dish...');
//   };

//   return (
//     <SafeAreaView className="flex gap-4 px-2  flex-col h-full bg-gray-100">
//       {/* Title Section */}
//       <View className="mt-1 bg-primary-700 rounded-3xl  p-2">
//         <Text className="text-3xl  py-1  font-bold text-center text-white">
//           Chef Panel
//         </Text>
//         {/* Create Dish Section */}
//         <CustomButton
//           title="Create Dish"
//           className="mt-2"
//           onPress={handleCreateDish}
//         />
//       </View>

//       {/* Dish List Section */}
//       <FlatList
//         data={dishes?.slice(0, 5)}
//         // renderItem={({ item }) => <DishCard dish={item} />}
//         renderItem={({ item }) => (
//           <View className="bg-white rounded-lg shadow-md px-4 py-3 mb-2">
//             <DishCard dish={item} />
//             <View className="flex flex-row justify-center space-x-2 mt-2">
//               <CustomButton
//                 title="Edit"
//                 onPress={() => handleEditDish()}
//                 className="w-[45%]"
//               />
//               <CustomButton
//                 title="Delete"
//                 onPress={() => handleDeleteDish()}
//                 className="w-[45%]"
//               />
//             </View>
//           </View>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         className="px-2"
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{
//           paddingBottom: 100,
//         }}
//         ListEmptyComponent={() => (
//           <View className="flex flex-col items-center justify-center">
//             {!loading ? (
//               <>
//                 <Text className="text-sm">No dishes found</Text>
//               </>
//             ) : (
//               <ActivityIndicator size="small" color="#000" />
//             )}
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// export default ChefPanel;

const ChefPanel = () => {
  const [dishes, setDishes] = useState(allDishes);
  const [loading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState<string | null>(null);

  const handleCreateDish = () => {
    router.push("/(root)/(admins)/chef/recipe/create" as any);
  };

  const handleEditDish = () => {
    router.push("/(root)/(admins)/chef/recipe/update" as any);
  };

  const handleDeleteDish = (id: string) => {
    setSelectedDishId(id);
    setModalVisible(true);
  };

  const confirmDeleteDish = () => {
    if (selectedDishId) {
      setDishes((prevDishes) =>
        // eslint-disable-next-line prettier/prettier
        prevDishes.filter((dish) => dish.id !== selectedDishId)
      );
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex gap-4 px-2 flex-col h-full bg-gray-100">
      <View className="mt-1 bg-general-100 rounded-sm p-2">
        <Text className="text-2xl py-1 font-bold text-center text-white">
          Chef Panel
        </Text>
      </View>
      <CustomButton
        title="Create Recipe"
        className="mt-2 w-[50%]"
        onPress={handleCreateDish}
      />
      <FlatList
        data={dishes}
        renderItem={({ item }) => (
          <View className="px-4 py-3 mb-2">
            <DishCard dish={item} />
            <View className="flex flex-row justify-center space-x-2 mt-2">
              <CustomButton
                title="Edit"
                onPress={handleEditDish}
                className="w-[45%]"
              />
              <CustomButton
                title="Delete"
                onPress={() => handleDeleteDish(item.id)}
                className="w-[45%]"
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
          flexGrow: 1,
        }}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            {!loading ? (
              <Text className="rounded-full text-primary-600 font-semibold text-lg text-center">
                No Recipe found
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
      />
      {/* Delete Confirmation Modal */}
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
              Are you sure you want to delete this dish?
            </Text>
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 px-6 py-3 rounded-full"
              >
                <Text className="text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDeleteDish}
                className="bg-primary-800 px-6 py-3 rounded-full"
              >
                <Text className="text-white text-center">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChefPanel;
