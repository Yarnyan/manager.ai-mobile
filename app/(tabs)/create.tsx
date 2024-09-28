import { Image, StyleSheet, Platform } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Form from '@/module/create/form';

export default function ScreetScreen() {
  return (
    <ThemedView style={styles.container}>
      <Form />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
});
