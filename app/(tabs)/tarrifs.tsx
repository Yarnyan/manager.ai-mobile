import { useState } from 'react'
import { StyleSheet, Platform, ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import Tarrifs from '@/module/tarrifs/Tarrifs';
export default function TarrifsScreen() {

  return (
    <View style={styles.container}>
      <ScrollView>
        <Tarrifs />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
})