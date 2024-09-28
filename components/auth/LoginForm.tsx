import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInMutation } from './api/auth';
import { useNavigation } from '@react-navigation/native';
import { isApiError } from '@/helpers/auth/apiError';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Inputs = {
    login: string;
    email: string;
    password: string;
};

const LoginForm = () => {
    const navigation = useNavigation();
    const [signIn] = useSignInMutation();
    const [error, setError] = useState('');
    const router = useRouter();
    const schema = yup.object().shape({
        login: yup.string().required('Login is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').max(32, 'Password cannot exceed 32 characters').required('Password is required'),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: Inputs) => {
        const formData = new FormData();
        formData.append('login', data.login);
        formData.append('email', data.email);
        formData.append('password', data.password);

        try {
            const response = await signIn(formData).unwrap();
            AsyncStorage.setItem("token", response.token);
            reset();
            router.replace('/profile');
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Error signing in');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>manager.ai</Text>
            <Text style={styles.subheader}>Sign in</Text>

            <Controller
                control={control}
                name="login"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Login"
                        placeholderTextColor="#888"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.login && <Text style={styles.error}>{errors.login.message}</Text>}

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.subheader}>Don't have an account?<Link href="/reg" style={styles.link}> Sign up</Link></Text>
            {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    link: {
        color: '#fff',
        marginLeft: 4,
    },
    subheader: {
        fontSize: 18,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 12,
        width: '100%',
    },
    input: {
        backgroundColor: '#444',
        color: '#fff',
        padding: 10,
        borderRadius: 4,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default LoginForm;
