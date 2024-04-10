import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [plants, setPlants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.1.42:3000/product')
      .then(response => response.json())
      .then(data => setPlants(data))
      .catch(error => console.error('Error fetching plants:', error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.plantItem}>
      <TouchableOpacity onPress={() => navigation.navigate('ChiTietSanPham', { item })}>
        <Image style={styles.plantImage} source={{ uri: item.image }} />
      </TouchableOpacity>
      <Text style={styles.plantName}>{item.name}</Text>
      <Text style={styles.plantPrice}>{item.price} ₫</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.title}>Planta - Toả sáng không gian nhà bạn</Text>
        <Image
          source={{uri:'https://t4.ftcdn.net/jpg/05/31/67/91/360_F_531679184_3VykZEvx3OvHKnLpl3TdaDYWT1hYjvc9.jpg'}}
          style={{ width: '100%', height: 200, borderRadius: 15 }}
        />
      </View>
      <FlatList
        data={plants}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={styles.plantList}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  plantList: {
    marginTop: 20,
  },
  plantItem: {
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
    width: '50%',
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  plantPrice: {
    fontSize: 16,
    color: 'green',
  },
});
export default HomeScreen;
