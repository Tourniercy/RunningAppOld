import { ListItem } from 'react-native-elements'
import moment from "moment";
import 'moment/min/moment-with-locales'
import momentFR from 'moment/locale/fr'
import React, {Component} from 'react';
moment.updateLocale('fr',momentFR );

function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
let ListItems = ({ item , navigation }) => (
    <ListItem
        title={item.distance/1000+' km'}
        subtitle={moment(item.time).format("HH:mm:ss")}
        leftIcon={{ name: 'directions-run',color:"#2C5077" }}
        rightSubtitle={Capitalize(moment(item.createdAt).locale('fr',momentFR ).format("dddd DD/MM/YYYY"))}
        onPress={() => {navigation.navigate('DetailScreen',{data:item})}}
        containerStyle={{borderStyle:"solid",borderTopWidth:0.8}}
        rightSubtitleStyle={{width:110}}
        chevron={{ color: '#2C5077' }}

    />
)

export default ListItems;