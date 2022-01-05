import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors, Constants, Dimen, Fonts, Strings} from '../../res';
import Assets from '../../res/Assets';
import CommonHeader from '../components/CommonHeader';
import axios from 'axios';
import {apis} from '../../res/URL';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {ADD_FAVOURITE, SET_APP_LOADER} from '../redux/Actions';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [characterList, setCharacterList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedCharacters, setSearchedCharacters] = useState([]);
  const [favCharacters, setFavCharacters] = useState(
    useSelector(state => state.favCharacters),
  );
  const favList = useSelector(state => state.favCharacters);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setFavCharacters(favList);
      getCharacters();
    }

    // return unsubscribe;
  }, [isFocused, favCharacters]); //favCharacters, isFocused, characterList

  const getCharacters = async () => {
    dispatch({type: SET_APP_LOADER, data: true});
    const charList = await axios.get(apis.baseUrl + apis.getAllCharacters);
    if (charList.status === 200) {
      const characters = charList.data.map(val => {
        const index = favCharacters.findIndex(
          value => value.char_id === val.char_id,
        );
        const item =
          index === -1
            ? {...val, isFavourite: false}
            : {...val, isFavourite: true};
        return item;
      });
      setCharacterList(characters);
      dispatch({type: SET_APP_LOADER, data: false});
    } else {
      dispatch({type: SET_APP_LOADER, data: false});
    }
  };

  const handleSearch = async character => {
    dispatch({type: SET_APP_LOADER, data: true});
    const url = apis.baseUrl + apis.searchCharacter + character;
    const charList = await axios.get(url);
    if (charList.status === 200) {
      const characters = charList.data.map(val => {
        const item = {...val, isFavourite: false};
        return item;
      });
      setSearchedCharacters(characters);
      dispatch({type: SET_APP_LOADER, data: false});
    } else {
      dispatch({type: SET_APP_LOADER, data: false});
    }
  };

  const handleCharOnPress = (item, index) => {
    let moreItems = [];
    const len = 5;
    if (index < characterList.length - 5) {
      for (let i = index + 1; i <= index + 5; i++) {
        moreItems.push(characterList[i]);
      }
    }
    navigation.navigate(Constants.routeName.CharacterDetails, {
      characterDetails: item,
      moreItems: moreItems,
    });
  };

  const renderListItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => handleCharOnPress(item, index)}>
        <Image
          source={{uri: item.img}}
          resizeMode="cover"
          style={styles.itemImage}
        />
        <View style={styles.charNameView}>
          <Text style={styles.charName}>{item.name}</Text>
          <TouchableOpacity onPress={() => toggleFavourite(item.char_id)}>
            <Image
              source={item.isFavourite ? Assets.heart_filled : Assets.heart}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.charNickName}>{item.nickname}</Text>
      </TouchableOpacity>
    );
  };

  const toggleFavourite = id => {
    const updatedList = characterList.map(val => {
      if (id === val.char_id) {
        const index = favCharacters.findIndex(value => value.char_id === id);
        index === -1 ? favCharacters.push(val) : favCharacters.splice(index, 1);
        dispatch({type: ADD_FAVOURITE, data: favCharacters});

        const item =
          index === -1
            ? {...val, isFavourite: true}
            : {...val, isFavourite: false};
        return item;
      } else {
        return val;
      }
    });
    setCharacterList(updatedList);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSearching ? (
        <View style={styles.searchHeader}>
          <TextInput
            placeholder={Strings.home.search}
            placeholderTextColor={Colors.grey}
            style={styles.searchTextInput}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              handleSearch(text);
            }}
            // onSubmitEditing={({nativeEvent: {text}}) => handleSearch(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setSearchedCharacters([]);
            }}>
            <Icon name="x" size={25} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <CommonHeader
          title={Strings.home.theBreakingBad}
          search
          rightIcon={Assets.heart_filled}
          onSearchClick={() => setIsSearching(true)}
          onRightIconPress={() =>
            navigation.navigate(Constants.routeName.Favourites)
          }
        />
      )}

      <View style={styles.listView}>
        <FlatList
          data={!isSearching ? characterList : searchedCharacters}
          renderItem={({item, index}) => renderListItem(item, index)}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          ListEmptyComponent={() => {
            if (
              isSearching &&
              searchText !== '' &&
              searchedCharacters.length <= 0
            ) {
              return (
                <View>
                  <Text style={styles.emptyListText}>
                    {Strings.home.noCharFound}
                  </Text>
                  <TouchableOpacity onPress={() => setSearchText('')}>
                    <Text
                      style={[styles.emptyListText, {color: Colors.greyC4}]}>
                      {Strings.home.tryAgain}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return <View />;
            }
          }}
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
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
  },
  listView: {
    paddingHorizontal: 15,
  },
  listContainer: {
    paddingTop: 30,
    paddingBottom: 100,
  },
  itemView: {
    width: Dimen.phoneWidth / 2 - 30,
    height: 258,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  itemImage: {
    width: Dimen.phoneWidth / 2 - 30,
    height: 240,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  charNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charName: {
    fontFamily: Fonts.RobotoBold,
    fontSize: 16,
    lineHeight: 19,
    color: Colors.white,
  },
  charNickName: {
    fontFamily: Fonts.RobotoMedium,
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.white,
  },
  searchText: {
    fontFamily: Fonts.RobotoLight,
    fontWeight: '300',
    fontSize: 33,
    lineHeight: 39,
    color: Colors.grey,
  },
  emptyListText: {
    fontFamily: Fonts.RobotoLight,
    fontWeight: '300',
    fontSize: 24,
    lineHeight: 28,
    color: Colors.green,
  },
});

export default Home;
