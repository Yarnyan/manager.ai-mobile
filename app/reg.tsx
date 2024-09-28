import React from 'react';
import { StyleSheet, View } from 'react-native';
import RegForm from '@/components/auth/RegForm';
const Reg = () => {
    return (
        <View style={styles.container}>
            <RegForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})

export default Reg;
