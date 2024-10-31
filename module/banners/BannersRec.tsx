import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import LittleBanner from '@/components/banners/LittleBanner';

const BannersRec = () => {
    const banners = useAppSelector((state) => state.bots.allBots);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Recommended</Text>
            <ScrollView 
                horizontal={true} 
                contentContainerStyle={styles.containerBanners} 
                showsHorizontalScrollIndicator={false}
            >
                {banners.slice(0, 3).map((banner, index) => (
                    <LittleBanner
                        key={index}
                        img={'https://www.shutterstock.com/image-vector/cute-robot-character-mascot-vector-600nw-2028708701.jpg'}
                        author={'@Root'}
                        name={banner.botname}
                        description={banner.description}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
        padding: 10,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
    },
    containerBanners: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default BannersRec;
