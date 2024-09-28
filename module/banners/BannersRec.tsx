import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const BannersRec = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Recommended</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
        padding: 10,
      },
      text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
      },
})

export default BannersRec;
