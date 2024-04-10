import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, Button, Alert } from 'react-native';

const Information = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false); // State để theo dõi trạng thái đăng xuất

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setIsLoggedOut(true);
    setModalVisible(false);
  };

  const cancelLogout = () => {
    setModalVisible(false);
  };
  if (isLoggedOut) {
      navigation.navigate('LoginScreen');
      Alert.alert("Thành công","Đăng xuất thành công");
  }
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Text style={{color:'black',fontSize:20}}>PROFILE</Text>
        <Image style={styles.avatar} source={{ uri: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/anh-dai-dien-tet-18.jpg' }} />
        <Text style={{color:'black',fontSize:20}}>Xin chào !</Text>
      </View> 
      <View style={{padding:20}}>
        <Text style={{fontSize:16}}>Chung</Text>
        <View style={{width:'100%',height:1,backgroundColor:'black',marginTop:10,marginBottom:20}}></View>
        <Text style={{fontSize:18,color:'black',marginBottom:10}}>Chinh sửa thông tin</Text>
        <Text style={{fontSize:18,color:'black',marginBottom:10}}>Cẩm nang trồng cây</Text>
        <Text style={{fontSize:18,color:'black',marginBottom:10}}>Lịch sử giao dịch</Text>
        <Text style={{fontSize:18,color:'black',marginBottom:10}}>Q & A</Text>
        <Text style={{fontSize:16}}>Bảo mật và điều khoản</Text>
        <View style={{width:'100%',height:1,backgroundColor:'black',marginTop:10,marginBottom:20}}></View>
        <Text style={{fontSize:18,color:'black',marginBottom:10}}>Điều khoản và điều kiện</Text>
        <Text style={{fontSize:18,color:'black',marginBottom:10}}>Chính sách quyền riêng tư</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{fontSize:18,color:'red',marginBottom:10,marginTop:10}}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Bạn có chắc chắn muốn đăng xuất?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <TouchableOpacity style={{backgroundColor:'red', padding:5,width:80,alignItems:'center',borderRadius:20,marginRight:15}} onPress={cancelLogout} >
                  <Text style={{color:'white'}}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:'lightgreen', padding:5,width:80,alignItems:'center',borderRadius:20,marginLeft:15}} onPress={confirmLogout}>
                  <Text style={{color:'black'}}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Information;
