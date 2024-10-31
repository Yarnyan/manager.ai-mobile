import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { formatText } from '@/helpers/formatText'
type Props = {
  img: string
  author: string
  name: string
  description: string
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 2,
    marginRight: 10,
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  textContainer: {
    padding: 10
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
  },
  authorText: {
    fontSize: 12,
    color: 'gray'
  },
  descriptionText: {
    fontSize: 14,
    color: 'gray'
  }
})

export default function LittleBanner({ img, author, name, description }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.authorText}>Автор: {author}</Text>
        <Text style={styles.descriptionText}>{formatText(description, 20)}</Text>
      </View>
    </View>
  )
}