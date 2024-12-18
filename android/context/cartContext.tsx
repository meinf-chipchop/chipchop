import { Dish } from "@/lib/dishes";
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

// Define types for state and actions
interface CartItem {
  id: number;
  dish: Dish;
  units: number;
}

interface CartState {
  cook_id?: number;
  cart: CartItem[];
}

interface AddDishAction {
  type: "ADD_DISH";
  payload: Dish;
}

interface RemoveItemAction {
  type: "REMOVE_ITEM";
  payload: number;
  units?: number;
}

interface ClearCartAction {
  type: "CLEAR_CART";
}

type CartAction = AddDishAction | RemoveItemAction | ClearCartAction;

const initialState: CartState = {
  cart: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_DISH":
      const updatedCart = state.cart.map((item) =>
        item.dish.id === action.payload.id
          ? { ...item, units: item.units + 1 }
          : item
      );

      const dish = state.cart.find((value) => value.id === action.payload.id);
      if (!dish)
        updatedCart.push({
          id: action.payload.id,
          dish: action.payload,
          units: 1,
        });

      return {
        ...state,
        cart: updatedCart,
        cook_id: action.payload.user_id,
      };
    case "REMOVE_ITEM":
      const updatedCartRemove = state.cart
        .map((item) =>
          item.id === action.payload && action.units
            ? { ...item, units: item.units - action.units }
            : item
        )
        .filter((item) =>
          action.units ? item.units > 0 : item.id !== action.payload
        );

      return {
        ...state,
        cart: updatedCartRemove,
      };
    case "CLEAR_CART":
      return { ...state, cart: [], cook_id: undefined };
    default:
      return state;
  }
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { state, dispatch } = context;

  const addItem = (item: Dish) => {
    if (state.cook_id && state.cook_id !== item.user_id) return false;

    dispatch({ type: "ADD_DISH", payload: item });
    return true;
  };

  const removeItem = (id: number, units?: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id, units: units });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const numberOfItems = () => {
    return state.cart.length;
  };

  return {
    cart: state.cart,
    addItem,
    removeItem,
    clearCart,
    numberOfItems,
  };
};
