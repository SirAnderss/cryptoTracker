import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import decimalConvert from 'crypto/src/libs/decimalConvert';
import Colors from 'crypto/src/res/colors';

const CoinMarketItem = ({ item }) => {
  function twoDec(n) {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>$ {decimalConvert(item.price_usd)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    borderColor: Colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceText: {
    color: '#fff',
  },
});

export default CoinMarketItem;
