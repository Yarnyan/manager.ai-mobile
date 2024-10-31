import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Create = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an assistant</Text>
            <Text style={styles.description}>
                Can't get along with the characters? Create your own! Customize parameters such as his voice, conversation start, tone and much more!
            </Text>
            <Link href="/create" style={styles.button}>
                <View style={styles.buttonContent}>
                    <Ionicons name="star-outline" size={20} color="#000000" />
                    <Text style={styles.buttonText}>Create manager</Text>
                </View>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#fff',
    },
    description: {
        marginTop: 16,
        textAlign: 'center',
        fontSize: 16,
        color: '#a2a2ac',
        width: '80%',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 16,
        justifyContent: 'center',
      },
      buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
      },
    buttonText: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000000',
    },
});

export default Create;
