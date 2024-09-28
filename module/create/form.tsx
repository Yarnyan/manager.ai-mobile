import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { TextArea } from 'native-base';

const Form = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
        setLoading(true);
        console.log('Name:', name);
        console.log('Description:', description);
        console.log('Prompt:', prompt);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
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
                            autoCompleteType={'off'}
                            borderColor={'transparent'}
                            selectionColor={'transparent'}
                            focusOutlineColor={'transparent'}
                            color={'white'}
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
        textAlignVertical:'top',
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
        height: 46,
        width: '100%',
    }
})

export default Form;
