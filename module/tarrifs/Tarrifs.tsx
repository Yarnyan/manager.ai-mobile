import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import Tarrif from './components/Tarrif';
import { ITarrif } from './entity/tarrif';
import { useLazyGetSubsQuery } from './api/tarris';
import { useFocusEffect } from 'expo-router';

export default function Tarrifs() {
    const [getSubs, { data: subsData }] = useLazyGetSubsQuery();

    useFocusEffect(
        useCallback(() => {
            getSubs(null).catch((error) => {
                console.error("Error fetching subscriptions:", error);
            });
        }, [getSubs])
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Tarrifs</Text>
                {subsData?.map((tarrif: ITarrif) => (
                    <Tarrif
                        key={tarrif.id}
                        id={tarrif.id}
                        name={tarrif.name}
                        price={tarrif.price}
                        description={tarrif.description}
                    />
                ))}
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 30,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '300',
        color: '#fafafa',
        textAlign: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
    },
});
