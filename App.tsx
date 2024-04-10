import React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import Information from './Information';
import Cart from './Cart';
import Search from './Search';
import ChiTietSanPham from './ChiTietSanPham';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown:false,
        title: "Trang chủ", tabBarIcon: ({ color, size }) => (
          <Image source={require('./asset/iconhome.png')} style={{width:20,height:20}}/>
        )
      }} />
      <Tab.Screen name="Search" component={Search} options={{headerShown:false,
        title: "Tìm kiếm", tabBarIcon: ({ color, size }) => (
          <Image source={require('./asset/iconsearch.png')} style={{width:20,height:20}}/>
        )
      }} />
      <Tab.Screen name="Cart" component={Cart} options={{headerShown:false,
        title: "Giỏ hàng", tabBarIcon: ({ color, size }) => (
          <Image source={require('./asset/iconcart.png')} style={{width:20,height:20}}/>
        )
      }} />
      <Tab.Screen name="Information" component={Information} options={{headerShown:false,
        title: "Thông tin", tabBarIcon: ({ color, size }) => (
          <Image source={require('./asset/iconinformation.png')} style={{width:20,height:20}}/>
        )
      }} />

    </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="ChiTietSanPham" options={{ headerShown: false }} component={ChiTietSanPham} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
