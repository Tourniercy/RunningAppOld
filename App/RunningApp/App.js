import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (

      <View>
          <Header
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
          />

          <Input
              placeholder='BASIC INPUT'
          />

          <Input
              placeholder='INPUT WITH ICON'
              leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />

          <Input
              placeholder='INPUT WITH CUSTOM ICON'
              leftIcon={
                  <Icon
                      name='user'
                      size={24}
                      color='black'
                  />
              }
          />

          <Input
              placeholder='INPUT WITH ERROR MESSAGE'
              errorStyle={{ color: 'red' }}
              errorMessage='ENTER A VALID ERROR HERE'
          />
          <Button
              title="Solid Button"
          />

          <Button
              title="Outline button"
              type="outline"
          />

          <Button
              title="Clear button"
              type="clear"
          />

          <Button
              icon={
                  <Icon
                      name="arrow-right"
                      size={15}
                      color="white"
                  />
              }
              title="Button with icon component"
          />

          <Button
              icon={{
                  name: "arrow-right",
                  size: 15,
                  color: "white"
              }}
              title="Button with icon object"
          />

          <Button
              title="Loading button"
              loading
          />

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
