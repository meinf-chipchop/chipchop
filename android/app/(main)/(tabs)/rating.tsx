import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { t } from "i18next";
import { Button } from "@/components/ui/button";
import { OrderDetail } from '@/lib/orders';
import { CheckCircle2 } from 'lucide-react-native';

interface RatingModalProps {
    isVisible: boolean;
    onClose: () => void;
    order: OrderDetail | null;
}

export function RatingModal({ isVisible, onClose, order }: RatingModalProps) {
    const [rating, setRating] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    const handleSubmit = () => {
        setIsSubmitted(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            setIsSubmitted(false);
            onClose();
            setRating(0);
        }, 1000);
    };

    if (!order) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {!isSubmitted ? (
                        <>
                            <Text style={styles.modalTitle}>{t("rating_system.title")}</Text>

                            <View style={styles.starsContainer}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => setRating(star)}
                                    >
                                        <Text style={[styles.star, star <= rating && styles.starFilled]}>
                                            ★
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.ratingText}>
                                {(() => {
                                    switch (rating) {
                                        case 1:
                                            return t("rating_options.option_one_star");
                                        case 2:
                                            return t("rating_options.option_two_star");
                                        case 3:
                                            return t("rating_options.option_three_star");
                                        case 4:
                                            return t("rating_options.option_four_star");
                                        case 5:
                                            return t("rating_options.option_five_star");
                                        default:
                                            return t("rating_options.select_option");
                                    }
                                })()}
                            </Text>

                            <View style={styles.buttonContainer}>
                                <Button variant="outline" onPress={onClose} style={styles.button}>
                                    <Text style={styles.buttonText}>{t("rating_system.close")}</Text>
                                </Button>
                                <Button onPress={handleSubmit} disabled={rating === 0} style={styles.button}>
                                    <Text style={styles.buttonText}>{t("rating_system.submit")}</Text>
                                </Button>
                            </View>
                        </>
                    ) : (
                        <Animated.View style={[styles.successContainer, { opacity: fadeAnim }]}>
                            <CheckCircle2 color="#4CAF50" size={64} />
                        </Animated.View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    star: {
        fontSize: 40,
        color: '#D3D3D3',
        marginHorizontal: 5,
    },
    starFilled: {
        color: '#FFD700',
    },
    ratingText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    successContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    successText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginTop: 10,
    },
});

