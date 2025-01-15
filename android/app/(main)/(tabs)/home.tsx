import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Button as GoodButton, ButtonIcon } from "@/components/ui/button";
import {
  Truck,
  ScrollText,
  Search,
  MapPin,
  ChevronDown,
  Star,
} from "lucide-react-native";
import { Me, me } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useSession } from "@/context/authContext";
import { CooksPage, getCooks } from "@/lib/cook";
import CookList from "@/components/CooksList";
import { t } from "i18next";
import { Dish, getAllDishes } from "@/lib/dishes";
import { DishCategory, getDishCategories } from "@/lib/dishCategories";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = useSession();
  const router = useRouter();
  const [cooks, setCooks] = useState<CooksPage>();
  const [selfUser, setSelfUser] = useState<Me>();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [dishCategories, setDishCategories] = useState<DishCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<DishCategory | null>();
  const [dishSearch, setDishSearch] = useState<string>("");

  const filteredDishes: Dish[] = useMemo(() => {
    if (!dishSearch && !activeCategory) return dishes;

    return dishes.filter((dish) => {
      if (activeCategory && dish.category !== activeCategory.name) {
        return false;
      }
      if (
        dishSearch &&
        !dish.name.toLowerCase().includes(dishSearch.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [dishes, activeCategory, dishSearch]);

  const [topDishes, otherDishes] = useMemo(() => {
    let ordered = filteredDishes.toSorted((a, b) => {
      return (Number(b.rating_average) || 0) - (Number(a.rating_average) || 0);
    });

    return [ordered.slice(0, 3), ordered.slice(3)];
  }, [filteredDishes]);

  useEffect(() => {
    getAllDishes().then((dishes) => setDishes(dishes));
    getDishCategories().then((categories) => setDishCategories(categories));
  }, []);

  useEffect(() => {
    me()
      .then((res) => setSelfUser(res))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const fetchCooks = async () => {
      const cooks = await getCooks();
      setCooks(cooks);
    };
    fetchCooks();
  }, []);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const gotoCook = (id: number) => {
    router.push({
      pathname: "/CookDetails",
      params: {
        cook_url: `${process.env.EXPO_PUBLIC_API_URL}/api/cooks/${id}/`,
      },
    });
  };

  const headerContentOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderFeaturedDish = ({ item }: { item: any }) => (
    <Pressable onPress={() => gotoCook(item.cook_id!)}>
      <Animated.View
        style={[
          styles.dishCard,
          {
            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [0, 150],
                  outputRange: [1, 0.95],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.dishImage} />
        <View style={styles.overlay}>
          <Text style={styles.dishText}>{item.name}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[styles.header, { height: headerHeight, zIndex: 10 }]}
      >
        <Animated.View
          style={[styles.headerContent, { opacity: headerContentOpacity }]}
        >
          <View style={styles.logoContainer}>
            <View
              style={[
                styles.logoBackground,
                { flexDirection: "column", alignItems: "flex-start" },
              ]}
            >
              <Image
                source={require("../../../assets/images/adaptive-icon.png")}
                style={styles.logo}
              />
              <Text style={styles.titleApp}>Chip Chop</Text>
            </View>
          </View>

          <View style={styles.iconContainer}>
            {selfUser?.role === "C" && (
              <GoodButton
                className="pl-4 bg-[#415f63] rounded w-auto"
                variant="link"
                onPress={() => router.push("/ordersCook")}
              >
                <ButtonIcon
                  as={ScrollText}
                  size="md"
                  color="white"
                  className="w-auto pr-4"
                />
              </GoodButton>
            )}
            {selfUser?.role === "D" && (
              <GoodButton
                className="pl-4 bg-[#415f63] rounded w-auto"
                variant="link"
                onPress={() => router.push("/DelivererOrders")}
              >
                <ButtonIcon
                  as={Truck}
                  size="md"
                  color="white"
                  className="w-auto pr-4"
                />
              </GoodButton>
            )}

            {/* <GoodButton
              className="pl-4 bg-[#415f63] rounded w-auto"
              variant="link"
              onPress={() => router.push("/rating")}
            >
              <ButtonIcon as={Star} size="md" color="white" className="w-auto pr-4" />
            </GoodButton> */}
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.headerTitle, { opacity: headerTitleOpacity }]}
        >
          <Text style={styles.headerTitleText}>Chip Chop</Text>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* <View style={styles.searchContainer}>
          <View style={styles.locationBox}>
            <Search size={20} color="gray" />
            <TextInput
              placeholder={t("labels.chef_search_field")}
              style={styles.searchInput}
            />
          </View>
        </View> */}

        <View style={styles.categoriesContainer}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryHeaderText}>
              {t("labels.category")}
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dishCategories?.map((cat) => {
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryButton}
                  onPress={() => {
                    setActiveCategory(cat);
                  }}
                >
                  <Text style={styles.categoryButtonText}>{cat.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>{t("labels.featured_dishes")}</Text>
        <FlatList
          data={topDishes.map((dish) => ({
            name: dish.name,
            image:
              dish.image_url ||
              "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
            cook_id: dish.user_id,
          }))}
          renderItem={renderFeaturedDish}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScroll}
          className="w-screen"
        />

        <Text style={styles.sectionTitle}>{t("labels.top_chefs")}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chefsScroll}
        >
          {cooks && <CookList cooks={cooks} />}
        </ScrollView>

        <Text style={styles.sectionSubTitle}>{t("labels.new_chipchop")}</Text>
        <ScrollView style={styles.newDishesContainer}>
          {otherDishes.map((dish, index) => (
            <Pressable onPress={() => gotoCook(dish.user_id!)}>
              <Animated.View key={index} style={[styles.newDishCard]}>
                <Image
                  source={{ uri: dish.image_url }}
                  style={styles.newDishImage}
                />
                <Text style={styles.newDishText}>{dish.name}</Text>
              </Animated.View>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 4,
    zIndex: 10, // Garante que o cabeçalho fique acima
  },

  headerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContainer: {
    paddingTop: HEADER_MAX_HEIGHT,
    paddingBottom: 80,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBackground: {
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  titleApp: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    gap: 5,
  },

  searchContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  locationText: {
    marginLeft: 8,
    color: "gray",
    fontSize: 14,
  },
  categoriesContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  categoriesList: {
    paddingVertical: 8,
  },
  categoryButton: {
    backgroundColor: Colors.chestnut[400],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 16,
  },

  sectionSubTitle: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 16,
  },

  featuredScroll: {
    paddingHorizontal: 16,
  },
  dishCard: {
    marginRight: 16,
    width: width * 0.7,
    height: width * 0.4,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 4,
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    padding: 16,
  },
  dishText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  chefsScroll: {
    paddingHorizontal: 16,
  },
  newDishesContainer: {
    paddingHorizontal: 16,
  },
  newDishCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    overflow: "hidden",
  },
  newDishImage: {
    width: 80,
    height: 80,
  },
  newDishText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    color: "#333",
  },
});

export default Home;
