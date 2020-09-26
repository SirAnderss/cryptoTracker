import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);

      return true;
    } catch (e) {
      console.error('Storage store error', e);

      return false;
    }
  };

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error('Storage get error', e);

      throw Error(e);
    }
  };

  multiGet = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.error('Storage multiGet error', e);

      throw Error(e);
    }
  };

  getAllkeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error('Storage getAllKeys error', e);

      throw Error(e);
    }
  };

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (e) {
      console.error('Storage remove error', e);

      return false;
    }
  };
}

export default Storage;
