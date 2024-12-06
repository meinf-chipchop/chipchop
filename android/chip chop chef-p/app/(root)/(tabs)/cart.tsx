import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import CartItem from './CartItem';
import { MaterialIcons } from '@expo/vector-icons';

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [userAddress, setUserAddress] = useState('Lleida 25001 5 15');
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const [paymentMethod, setPaymentMethod] = useState('card');

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('https://api.example.com/cart-items');
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleQuantityChange = (id, delta) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFees = 5.00;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>View Cart</Text>
            </View>
            {cartItems.map(item => (
                <CartItem 
                    key={item.id}
                    {...item}
                    onQuantityChange={(delta) => handleQuantityChange(item.id, delta)}
                    onRemove={() => handleRemoveItem(item.id)}
                />
            ))}
            <View style={styles.deliveryMethod}>
                <Text style={styles.text}>Delivery Method</Text>
                <View style={styles.radioGroup}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setDeliveryMethod('delivery')}
                    >
                        <View style={deliveryMethod === 'delivery' ? styles.radioSelected : styles.radioUnselected} />
                        <Text style={styles.text}>Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setDeliveryMethod('pickup')}
                    >
                        <View style={deliveryMethod === 'pickup' ? styles.radioSelected : styles.radioUnselected} />
                        <Text style={styles.text}>Pick Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.paymentMethod}>
                <Text style={styles.text}>Payment Method</Text>
                <View style={styles.radioGroup}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setPaymentMethod('card')}
                    >
                        <View style={paymentMethod === 'card' ? styles.radioSelected : styles.radioUnselected} />
                        <Text style={styles.text}>By Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setPaymentMethod('delivery')}
                    >
                        <View style={paymentMethod === 'delivery' ? styles.radioSelected : styles.radioUnselected} />
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
                {deliveryMethod === 'delivery' && (
                    <View style={styles.summaryRow}>
                        <Text style={styles.text}>Delivery Fees</Text>
                        <Text style={styles.text}>${deliveryFees.toFixed(2)}</Text>
                    </View>
                )}
                <View style={styles.summaryRow}>
                    <Text style={styles.boldText}>Total Amount</Text>
                    <Text style={styles.boldText}>${(totalAmount + (deliveryMethod === 'delivery' ? deliveryFees : 0)).toFixed(2)}</Text>
                </View>
                <View style={styles.addressContainer}>
                    <Text style={styles.text}>Address</Text>
                    <View style={styles.addressRow}>
                        <TextInput
                            style={styles.addressInput}
                            value={userAddress}
                            onChangeText={setUserAddress}
                            placeholder="Enter your address"
                        />
                        <TouchableOpacity style={styles.editIcon}>
                            <MaterialIcons name="edit" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.buttonText}>Confirm Order</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#966d35',
    },
    deliveryMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginTop: 16,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    summary: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    boldText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    confirmButton: {
        backgroundColor: '#966d35',
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    radioSelected: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#966d35',
        marginRight: 8,
    },
    radioUnselected: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#966d35',
        marginRight: 8,
    },
    addressContainer: {
        marginTop: 16,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
        color: '#333',
    },
    editIcon: {
        marginLeft: 8,
    },
});

export default App;
