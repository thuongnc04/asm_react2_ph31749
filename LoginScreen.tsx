import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = async () => {
    // Kiểm tra hợp lệ
    if (user.length === 0) {
      Alert.alert('Lỗi đăng nhập', 'Chưa nhập tài khoản');
      return;
    }
    if (password.length === 0) {
      Alert.alert('Lỗi đăng nhập', 'Chưa nhập mật khẩu');
      return;
    }

    try {
      // Thực hiện fetch để lấy dữ liệu về
      const response = await fetch(`http://192.168.1.42:3000/profile?user=${user}`);
      const userData = await response.json();

      if (userData.length !== 1) {
        Alert.alert('Lỗi đăng nhập', 'Sai tài khoản hoặc mật khẩu');
        return;
      }

      const obju = userData[0];
      if (obju.password !== password) {
        Alert.alert('Lỗi đăng nhập', 'Sai mật khẩu');
        return;
      }

      // Đúng password: Lưu thông tin vào storage
      await AsyncStorage.setItem('LoginScreen', JSON.stringify(obju));

      // Chuyển màn hình
      Alert.alert("Thành công","Đăng nhập thành công")
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Lỗi đăng nhập', 'Có lỗi xảy ra, vui lòng thử lại!');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LoginScreen</Text>
      <Image source={{uri:'https://caycanhhanoi.com/wp-content/uploads/2020/07/banner-img.png'}} style={styles.bannerImage} />
      <TextInput
        style={styles.input}
        placeholder="Tài khoản"
        onChangeText={setUser}
        value={user}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={doLogin}
      >
          <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={styles.dividerText}>---------------------------------Hoặc---------------------------------</Text>
      <View style={styles.socialIconsContainer}>
        <Image source={require('./asset/google.webp')} style={styles.socialIcon} />
        <Image source={require('./asset/facebook.webp')} style={styles.socialIcon} />
      </View>
      <View style={styles.signupTextContainer}>
        <Text>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.signupLink}>Đăng ký tại đây</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bannerImage: {
    width: 350,
    height: 250,
    resizeMode: 'stretch',
    marginVertical: 20,
    borderRadius: 140,
  },
  input: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 15,
  },
  button: {
    backgroundColor: 'green',
    marginVertical: 20,
    padding: 10,
    borderRadius: 20,
    width: 350,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  dividerText: {
    fontSize: 16,
    marginVertical: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    marginHorizontal: 20,
  },
  signupTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  signupLink: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
