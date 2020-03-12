import { ListItem } from 'react-native-elements'
import React, {Component} from 'react';


let ListItems = ({ item }) => (
    <ListItem
        title={item.name}
        subtitle={item.subtitle}
        leftIcon={{ name: item.icon }}
        rightSubtitle={item.rightSubtitle}
        onPress={console.log('pressed')}
        bottomDivider
        chevron
    />
)

export default ListItems;