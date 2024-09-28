import React, { useState, forwardRef, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, Alert } from 'react-native';
import * as yup from 'yup';
import { Button } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '@/store/hooks';
import { isApiError } from '@/helpers/auth/apiError';
import { useUserUpdateMutation } from '@/module/profile/api/user';

type Inputs = {
    login: string;
    username: string;
    email: string;
    password: string;
    hideModal?: () => void;
};

const ProfileModal = forwardRef(({ hideModal }, ref) => {
    const [error, setError] = useState('');
    const [updateUser] = useUserUpdateMutation();
    const user = useAppSelector((state) => state.user);

    const schema = yup.object().shape({
        login: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().required(),
        password: yup.string(),
    });

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            login: user?.login || '',
            username: user?.username || '',
            email: user?.email || '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        try {
            const formData = new FormData();
            formData.append('login', data.login);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('username', data.username);
            const response = updateUser(formData).unwrap();
            reset();
            hideModal()
        } catch (error) {
            if (isApiError(error)) {
                setError(error.data.message);
            } else {
                setError('Error updating profile');
            }
        }
    };

    return (
        <View ref={ref} style={styles.container}>
            <Text style={styles.updateText}>Update your profile</Text>
            <Text style={styles.title}>Login</Text>
            <Controller
                control={control}
                name="login"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Login"
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.login && <Text style={styles.error}>{errors.login.message}</Text>}

            <Text style={styles.title}>Username</Text>
            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

            <Text style={styles.title}>Email</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Text style={styles.title}>Password</Text>
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <Button
                mode="contained"
                buttonColor='#fff'
                textColor='black'
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
            >
                Save
            </Button>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#303136',
        width: '100%',
        justifyContent: 'center',
    },
    title: {
        color: '#F5F5F5',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#424242',
        color: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        width: '100%',
    },
    error: {
        color: 'red',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#F5F5F5',
        color: '#FFFFFF',
        borderRadius: 8,
        padding: 4,
        marginBottom: 16,
        width: '100%',
    },
    updateText: {
        color: '#F5F5F5',
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    }
});

export default ProfileModal;
