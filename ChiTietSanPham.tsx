import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ChiTietSanPham = ({ route }) => {
  const { item } = route.params;
  const [product, setProduct] = useState(item);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item.price * quantity);
  const navigation = useNavigation();
  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://192.168.1.42:3000/cart');
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const cartItems = await response.json();
      
      const existingProduct = cartItems.find(cartItem => cartItem.id === product.id);
      if (existingProduct) {
        // Product already exists in cart
        Alert.alert('Thông báo', 'Sản phẩm đã tồn tại trong giỏ hàng');
      } else {
        // Product does not exist in cart, add new item
        await fetch('http://192.168.1.42:3000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image,
          }),
        });
        Alert.alert("Thành công!","Thêm giỏ hàng thành công");
        navigation.navigate('Cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Alert.alert('Lỗi', 'Thêm giỏ hàng không thành công');
    }
  };
  
  useEffect(() => {
    // Update totalPrice when product or quantity changes
    setTotalPrice(product.price * quantity);
  }, [product, quantity]);
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClearQuantity = () => {
    setQuantity(1);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Image source={{ uri: product.image }} style={{ width: '100%', height: 200, borderWidth: 1, borderColor: '#dddddd' }} />
      <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 10, color: '#333333' }}>{product.name}</Text>
      <Text>{product.scientificName}</Text>
      <Text>{product.type}</Text>
      <Text style={{ fontSize: 18, color: 'green' }}>{product.price} ₫</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Số lượng: </Text>
        <TouchableOpacity onPress={handleDecreaseQuantity}>
          <Image source={require('./asset/tru.png')} style={{ width: 20, height: 20, marginRight: 30 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18 }}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncreaseQuantity}>
          <Image source={require('./asset/add.png')} style={{ width: 20, height: 20, marginLeft: 30 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleClearQuantity}>
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, justifyContent: 'center' }}>Tổng tiền: {totalPrice} ₫</Text>
      <TouchableOpacity
        style={{ backgroundColor: '#c0f0c0', padding: 10, borderRadius: 30, marginTop: 30, alignItems: 'center' }}
        onPress={handleAddToCart}>
        <Text style={{ color: 'black',fontWeight:'bold',fontSize:15 }}>Thêm giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    marginLeft: 'auto',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 50, 
    backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButtonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
})

export default ChiTietSanPham;
