import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Constants, Dimen, Fonts, Strings} from '../../res';
import Assets from '../../res/Assets';
import CommonHeader from '../components/CommonHeader';
import {useSelector, useDispatch} from 'react-redux';
import {ADD_FAVOURITE} from '../redux/Actions';

const Favourites = ({navigation}) => {
  const [favCharacters, setFavCharacters] = useState(
    useSelector(state => state.favCharacters),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setFavCharacters(favCharacters);
  }, [favCharacters]);

  const handleCharOnPress = (item, index) => {
    let moreItems = [];
    const len = 5;
    if (index < favCharacters.length - 5) {
      for (let i = index + 1; i <= index + 5; i++) {
        moreItems.push(favCharacters[i]);
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
            <Image source={Assets.heart_filled} />
          </TouchableOpacity>
        </View>
        <Text style={styles.charNickName}>{item.nickname}</Text>
      </TouchableOpacity>
    );
  };

  const toggleFavourite = id => {
    const updatedList = favCharacters.filter(val => {
      if (id !== val.char_id) {
        return val;
      }
    });
    dispatch({type: ADD_FAVOURITE, data: updatedList});
    setFavCharacters(updatedList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        title={Strings.common.favourites}
        rightIcon={Assets.cross}
        titleStyles={{color: Colors.green}}
        onRightIconPress={() => navigation.navigate(Constants.routeName.Home)}
      />
      <View style={{flex: 1, paddingHorizontal: 15}}>
        <FlatList
          data={favCharacters}
          renderItem={({item, index}) => renderListItem(item, index)}
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
});

export default Favourites;
