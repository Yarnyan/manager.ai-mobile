import React, { useState, forwardRef, useEffect, useCallback } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Button } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '@/store/hooks';
import { isApiError } from '@/helpers/auth/apiError';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUpdateBotMutation } from '@/module/profile/api/user';

type Inputs = {
    botName: string;
    prompt: string;
    description: string;
    hideModal?: () => void;
};

const EditBotModal = forwardRef(({ hideModal }: any, ref) => {
    const [error, setError] = useState('')

    const schema = yup.object().shape({
        botName: yup.string().required(),
        prompt: yup.string().required(),
        description: yup.string().required(),
    });

    const [updateBot] = useUpdateBotMutation();

    const [activePublicBot, setActivePublicBot] = useState(null);

    const bot = useAppSelector((state) => state.bots.activeBot);

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            botName: bot?.botname || '',
            description: bot?.description || '',
            prompt: bot?.prompt || '',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        try {
            console.log('1')
            const formData = new FormData();
            formData.append("botname", data.botName);
            formData.append("prompt", data.prompt);
            formData.append("description", data.description);
            formData.append("BotId", String(bot?.id));
            updateBot(formData)
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
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={hideModal}>
                    <EvilIcons name="close" size={30} color="#F5F5F5" />
                </TouchableOpacity>
            </View>
            <Text style={styles.updateText}>Edit Manager</Text>
            <Text style={styles.title}>Name</Text>
            <Controller
                control={control}
                name="botName"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.botName && <Text style={styles.error}>{errors.botName.message}</Text>}

            <Text style={styles.title}>Prompt</Text>
            <Controller
                control={control}
                name="prompt"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Prompt"
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.prompt && <Text style={styles.error}>{errors.prompt.message}</Text>}

            <Text style={styles.title}>Desciprition</Text>
            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
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
    iconContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
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

export default EditBotModal;
