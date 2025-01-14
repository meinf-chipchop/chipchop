import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCart } from "@/context/cartContext";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import CartItem from "@/components/CartItem";
import { useGlobalToast } from "@/hooks/Toast";
import { OrderType, newOrder } from "@/lib/orders";
import { Colors } from "@/constants/Colors";
import { Address, formatAddress, getAddresses } from "@/lib/users";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react-native";

const Cart = () => {
  // TODO: use translations for literals
  // FIXME: Check dish prices. Why can be null
  const { t } = useTranslation();
  const { cart, addItem, removeItem, clearCart } = useCart();
  const [selectedAddress, setSelecedAddress] = useState<Address>();
  const [allAddresses, setAllAddress] = useState<Address[]>();
  const [deliveryMethod, setDeliveryMethod] = useState<OrderType>("D");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [error, setError] = useState("");

  const { handleToast } = useGlobalToast();

  useEffect(() => {
    getAddresses().then((address: Address[]) => {
      if (address.length === 0) {
        setAllAddress([
          {
            url: "https://chipchop.mooo.com/api/adresses/6/",
            user: "",
            street: "1234 Main St",
            city: "Springfield",
            zip_code: 12345,
            country_iso2: "US",
          },
          {
            url: "https://chipchop.mooo.com/api/adresses/6/",
            user: "",
            street: "5678 Elm St",
            city: "Shelbyville",
            zip_code: 54321,
            country_iso2: "US",
          },
        ]);
      } else {
        setAllAddress(address);
      }
    });
  }, []);

  const handleQuantityChange = (id: number, delta: number) => {
    const item = cart.find((item) => item.id === id);
    if (!item) {
      console.log(
        "[cart] Can't find item with id: " + id + " to change units."
      );
      return;
    }
    if (item && delta > 0) {
      addItem(item.dish);
    } else {
      removeItem(id, 1);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + (item.dish.price ?? 0) * item.units,
    0
  );
  const deliveryFees = 5.0;

  return (
    <>
      <ScrollView style={styles.container}>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            title={item.dish.name}
            estimatedTime={item.dish.estimated_time ?? ""}
            imgSrc={item.dish.image_url}
            {...item.dish}
            quantity={item.units}
            onQuantityChange={(delta) => handleQuantityChange(item.id, delta)}
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
        <View style={styles.deliveryMethod}>
          <Text style={styles.text}>Delivery Method</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setDeliveryMethod("D")}
            >
              <View
                style={
                  deliveryMethod === "D"
                    ? styles.radioSelected
                    : styles.radioUnselected
                }
              />
              <Text style={styles.text}>Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setDeliveryMethod("P")}
            >
              <View
                style={
                  deliveryMethod === "P"
                    ? styles.radioSelected
                    : styles.radioUnselected
                }
              />
              <Text style={styles.text}>Pick Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.paymentMethod}>
          <Text style={styles.text}>Payment Method</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setPaymentMethod("card")}
            >
              <View
                style={
                  paymentMethod === "card"
                    ? styles.radioSelected
                    : styles.radioUnselected
                }
              />
              <Text style={styles.text}>By Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setPaymentMethod("delivery")}
            >
              <View
                style={
                  paymentMethod === "delivery"
                    ? styles.radioSelected
                    : styles.radioUnselected
                }
              />
              <Text style={styles.text}>On Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.text}>Item Amount</Text>
            <Text style={styles.text}>${totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.text}>Discount</Text>
            <Text style={styles.text}>$0.0</Text>
          </View>
          {deliveryMethod === "D" && (
            <View style={styles.summaryRow}>
              <Text style={styles.text}>Delivery Fees</Text>
              <Text style={styles.text}>${deliveryFees.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.boldText}>Total Amount</Text>
            <Text style={styles.boldText}>
              $
              {(
                totalAmount + (deliveryMethod === "D" ? deliveryFees : 0)
              ).toFixed(2)}
            </Text>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.text}>Address</Text>
            <View style={styles.addressRow}>
              <Select
                initialLabel={"Select an address"}
                selectedValue={formatAddress(selectedAddress)}
                onValueChange={(value) => {
                  console.log(value);
                  setSelecedAddress(
                    allAddresses?.find(
                      (address) => formatAddress(address) === value
                    )
                  );
                  console.log(selectedAddress);
                }}
                style={styles.addressInput}
              >
                <SelectTrigger variant="rounded">
                  <SelectInput placeholder="Select an address" />
                  <SelectIcon as={ChevronDownIcon} className="mr-3" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {allAddresses?.map((address: Address) => (
                      <SelectItem
                        key={address.street}
                        label={formatAddress(address)}
                        value={formatAddress(address)}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            newOrder({
              url: "",
              order_type: "P",
              address: selectedAddress,
              cartItems: cart,
            })
              .then(() => {
                setError("");
                clearCart();
                handleToast("Order on the way!", "", "success");
                router.push("/home");
              })
              .catch((e) => {
                console.log(e);
                setError(e);
              });
          }}
        >
          <Text style={styles.buttonText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  deliveryMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  summary: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: Colors.chestnut[400],
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.chestnut[400],
    marginRight: 8,
  },
  radioUnselected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.chestnut[400],
    marginRight: 8,
  },
  addressContainer: {
    marginTop: 16,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressInput: {
    flex: 1,
    padding: 8,
  },
  editIcon: {
    marginLeft: 8,
  },
});

export default Cart;
