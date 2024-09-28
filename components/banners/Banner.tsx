import { View, Image, Text, StyleSheet } from 'react-native'
import React from 'react'
import { formatText } from '@/helpers/formatText'

type Props = {
  img: string
  author: string
  name: string
  description: string
  likes?: number
}

const styles = StyleSheet.create({
  container: {
    minHeight: 36,
    padding: 10,
    backgroundColor: '#202024',
    borderRadius: 8,
    flexDirection: 'row',
    width: '100%',
    height: 146,
  },
  image: {
    width: 90,
    height: 114,
    borderRadius: 8
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    lineHeight: 20,
    color: '#fff',
  },
  authorText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#fff',
  }
})

export default function Banner({ img, author, name, description }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.authorText}>Автор: {author}</Text>
        <Text style={styles.descriptionText}>{formatText(description, 150)}</Text>
      </View>
    </View>
  )
}