import { Avatar } from '@rneui/themed';
import React from 'react';

interface AvatarProps {
  info: {
    img: string  // Cambiamos el tipo de dato a string o number
  };
  onPress: () => void;
}

const AvatarPerfilEditable: React.FC<AvatarProps> = ({ info, onPress }) => {
  // Verificar la URL de la imagen
  console.log("URL de la imagen:", info.img);

  return (
      <Avatar
        size={160}
        rounded
        source={typeof info.img === 'string' ? { uri: `${info.img}` } : info.img} // Manejamos la imagen default
        title="Avatar"
      >
        <Avatar.Accessory size={44} onPress={onPress} />
      </Avatar>

  );
}

export default AvatarPerfilEditable;
