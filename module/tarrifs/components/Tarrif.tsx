import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { splitFormatText } from '@/helpers/splitText/split';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useBuySubsMutation } from '../api/tarris';

type Props = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export default function Tarrif({ id, name, price, description }: Props) {
  const [buySubscribe] = useBuySubsMutation();

  const buySubs = (id: number) => {
    const formData = new FormData();
    formData.append('subId', id.toString());
    buySubscribe(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>Subscriptions are suitable for both companies and users</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price} €</Text>
        <Text style={styles.priceLabel}>per month</Text>
      </View>
      <TouchableOpacity onPress={() => buySubs(id)} style={styles.button}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
      <Text style={styles.extraText}>Everything in {name}, plus:</Text>
      <View style={styles.descriptionContainer}>
        {splitFormatText(description).map((item: string, index: number) => (
          <View key={index} style={styles.checkItem}>
            <AntDesign name="check" size={14} color="#a2a2ac" />
            <Text style={styles.checkText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 24,
    backgroundColor: '#131316',
    borderRadius: 16,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#fafafa',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#a2a2ac',
    textAlign: 'center',
  },
  priceContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    color: '#fafafa',
  },
  priceLabel: {
    fontSize: 16,
    color: '#a2a2ac',
  },
  button: {
    marginTop: 16,
    minWidth: 120,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  extraText: {
    marginTop: 16,
    color: '#fafafa',
  },
  descriptionContainer: {
    marginTop: 16,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#a2a2ac',
  },
});
