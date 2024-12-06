import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const CreditCardForm = () => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [focusElementStyle, setFocusElementStyle] = useState(null);

  const cardNumberRef = useRef(null);
  const cardNameRef = useRef(null);
  const cardDateRef = useRef(null);

  const flipCard = (status) => {
    setIsCardFlipped(status);
  };

  const focusInput = (ref) => {
    ref.current.measure((fx, fy, width, height, px, py) => {
      setFocusElementStyle({
        width,
        height,
        left: px,
        top: py,
      });
    });
  };

  const blurInput = () => {
    setFocusElementStyle(null);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.cardForm}>
        <View style={[styles.cardItem, isCardFlipped && styles.cardItemFlipped]}>
          <View style={styles.cardSideFront}>
            <View style={[styles.cardFocus, focusElementStyle && styles.cardFocusActive, focusElementStyle]} />
            <Image
              source={{ uri: `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${Math.floor(Math.random() * 25 + 1)}.jpeg` }}
              style={styles.cardBg}
            />
            <View style={styles.cardWrapper}>
              <View style={styles.cardTop}>
                <Image
                  source={{ uri: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png' }}
                  style={styles.cardChip}
                />
                <View style={styles.cardType}>
                  <Image
                    source={{ uri: `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType(cardNumber)}.png` }}
                    style={styles.cardTypeImg}
                  />
                </View>
              </View>
              <TextInput
                ref={cardNumberRef}
                style={styles.cardNumber}
                value={cardNumber}
                onChangeText={setCardNumber}
                onFocus={() => focusInput(cardNumberRef)}
                onBlur={blurInput}
                placeholder="Card Number"
                keyboardType="numeric"
              />
              <View style={styles.cardContent}>
                <TextInput
                  ref={cardNameRef}
                  style={styles.cardInfo}
                  value={cardName}
                  onChangeText={setCardName}
                  onFocus={() => focusInput(cardNameRef)}
                  onBlur={blurInput}
                  placeholder="Card Holder"
                />
                <View style={styles.cardDate}>
                  <TextInput
                    ref={cardDateRef}
                    style={styles.cardDateItem}
                    value={cardMonth}
                    onChangeText={setCardMonth}
                    onFocus={() => focusInput(cardDateRef)}
                    onBlur={blurInput}
                    placeholder="MM"
                    keyboardType="numeric"
                  />
                  <Text>/</Text>
                  <TextInput
                    style={styles.cardDateItem}
                    value={cardYear}
                    onChangeText={setCardYear}
                    onFocus={() => focusInput(cardDateRef)}
                    onBlur={blurInput}
                    placeholder="YY"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cardSideBack}>
            <Image
              source={{ uri: `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${Math.floor(Math.random() * 25 + 1)}.jpeg` }}
              style={styles.cardBg}
            />
            <View style={styles.cardBand} />
            <View style={styles.cardCvv}>
              <Text style={styles.cardCvvTitle}>CVV</Text>
              <TextInput
                style={styles.cardCvvBand}
                value={cardCvv}
                onChangeText={setCardCvv}
                onFocus={() => flipCard(true)}
                onBlur={() => flipCard(false)}
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getCardType = (number) => {
  const re = {
    visa: /^4/,
    amex: /^(34|37)/,
    mastercard: /^5[1-5]/,
    discover: /^6011/,
    troy: /^9792/,
  };
  for (const [key, value] of Object.entries(re)) {
    if (value.test(number)) return key;
  }
  return 'visa'; // default type
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddeefc',
  },
  cardForm: {
    width: '90%',
    maxWidth: 570,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardItem: {
    width: '100%',
    height: 270,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  cardItemFlipped: {
    transform: [{ rotateY: '180deg' }],
  },
  cardSideFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  cardSideBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: [{ rotateY: '180deg' }],
  },
  cardFocus: {
    position: 'absolute',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    opacity: 0,
  },
  cardFocusActive: {
    opacity: 1,
  },
  cardBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardWrapper: {
    padding: 20,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardChip: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  cardType: {
    width: 60,
    height: 40,
  },
  cardTypeImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardNumber: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    fontSize: 16,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    flex: 1,
  },
  cardDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDateItem: {
    fontSize: 16,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: 40,
    textAlign: 'center',
  },
  cardBand: {
    backgroundColor: 'rgba(0, 0, 19, 0.8)',
    height: 50,
    marginTop: 30,
  },
  cardCvv: {
    alignItems: 'flex-end',
    padding: 15,
  },
  cardCvvTitle: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
  cardCvvBand: {
    fontSize: 18,
    color: '#1a3b5d',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    width: 80,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#2364d2',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreditCardForm;