import React from 'react';
import { Avatar } from 'react-native-paper';

type Props = {
    image?: string;
    size?: number;
}

export default function AvatarContainer({ image, size }: Props) {
  if (!image) {
    return './assets/images/user.jpg'; 
  }

  return (
    <Avatar.Image 
      size={size} 
      source={require('../../../assets/images/user.jpg')}
      style={{backgroundColor: '#fff' }} 
    />
  );
}
