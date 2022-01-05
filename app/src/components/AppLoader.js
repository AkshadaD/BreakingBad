import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../res';

const AppLoader = () => {
  const isLoaderVisible = useSelector(state => state.isLoading);
  console.log({isLoaderVisible});
  return (
    <Modal transparent={true} animationType="none" visible={isLoaderVisible}>
      <View style={styles.loader}>
        <ActivityIndicator
          size={'large'}
          color={Colors.green}
          animating={true}
        />
      </View>
    </Modal>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#00000010',
  },
});
