import DishCard from "@/components/DishCard";
import { allDishes } from "@/constants";
import React from "react";
import { ActivityIndicator, FlatList, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dishes = () => {
  const loading = false;
  const { width, height } = Dimensions.get('window');

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: width * 0.05, backgroundColor: '#f3f4f6' }}>
      {/* Title Section */}
      <View style={{ backgroundColor: '#e5e7eb', borderRadius: 4, padding: 8 }}>
        <Text style={{ fontSize: 24, paddingVertical: 4, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>
          Recipes
        </Text>
      </View>
      <FlatList
        data={allDishes?.slice(0, 5)}
        renderItem={({ item }) => <DishCard dish={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingHorizontal: width * 0.05 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: height * 0.1,
        }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!loading ? (
              <>
                {/* <Image
                  source={images.onboarding1}
                  style={{ width: width * 0.4, height: width * 0.4 }}
                  alt="No dishes found"
                  resizeMode="contain"
                /> */}
                <Text style={{ fontSize: 14, borderRadius: 50, padding: 16, backgroundColor: '#1f2937', color: '#ffffff' }}>
                  No Recipe found
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Dishes;
