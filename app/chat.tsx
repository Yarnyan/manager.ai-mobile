import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatContainer from '@/module/chat/chat';
const Chat = () => {
    return (
        <View style={styles.container}>
            <ChatContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})

export default Chat
