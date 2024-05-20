import { Avatar } from '@rneui/themed';
import React from 'react';
import { Pressable } from 'react-native';

interface AvatarProps {
  info: {
    img: string;
  };
  onPress: () => void;
}

const AvatarPerfilEditable: React.FC<AvatarProps> = ({ info, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Avatar
        size={160}
        rounded
        source={{ uri: `${info.img}` }}
        title="Avatar"
      >
        <Avatar.Accessory size={44} />
      </Avatar>
    </Pressable>
  );
}

export default AvatarPerfilEditable;