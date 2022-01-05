import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import {Colors, Fonts} from '../../res';
import Icon from 'react-native-vector-icons/FontAwesome';
// import HEART_FILLED from '../../res/assets/HEART_FILLED.svg';

const CommonHeader = props => (
  <View style={[styles.container, props.containerStyle]}>
    {props.leftIcon && (
      <TouchableOpacity onPress={props.onLeftIconPress}>
        <Icon name="arrow-left" size={20} color={Colors.white} />
      </TouchableOpacity>
    )}
    <Text style={[styles.title, props.titleStyles]}>{props.title}</Text>
    <View style={styles.iconView}>
      {props.search && (
        <TouchableOpacity onPress={props.onSearchClick}>
          <Icon
            name="search"
            size={22}
            color={Colors.white}
            style={{marginRight: 26}}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={props.onRightIconPress}>
        <Image source={props.rightIcon} style={styles.rightIcon} />
      </TouchableOpacity>
      {/* <HEART_FILLED style={{marginLeft: 10}} /> */}
    </View>
  </View>
);

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 20,
  },
  title: {
    fontSize: 23,
    color: Colors.white,
    fontFamily: Fonts.RobotoBold,
    fontWeight: 'bold',
    lineHeight: 27,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    // width: '100%',
    // height: '100%',
  },
});
