import { Image, StyleSheet, Platform } from 'react-native';
import { View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Form from '@/module/create/form';

export default function ScreetScreen() {
  return (
    <View style={styles.container} >
      <Form />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
});
