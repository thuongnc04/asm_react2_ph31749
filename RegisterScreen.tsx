import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const RegisterScreen: React.FC = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleRegister = async () => {
      if (!user.trim()) {
        Alert.alert('Lỗi đăng ký', 'Chưa nhập tài khoản');
        return;
      }
      if (!password.trim()) {
        Alert.alert('Lỗi đăng ký', 'Chưa nhập mật khẩu');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Lỗi đăng ký', 'Mật khẩu xác nhận không khớp');
        return;
      }
  
      try {
        const response = await fetch('http://192.168.1.42:3000/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, password }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Đăng ký thành công, chuyển đến màn hình đăng nhập
        navigation.navigate('LoginScreen');
        Alert.alert("Thành công","Đăng ký thành công!!")
      } catch (error) {
        console.error('Error during registration:', error);
        Alert.alert('Lỗi đăng ký', 'Có lỗi xảy ra, vui lòng thử lại sau');
      }
    };
  

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to RegisterScreen</Text>
            <Image
                source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABcVK2V-SrlO5YHuSVG1q23BrGMYT-cPcS7HOqYNSjg&s'}}
                style={{ width: 350, height: 250, resizeMode: 'stretch', margin: 20, borderRadius: 140 }}
            />
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
            <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry
                onChangeText={setConfirmPassword}
                value={confirmPassword}
            />
            <TouchableOpacity
                style={{ backgroundColor: 'green', margin: 20, padding: 10, borderRadius: 20, width: 350, alignItems: 'center' }}
                onPress={handleRegister}
            >
                <Text style={{ color: 'white' }}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text>Bạn đã có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{ color: 'red' }}>Đăng nhập tại đây</Text>
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
    input: {
        width: 350,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default RegisterScreen;
