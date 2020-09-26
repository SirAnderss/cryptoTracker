import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  /* ActivityIndicator,*/ FlatList,
} from 'react-native';

import FavoritesEmptyState from './FavoritesEmptyState';
import CoinItem from 'crypto/src/components/coins/CoinItem';

import Colors from 'crypto/src/res/colors';
import Storage from 'crypto/src/libs/storage';

function FavoritesScreen({ navigation }) {
  const [favorites, setFavorite] = useState([]);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllkeys();

      const keys = allKeys.filter((key) => key.includes('favorite-'));

      const favs = await Storage.instance.multiGet(keys);

      const favorites = favs.map((fav) => JSON.parse(fav[1]));

      setFavorite(favorites);
    } catch (e) {
      console.error('Get favorites error', e);
    }
  };

  useEffect(() => {

    navigation.addListener('focus', getFavorites);

    return function cleanup() {
      navigation.removeListener('focus', getFavorites);
    };
  }, []);
  return (
    <View style={styles.container}>
      {favorites.length == 0 ? <FavoritesEmptyState /> : null}

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <CoinItem
              item={item}
              onPress={() => navigation.navigate('CoinDetail', { item })}
            />
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
