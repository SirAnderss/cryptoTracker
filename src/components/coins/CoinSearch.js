import React, { useState } from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import Colors from 'crypto/src/res/colors';

function CoinSearch(props) {
  const [search, setSearch] = useState('');

  const handleText = (query) => {
    setSearch(query);

    if (props.onChange) {
      props.onChange(query);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={search}
        placeholder="Buscar Coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinSearch;
