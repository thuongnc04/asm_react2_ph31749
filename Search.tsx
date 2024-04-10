import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Search: React.FC = ({navigation}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      const response = await fetch('http://192.168.1.42:3000/product');
      const data: Product[] = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [searchQuery, products]);

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>navigation.navigate('ChiTietSanPham', { item })}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={{flexDirection:'column'}}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price} đ</Text>
        </View>
      </TouchableOpacity>
      </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  productList: {
    flex: 1,
    marginTop: 20,
  },
  productItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 8,
  },
});

export default Search;
