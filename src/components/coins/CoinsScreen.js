import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import CoinItem from './CoinItem';
import CoinSearch from './CoinSearch';
import Http from 'crypto/src/libs/http';
import Colors from 'crypto/src/res/colors';

function CoinsScreen({ navigation }) {
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const fetchData = async () => {
      try {
        if (!isCancelled) {
          const r = await Http.instance
            .get('https://api.coinlore.net/api/tickers')
            .then((r) => {
              setCoins(r.data), setAllCoins(r.data);
            });
        }
        setLoading(false);
      } catch (e) {
        if (!isCancelled) {
          throw e;
        }
      }
    };

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSearch = (query) => {
    const coinsFiltered = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    setCoins(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator style={styles.loader} color="#252525" size="large" />
      ) : null}
      <FlatList
        data={coins}
        renderItem={({ item }) => (
          <CoinItem
            item={item}
            onPress={() => navigation.navigate('CoinDetail', { item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
