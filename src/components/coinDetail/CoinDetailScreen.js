import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  SectionList,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import CoinMarketItem from './CoinMarketItem';
import decimalConvert from 'crypto/src/libs/decimalConvert';
import Http from 'crypto/src/libs/http';
import Storage from 'crypto/src/libs/storage';
import Colors from 'crypto/src/res/colors';

function CoinDetailScreen(item) {
  const thisCoin = item.route.params.item;
  const [markets, setMarkets] = useState([]);
  const [favorite, setFavorite] = useState(false);

  const toogleFavorite = () => {
    if (favorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const coin = JSON.stringify(thisCoin);
    const key = `favorite-${thisCoin.id}`;

    const stored = await Storage.instance.store(key, coin);

    if (stored) {
      setFavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${thisCoin.id}`;

          const removed = await Storage.instance.remove(key);

          if (removed) {
            setFavorite(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  getCoinSymbol = (coinStr) => {
    if (coinStr) {
      const symbol = coinStr.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const getSections = (thisCoin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [decimalConvert(thisCoin.market_cap_usd)],
      },
      {
        title: 'Volume 24h',
        data: [decimalConvert(thisCoin.volume24)],
      },
      {
        title: 'Change 24h',
        data: [decimalConvert(thisCoin.percent_change_24h)],
      },
    ];

    return sections;
  };

  useEffect(() => {
    let isCancelled = false;

    const setTitle = () => {
      if (!isCancelled) {
        item.navigation.setOptions({ title: thisCoin.symbol });
      }
    };

    const getFavorite = async () => {
      if (!isCancelled) {
        try {
          const key = `favorite-${thisCoin.id}`;

          const favStr = await Storage.instance.get(key);

          if (favStr != null) {
            setFavorite(true);
          }
        } catch (e) {
          console.error('Get favorites error', e);
        }
      }
    };

    const getMarket = async (coinId) => {
      if (!isCancelled) {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const markets = await Http.instance.get(url);

        setMarkets(markets);
      }
    };

    setTitle();
    getFavorite();
    getMarket(thisCoin.id);
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{ uri: getCoinSymbol(thisCoin.name) }}
          />
          <Text style={styles.titleText}>{thisCoin.name}</Text>
        </View>

        <Pressable
          onPress={toogleFavorite}
          style={[
            styles.btnFavorite,
            favorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {favorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections(thisCoin)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <Text style={styles.marketsTitle}>Markets</Text>

      <FlatList
        style={styles.list}
        horizontal={true}
        data={markets}
        /*keyExtractor={(item) => item}*/
        renderItem={({ item }) => <CoinMarketItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
