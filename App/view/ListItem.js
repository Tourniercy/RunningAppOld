import { ListItem } from 'react-native-elements'
import React, {Component} from 'react';

let ListItems = ({ item }) => (
    <ListItem
        title={item.name}
        subtitle={item.subtitle}
        leftIcon={{ name: item.icon,color:"#2C5077" }}
        rightSubtitle={item.rightSubtitle}
        onPress={() => {alert('pressed')}}
        containerStyle={{borderStyle:"solid",borderTopWidth:0.8}}
        rightSubtitleStyle={{width:110}}
        chevron={{ color: '#2C5077' }}

    />
)

export default ListItems;