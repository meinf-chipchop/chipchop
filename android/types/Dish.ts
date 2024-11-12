declare interface Dish {
  dish_id: string;
  dish_name: string;
  dish_description: string;
  dish_image_url: string;
  dish_price: number;
  created_at: string;
  chef: {
    chef_id: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    rating: string;
  };
}
