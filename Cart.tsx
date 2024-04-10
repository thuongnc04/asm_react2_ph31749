import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.1.42:3000/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleSelection = (id: number) => {
    setSelectedProducts(prevSelectedProducts => ({
      ...prevSelectedProducts,
      [id]: !prevSelectedProducts[id],
    }));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      if (selectedProducts[product.id]) {
        return total + product.price * product.quantity;
      }
      return total;
    }, 0);
  };

  const handleDeleteProduct = async (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: false,
    }));
  
    const response = await fetch(`http://192.168.1.42:3000/cart/${productId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      Alert.alert('Thành công', 'Đã xóa thành công sản phẩm khỏi giỏ hàng'); // Success message
    } else {
      console.error('Error deleting product from database:', response.statusText);
      Alert.alert('Lỗi', 'Xóa sản phẩm không thành công');
    }
  };

  const handleQuantityChange = async (productId: number, change: number) => {
    try {
      const response = await fetch(`http://192.168.1.42:3000/cart/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: Math.max(1, change + (await (await fetch(`http://192.168.1.42:3000/cart/${productId}`)).json()).quantity) }),
      });
  
      if (!response.ok) {
        console.error('Error updating product quantity:', response.statusText);
        Alert.alert('Lỗi', 'Cập nhật số lượng sản phẩm không thành công');
        return; // Exit the function if response not successful
      }
  
      const updatedQuantity = Math.max(1, change + (await response.json()).quantity);
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, quantity: updatedQuantity } : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating product quantity:', error);
      Alert.alert('Lỗi', 'Cập nhật số lượng sản phẩm không thành công');
    }
  };
  

  const isCheckoutEnabled = Object.values(selectedProducts).some(
    isSelected => isSelected,
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[
        styles.productContainer,
        selectedProducts[item.id] ? styles.selectedProduct : null,
      ]}
      onPress={() => toggleSelection(item.id)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} đ</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProduct(item.id)}>
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const handleCheckout = async () => {
    try {
      // Simulate payment processing (replace with actual integration)
      console.log('Simulating payment processing...');
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
  
      // Mark products as paid in state
      const updatedProducts = products.map((product) =>
        selectedProducts[product.id] ? { ...product, isPaid: true } : product
      );
      setProducts(updatedProducts);
  
      // Send DELETE requests for paid products
      const paidProductIds = Object.keys(selectedProducts).filter(
        (id) => selectedProducts[id]
      );
      await Promise.all(
        paidProductIds.map((productId) =>
          fetch(`http://192.168.1.42:3000/cart/${productId}`, {
            method: 'DELETE',
          })
        )
      );
  
      // Clear selected products and show success message
      setSelectedProducts({});
      Alert.alert('Thành công', 'Thanh toán thành công');
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Lỗi', 'Thanh toán thất bại. Vui lòng thử lại.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
      <Text style={styles.total}>Tổng tiền: {calculateTotal()} đ</Text>
      <TouchableOpacity
        disabled={!isCheckoutEnabled}
        style={[
          styles.checkoutButton,
          isCheckoutEnabled
            ? styles.checkoutButtonEnabled
            : styles.checkoutButtonDisabled,
        ]}
        onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productList: {
    flexGrow: 1,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  selectedProduct: {
    backgroundColor: '#c0f0c0',
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 14,
    color: '#666',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 20,
  },
  checkoutButton: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  checkoutButtonEnabled: {
    backgroundColor: '#c0f0c0',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
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
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default Cart;
