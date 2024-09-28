import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LoginForm from '@/components/auth/LoginForm';
const Login = () => {
    return (
        <View style={styles.container}>
            <LoginForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#fff',
    },
})

export default Login;
