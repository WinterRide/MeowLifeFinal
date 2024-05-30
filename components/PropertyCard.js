import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const PropertyCard = ({item}) => {

  const navigation = useNavigation()
  const window = Dimensions.get('window');
  const windowWidth = window.width;
  const windowHeight = window.height;

  const formattedPrice = item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  
  const infoScreen = () => {
    navigation.navigate("ItemInfo", {
      photos: item.photos,
      species: item.species,
      age: item.age,
      owner: item.owner,
      price: item.price,
      level: item.level,
      vaccine: item.vaccine,
      description: item.description
    });
  }
  return (
    <Pressable onPress={infoScreen}
    style={{backgroundColor: "white", width: windowWidth / 2.3, height: windowHeight / 2.5, borderRadius: 10, borderBottomWidth: 4, borderRightWidth: 2, borderColor: "gray"}}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Image style={{height: windowHeight / 8, width: windowWidth / 4}} source={{uri: item.photos[0]}}/>
      </View>

      <View style={{flex: 1, padding: 10, marginLeft: 10}}>
        <Text style={{fontSize: 12}}>{item.age} Years old</Text>
        <Text style={{fontWeight: "bold", fontSize: 18}}>{item.species}</Text>
        <Text style={{fontSize: 10}}>{item.breed}</Text>
        <Text style={{fontSize: 12, marginTop: 10}}>{formattedPrice}</Text>
        <Text style={{fontSize: 12, alignSelf: "flex-end", marginTop: 15}}>{item.owner}</Text>
      </View>
      
    </Pressable>
  )
}

export default PropertyCard

const styles = StyleSheet.create({})