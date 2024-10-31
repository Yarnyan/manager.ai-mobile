import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { TextArea } from 'native-base';
import { useCreateBotMutation } from '../banners/api/banners';
import { useRouter } from 'expo-router';
const Form = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [createBot] = useCreateBotMutation();
    const [responseText, setResponseText] = useState('');
    const handleSubmit = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('botName', name);
        formData.append('botDescription', description);
        formData.append('BotPrompt', prompt);
        try {
            const response = createBot(formData).unwrap();
            router.replace('/profile')
        } catch (error) {
            console.log(error)
        } finally {
            setName('');
            setDescription('');
            setPrompt('');
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.items}>
                <Text style={styles.text}>Create manager</Text>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput}>Name</Text>
                        <TextInput style={styles.input}
                            activeUnderlineColor='#303136'
                            value={name}
                            onChangeText={text => setName(text)}
                            placeholder="Enter Name"
                            placeholderTextColor="#bfbfbf"
                            textColor='white'
                            cursorColor="#ffffff"
                            underlineColorAndroid={'transparent'}
                            underlineColor='transparent'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput}>Description</Text>
                        <TextArea
                            value={description}
                            onChangeText={text => setDescription(text)}
                            placeholder="Enter Description"
                            placeholderTextColor="#bfbfbf"
                            style={[styles.input, styles.textArea]}
                            w="100%"
                            h={20}
                            autoCompleteType="off"
                            borderColor="transparent"
                            focusOutlineColor="transparent"
                            color="white"
                            selectionColor="white"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textInput}>Prompt</Text>
                        <TextArea
                            value={prompt}
                            onChangeText={text => setPrompt(text)}
                            placeholder="Enter Description"
                            placeholderTextColor="#bfbfbf"
                            style={[styles.input, styles.textArea]}
                            w="100%"
                            h={20}
                            autoCompleteType={'off'}
                            borderColor={'transparent'}
                            focusOutlineColor={'transparent'}
                            color={'white'}
                            selectionColor="white"
                        />
                    </View>
                    <Button
                        mode="contained"
                        buttonColor='#fff'
                        textColor='black'
                        onPress={handleSubmit}
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading ? <ActivityIndicator color="#ffffff" /> : 'Continue'} { }
                    </Button>
                    <Text style={styles.text}>{responseText}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    items: {
        width: '100%',
        top: '10%',
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fafafa',
        textAlign: 'center',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 30,
    },
    form: {
        width: '100%',
        marginTop: 20,
        height: '100%',
    },
    input: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#303136',
        borderRadius: 5,
        height: 40,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 20,
        color: '#fafafa',
    },
    inputContainer: {
        width: '100%',
    },
    textInput: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 5,
        lineHeight: 20,
        color: '#fafafa',
    },
    button: {
        marginTop: 10,
        height: 42,
        width: '100%',
    }
})

export default Form;
