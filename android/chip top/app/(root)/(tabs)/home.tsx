import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Home = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value of 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to opacity value of 1
      duration: 1000, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Image
                source={{ uri: "https://placehold.co/40x40" }}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>Chip Chop</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome.Button
              name="shopping-basket"
              backgroundColor="#415f63"
              iconStyle={styles.icon}
            >
              <Text style={styles.iconText}></Text>
            </FontAwesome.Button>
            <FontAwesome.Button
              name="user"
              backgroundColor="#415f63"
              iconStyle={styles.icon}
            >
              <Text style={styles.iconText}></Text>
            </FontAwesome.Button>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={20} color="gray" />
            <TextInput placeholder="Search chef" style={styles.searchInput} />
          </View>
          <View style={styles.locationBox}>
            <FontAwesome name="map-marker" size={20} color="gray" />
            <Text style={styles.locationText}>
              12530 Borriana, Castellón, Spain
            </Text>
          </View>
          <View style={styles.categoryBox}>
            <Text style={styles.categoryText}>Categories</Text>
            <FontAwesome name="chevron-down" size={20} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Barbeque" color="#966d35" />
            <Button title="Breakfast" color="#966d35" />
            <Button title="Dessert" color="#966d35" />
          </View>
        </View>
        <Text style={styles.featuredTitle}>Featured Dishes</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuredScroll}
        >
          {[
            {
              name: "Grilled Chicken",
              image:
                "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            },
            {
              name: "Pepperoni Pizza",
              image:
                "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
            },
            {
              name: "Cheeseburger",
              image:
                "https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg",
            },
            {
              name: "Caesar Salad",
              image:
                "https://images.pexels.com/photos/27603332/pexels-photo-27603332/free-photo-of-salad-with-shrimp-and-tomatoes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
              name: "Chocolate Cake",
              image:
                "https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ].map((dish, index) => (
            <View key={index} style={styles.dishCard}>
              <Image source={{ uri: dish.image }} style={styles.dishImage} />
              <View style={styles.overlay}>
                <Text style={styles.dishText}>{dish.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.chefsTitle}>Top Chefs</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chefsScroll}
        >
          {[
            {
              name: "Gordon Ramsay",
              image: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            {
              name: "Jamie Oliver",
              image: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            {
              name: "Nigella Lawson",
              image: "https://randomuser.me/api/portraits/women/1.jpg",
            },
            {
              name: "Wolfgang Puck",
              image: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            {
              name: "Alice Waters",
              image: "https://randomuser.me/api/portraits/women/2.jpg",
            },
          ].map((chef, index) => (
            <View key={index} style={styles.chefCard}>
              <Image source={{ uri: chef.image }} style={styles.chefImage} />
              <Text style={styles.chefText}>{chef.name}</Text>
            </View>
          ))}
        </ScrollView>

        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.chipChopTitle}>New On Chip Chop</Text>
          <View style={styles.chipChopContainer}>
            {[
              {
                name: "Spaghetti Carbonara",
                image:
                  "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
              },
              {
                name: "Tacos",
                image:
                  "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
              },
              {
                name: "Sushi",
                image:
                  "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg",
              },
              {
                name: "Pancakes",
                image:
                  "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
              },
              {
                name: "Ice Cream",
                image:
                  "https://images.pexels.com/photos/3311075/pexels-photo-3311075.jpeg",
              },
            ].map((dish, index) => (
              <View key={index} style={styles.dishCardVertical}>
                <Image source={{ uri: dish.image }} style={styles.dishImage} />
                <View style={styles.overlay}>
                  <Text style={styles.dishText}>{dish.name}</Text>
                </View>
              </View>
            ))}
          </View>
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
    paddingBottom: 80, // Add bottom padding to ensure space from the tab bar
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    paddingVertical: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBackground: {
    backgroundColor: "#966d35",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  icon: {
    color: "#e3d6ab",
  },
  iconText: {
    color: "#e3d6ab",
  },
  searchContainer: {
    marginTop: 16,
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dfe1d5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dfe1d5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 8,
    color: "gray",
    fontSize: 16,
  },
  categoryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#966d35",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  featuredTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
  },
  featuredScroll: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  dishCard: {
    marginRight: 16,
    width: width * 0.7, // 70% of the screen width
    height: width * 0.4, // Make it square by setting height equal to width
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1, // Add border width
    borderColor: "#966d35", // Set border color
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  dishText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  chipChopTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#415f63", // Change color to #415f63
    textAlign: "center", // Center the title
    paddingHorizontal: 16,
    paddingBottom: 16, // Add bottom padding
  },
  chipChopContainer: {
    width: "100%",
    alignItems: "center",
  },
  dishCardVertical: {
    marginBottom: 16,
    width: width * 0.9, // 90% of the screen width for vertical layout
    height: width * 0.5, // Adjust height for vertical layout
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#966d35",
  },
  chipChopScroll: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  chefsTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
  },
  chefsScroll: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  chefCard: {
    marginRight: 16,
    width: 100,
    alignItems: "center",
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 1, // Add border width
    borderColor: "#966d35", // Set border color
  },
  chefText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});

export default Home;
