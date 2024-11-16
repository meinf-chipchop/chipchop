import id from "@/assets/icons/id.png";
import home from "@/assets/icons/home.png";
import person from "@/assets/icons/person.png";
import admin from "@/assets/icons/admin.png";
import orders from "@/assets/icons/orders.png";
import description from "@/assets/icons/description.png";
import category from "@/assets/icons/category.png";
import price from "@/assets/icons/price.png";
import hidden from "@/assets/icons/hidden.png";
import discount from "@/assets/icons/discount.png";
import accepted_orders from "@/assets/icons/accepted-orders.png";
import profile from "@/assets/icons/profile.png";
import user from "@/assets/icons/user.png";
import chef from "@/assets/icons/chef.png";
import dish from "@/assets/icons/dish.png";
import chat from "@/assets/icons/chat.png";
import star from "@/assets/icons/star.png";
import delivery from "@/assets/icons/delivery.png";
import email from "@/assets/icons/email.png";
import lock from "@/assets/icons/lock.png";
import phone from "@/assets/icons/phone.png";
import location from "@/assets/icons/location.png";
import yearsOfExperience from "@/assets/icons/yearsOfExperience.png";
import license from "@/assets/icons/license.png";
import google from "@/assets/icons/google.png";
import facebook from "@/assets/icons/facebook.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import auth from "@/assets/images/auth.png";
import id_card from "@/assets/images/id_card.png";
import dish2 from "@/assets/dishes/dish2.png";
import { OrderStatus, OrderType } from "@/lib/utils";

export const images = { onboarding1, onboarding2, onboarding3, auth, id_card };

export const dishes = { dish2 };

export const icons = {
  id,
  person,
  user,
  chef,
  delivery,
  location,
  yearsOfExperience,
  license,
  email,
  lock,
  phone,
  google,
  facebook,
  home,
  dish,
  chat,
  star,
  profile,
  admin,
  orders,
  accepted_orders,
  description,
  category,
  price,
  discount,
  hidden,
};

export const onboarding = [
  {
    id: 1,
    title: "Homemade Delights",
    description:
      "Home-cooked favorites, crafted by the chef and delivered fresh to you!",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Swift Service",
    description:
      "Fast, fresh delivery right to your door—enjoy every meal with ease!",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Personalized Cuisine",
    description: "Your favorite meals, delivered to you!",
    image: images.onboarding3,
  },
];

export const cooks: Account[] = [
  {
    uuid: "1",
    name: "David Brown",
    phone: "123456789",
    image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    role: "Chef",
    age: 30,
    created_at: "2024-10-10 05:19:20.620007",
  },
  {
    uuid: "2",
    name: "James Wilson",
    phone: "123456789",
    image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    role: "Chef",
    age: 35,
    created_at: "2024-10-10 05:19:20.620007",
  },
  {
    uuid: "3",
    name: "James",
    phone: "123456789",
    image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    role: "Chef",
    age: 32,
    created_at: "2024-10-10 05:19:20.620007",
  },
];

export const customers: Account[] = [
  {
    uuid: "1",
    name: "David Brown",
    phone: "123456789",
    image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    role: "Customer",
    age: 24,
    created_at: "2024-10-10 05:19:20.620007",
  },
  {
    uuid: "2",
    name: "James Wilson",
    phone: "123456789",
    image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    role: "Customer",
    age: 20,
    created_at: "2024-10-10 05:19:20.620007",
  },
  {
    uuid: "3",
    name: "James Wilson",
    phone: "123456789",
    image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    role: "Customer",
    age: 18,
    created_at: "2024-10-10 05:19:20.620007",
  },
];

export const allDishes: Dish[] = [
  {
    id: "1",
    user_uuid: "1",
    name: "Chicken Parmesan",
    description: "Chicken Parmesan with a creamy tomato sauce",
    image_url: dishes.dish2,
    price: 25,
    category: "Cat1",
    discount: 0,
    hidden: false,
    created_at: "2024-10-10 05:19:20.620007",
  },
  {
    id: "2",
    user_uuid: "2",
    name: "Chicken Parmesan",
    description: "Chicken Parmesan with a creamy tomato sauce",
    image_url: dishes.dish2,
    price: 25,
    category: "Cat1",
    discount: 0,
    hidden: false,
    created_at: "2024-10-10 05:19:20.620007",
  },
  {
    id: "3",
    user_uuid: "3",
    name: "Chicken Parmesan",
    description: "Chicken Parmesan with a creamy tomato sauce",
    image_url: dishes.dish2,
    price: 25,
    category: "Cat1",
    discount: 0,
    hidden: false,
    created_at: "2024-10-10 05:19:20.620007",
  },
];

export const allOrders: Order[] = [
  {
    id: "101",
    user_uuid: "1",
    recipe_id: "1",
    amount: "1",
    delivery: "123 Main St, Cityville",
    type: OrderType.DELIVERY,
    status: OrderStatus.PENDING,
    created_at: "2024-11-10 14:25:43.620007",
  },
  {
    id: "102",
    user_uuid: "2",
    recipe_id: "2",
    amount: "2",
    delivery: "456 Oak St, Townsville",
    type: OrderType.PICKUP,
    status: OrderStatus.APPROVED,
    created_at: "2024-11-11 09:15:20.620007",
  },
  {
    id: "103",
    user_uuid: "3",
    recipe_id: "3",
    amount: "3",
    delivery: "789 Pine St, Villagetown",
    type: OrderType.DELIVERY,
    status: OrderStatus.PENDING,
    created_at: "2024-11-12 18:35:10.620007",
  },
];
