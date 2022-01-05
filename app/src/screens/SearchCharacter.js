import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors, Dimen, Fonts, Strings, Constants} from '../../res';
import Assets from '../../res/Assets';
import axios from 'axios';
import {apis} from '../../res/URL';

const SearchCharacter = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [characterList, setCharacterList] = useState([]);
  console.log({navigation});

  const handleSearch = async character => {
    console.log({character});
    const url = apis.baseUrl + apis.searchCharacter + character;
    const charList = await axios.get(url);
    console.log('charListcharList charList charList charList', charList);
    if (charList.status === 200) {
      const characters = charList.data.map(val => {
        const item = {...val, isFaourite: false};
        return item;
      });
      setCharacterList(characters);
    }
  };

  const renderListItem = item => {
    console.log('item item item item:', item);
    return (
      <View style={styles.itemView}>
        <Image
          source={{uri: item.img}}
          resizeMode="contain"
          style={styles.itemImage}
        />
        <View style={styles.charNameView}>
          <Text style={styles.charName}>{item.name}</Text>
          {/* <TouchableOpacity onPress={() => toggleFavourite(item.char_id)}> */}
            <Image
              source={item.isFavourite ? Assets.heart_filled : Assets.heart}
            />
          {/* </TouchableOpacity> */}
        </View>
        <Text style={styles.charNickName}>{item.nickname}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <TextInput
          placeholder={Strings.home.search}
          placeholderTextColor={Colors.grey}
          style={styles.searchTextInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={({nativeEvent: {text}}) => handleSearch(text)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(Constants.routeName.Home)}>
          <Icon name="x" size={25} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.listView}>
        <FlatList
          // data={formatData(characterList, 2)}
          data={characterList}
          renderItem={({item}) => renderListItem(item)}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  searchTextInput: {
    color: Colors.white,
    width: '80%',
    fontSize: 33,
    fontFamily: Fonts.RobotoLight,
    lineHeight: 39,
    fontWeight: '200',
  },
  searchHeader: {
    backgroundColor: Colors.grey24,
    flexDirection: 'row',
    // height: 86,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 17,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default SearchCharacter;
