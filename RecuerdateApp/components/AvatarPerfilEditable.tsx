import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/themed'

interface AvatarProps {
  info:{
        img : String
  }
}

const AvatarPerfilEditable: React.FC<AvatarProps>  = ({info}) => {

  return (
        <Avatar
          size={160}
          rounded
          source={{ uri: `${info.img}` }}
          title="Avatar"
        >
        <Avatar.Accessory size={44} />

        </Avatar>
  )
}

export default AvatarPerfilEditable