interface Dish {
  user: string; // Assuming CCCook is represented by a user ID or similar in TypeScript
  name: string;
  description: string;
  category?: string; // Assuming DishCategory is represented by an ID or similar
  price: number;
  discount: number;
  hidden: boolean;
  createdAt: Date;
  lastUpdatedAt?: Date;
  imageUrl?: string;
  estimatedTime?: string; // Representing DurationField as an ISO 8601 string
}
