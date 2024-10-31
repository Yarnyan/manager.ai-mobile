import React, { useState, forwardRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Button } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { isApiError } from '@/helpers/auth/apiError';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useAddTelegtamBotMutation, useAuthBotMutation, useLazyGetStatusQuery } from '@/module/profile/api/bot';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    hideTelegramModal: () => void;
};

type Inputs = {
    Phone?: string;
    Key?: string;
    Hash?: string;
    Code?: string;
};

const TelegramBotModal = forwardRef(({ hideTelegramModal }: Props, ref) => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [OTPCodeIsOpen, setOTPCodeIsOpen] = useState(false);
    const [statusBot, setStatusBot] = useState(null);

    const [addBot, { isLoading: isAddBotLoading }] = useAddTelegtamBotMutation();
    const [authBot, { isLoading: isAuthBotLoading }] = useAuthBotMutation();
    const [getStatus, { isLoading: isGetStatusLoading }] = useLazyGetStatusQuery();

    const [bot, setBot] = useState({});

    const schema = yup.object().shape({
        Phone: yup.string().required(),
        Key: yup.string().required(),
        Hash: yup.string().required(),
        Code: yup.string(),
    });

    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('BotId', bot?.id || '');
            formData.append('PHONE', data.Phone || '');
            formData.append('API_ID', data.Key || '');
            formData.append('API_HASH', data.Hash || '');

            if (message !== "Bot created, code no need") {
                if (OTPCodeIsOpen) {
                    formData.append('Code', data.Code || '');
                }
            }

            if (!OTPCodeIsOpen) {
                const addBotResponse = await addBot(formData).unwrap();
                setMessage(addBotResponse.message);
                if (addBotResponse.message !== "Bot created, code no need") {
                    setOTPCodeIsOpen(true);
                } else {
                    reset();
                }
            } else {
                setMessage('Success');
                reset();
                const authBotResponse = await authBot(formData).unwrap();
            }
        } catch (error: any) {
            if (error.originalStatus === 400) {
                setError(error.data);
            } else if (isApiError(error)) {
                setError(error.data.message);
            }
        }
    };

    useEffect(() => {
        AsyncStorage.getItem('activePublicBot').then((value) => {
            if (value) {
                setBot(JSON.parse(value));
            }
        });
    }, []);

    useEffect(() => {
        if (bot?.id) {
            getStatus(bot.id).then((res) => {
                console.log(res, res.data)
                setStatusBot(res.data.detail);
            });
        }
    }, [bot?.id, getStatus]);

    const isLoading = isGetStatusLoading;

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={hideTelegramModal}>
                    <EvilIcons name="close" size={30} color="#F5F5F5" />
                </TouchableOpacity>
            </View>
            <Text style={styles.updateText}>Telegram connect</Text>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    {/* <CircularProgress /> */}
                </View>
            ) : (
                <>
                    {statusBot === false ? (
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Phone number</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Phone number"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            placeholderTextColor={'#F5F5F5'}
                                        />
                                    )}
                                    name="Phone"
                                    rules={{ required: true }}
                                />
                                {errors.Phone && <Text style={styles.error}>{errors.Phone.message}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Api key</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Key"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            placeholderTextColor={'#F5F5F5'}
                                        />
                                    )}
                                    name="Key"
                                    rules={{ required: true }}
                                />
                                {errors.Key && <Text style={styles.error}>{errors.Key.message}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Api hash</Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Hash"
                                            value={value}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            placeholderTextColor={'#F5F5F5'}
                                        />
                                    )}
                                    name="Hash"
                                    rules={{ required: true }}
                                />
                                {errors.Hash && <Text style={styles.error}>{errors.Hash.message}</Text>}
                            </View>

                            {OTPCodeIsOpen && (
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Code</Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Code"
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                placeholderTextColor={'#F5F5F5'}
                                            />
                                        )}
                                        name="Code"
                                    />
                                    {errors.Code && <Text style={styles.error}>{errors.Code.message}</Text>}
                                </View>
                            )}

                            <View style={styles.buttonContainer}>
                                <Button
                                    mode="contained"
                                    buttonColor="#fff"
                                    textColor="black"
                                    onPress={handleSubmit(onSubmit)}
                                    style={styles.button}
                                >
                                    Save
                                </Button>
                            </View>
                            {error && <Text style={styles.error}>{error}</Text>}
                            {message && <Text style={styles.success}>{message}</Text>}
                        </View>
                    ) : (
                        <Text style={styles.success}>The bot is connected</Text>
                    )}
                </>
            )}
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
    updateText: {
        color: '#F5F5F5',
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    title: {
        color: '#F5F5F5',
        fontSize: 16,
        marginBottom: 8,
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        color: '#F5F5F5',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#424242',
        color: '#FFF',
        borderRadius: 8,
        padding: 10,
        width: '100%',
    },
    error: {
        color: 'red',
        marginBottom: 8,
        textAlign: 'center',
    },
    success: {
        color: 'green',
        marginBottom: 8,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#F5F5F5',
        color: '#FFFFFF',
        borderRadius: 8,
        padding: 4,
        width: '100%',
    },
    loaderContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TelegramBotModal;