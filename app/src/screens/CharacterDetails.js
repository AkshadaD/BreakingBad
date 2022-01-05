import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import {Strings, Colors, Dimen, Fonts} from '../../res';
import Assets from '../../res/Assets';
import CommonHeader from '../components/CommonHeader';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {ADD_FAVOURITE} from '../redux/Actions';

const CharacterDetails = ({navigation, route}) => {
  const [details, setDetails] = useState(route.params.characterDetails);
  const favourites = useSelector(state => state.favCharacters);
  const [favCharacters, setFavCharacters] = useState(favourites);
  const dispatch = useDispatch();

  useEffect(() => {
    setFavCharacters(favourites);
  }, [favourites]);

  const toggleFavourite = id => {
    if (favCharacters.length > 0) {
      const index = favCharacters.findIndex(value => value.char_id === id);
      index === -1
        ? favCharacters.push({...details, isFavourite: true})
        : favCharacters.splice(index, 1);
      dispatch({type: ADD_FAVOURITE, data: favCharacters});
      setFavCharacters(favCharacters);
      setDetails({...details, isFavourite: !details.isFavourite});
    } else {
      setDetails({...details, isFavourite: true});
      favCharacters.push(details);
      dispatch({type: ADD_FAVOURITE, data: favCharacters});
      setFavCharacters(favCharacters);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1, paddingBottom: 200}}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        source={{uri: details.img}}
        resizeMode="cover"
        style={styles.bgImg}
      />
      <View
        style={{paddingTop: Platform.OS === 'android' ? 0 : 40, opacity: 1}}>
        <CommonHeader
          containerStyle={{backgroundColor: 'transparent'}}
          leftIcon
          onLeftIconPress={() => navigation.goBack()}
          rightIcon={details.isFavourite ? Assets.heart_filled : Assets.heart}
          onRightIconPress={() => toggleFavourite(details.char_id)}
        />
      </View>
      <Image
        source={{uri: details.img}}
        resizeMode="cover"
        style={styles.profileImg}
      />
      <View style={styles.textView}>
        <Text style={styles.charName}>{details.name}</Text>
        <Text style={styles.charNicName}>{details.nickname}</Text>
        <Text style={styles.statusText}>{details.status}</Text>

        <View style={{paddingLeft: 23}}>
          <View style={styles.portrayedBdateView}>
            <View>
              <Text style={styles.detailsHeading}>
                {Strings.charDetails.potrayed}
              </Text>
              <Text style={[styles.charNicName, {textAlign: 'auto'}]}>
                {details.portrayed}
              </Text>
            </View>
            <View style={styles.bDateView}>
              <Text
                style={[
                  styles.charNicName,
                  {textAlign: 'auto', marginRight: 13},
                ]}>
                {details.birthday}
              </Text>
              <Icon name="gift" size={22} color={Colors.white} />
            </View>
          </View>

          <View style={{marginTop: 48}}>
            <Text style={styles.detailsHeading}>
              {Strings.charDetails.occupation}
            </Text>
            <Text
              style={[styles.charNicName, {textAlign: 'auto', marginTop: 9}]}>
              {details.occupation[0]}
            </Text>
            <Text style={[styles.charNicName, {textAlign: 'auto'}]}>
              {details.occupation[1]}
            </Text>
          </View>

          <View style={{marginTop: 48}}>
            <Text style={styles.detailsHeading}>
              {Strings.charDetails.appearedIn}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {details.appearance.map(val => {
                return (
                  <View style={styles.appearanceListItem}>
                    <Text style={[styles.charNicName, {textAlign: 'auto'}]}>
                      Season{val}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>

        <View style={{marginTop: 85, paddingLeft: 20}}>
          <Text style={styles.otherCharacters}>
            {Strings.charDetails.otherCharacters}
          </Text>
          <FlatList
            data={route.params.moreItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={{paddingRight: 43}}>
                  <Image
                    source={{uri: item.img}}
                    style={{width: 158, height: 210, borderRadius: 10}}
                  />
                  <Text style={styles.otherCharactersName}>{item.name}</Text>
                  <Text style={[styles.charNicName, {textAlign: 'auto'}]}>
                    {item.nickname}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  textView: {
    top:
      Platform.OS === 'android'
        ? Dimen.phoneWidth * 0.7 + 20
        : Dimen.phoneWidth * 0.8 + 20,
    paddingBottom: 200,
  },
  charName: {
    textAlign: 'center',
    fontFamily: Fonts.RobotoBold,
    fontSize: 31,
    lineHeight: 37,
    color: Colors.white,
  },
  charNicName: {
    textAlign: 'center',
    fontFamily: Fonts.RobotoLight,
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.white,
  },
  statusText: {
    textAlign: 'center',
    fontFamily: Fonts.RobotoMedium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.pink,
  },
  portrayedBdateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  bDateView: {
    paddingRight: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsHeading: {
    fontFamily: Fonts.RobotoMedium,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: Colors.green,
    textAlign: 'left',
  },
  bgImg: {
    width: '100%',
    height: Dimen.phoneHeight * 0.7,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.6,
  },
  profileImg: {
    width: Dimen.phoneWidth / 2,
    height: 250,
    alignSelf: 'center',
    top:
      Platform.OS === 'android'
        ? Dimen.phoneWidth * 0.7
        : Dimen.phoneWidth * 0.8,
    borderRadius: 10,
  },
  appearanceListItem: {
    backgroundColor: Colors.grey1A,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 3,
    marginTop: 16,
    borderRadius: 3,
  },
  otherCharacters: {
    fontFamily: Fonts.RobotoBold,
    fontSize: 23,
    lineHeight: 27,
    color: Colors.white,
    marginBottom: 14,
  },
  otherCharactersName: {
    fontFamily: Fonts.RobotoBold,
    fontSize: 16,
    lineHeight: 19,
    color: Colors.white,
    marginTop: 7,
  },
});
export default CharacterDetails;
