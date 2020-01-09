// import React, { Component } from 'react';
// import { Text, Button, View } from 'react-native';
// import { increment, decrement, updateCoordinates } from '../actions/index.js';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import store from '../App'
// import * as TaskManager from "expo-task-manager";
//
// const LOCATION_TASK_NAME = 'background-location-task-final'
//
// class Counter extends Component{
//   render(){
//     console.log(this.props.coordinate.latitude);
//     console.log(this.props.coordinate.longitude);
//     return(
//       <View>
//                             <Text style = {{fontSize: 20, fontWeight: 'bold'}}>
//                                 {this.props.count}
//                             </Text>
//                         <Button onPress= {() => this.props.increment()} title={'Increment'}>
//                              <Text>Increment</Text>
//                          </Button>
//                          <Button onPress= {() => this.props.decrement()} title={'Decrement'}>
//                               <Text>Decrement</Text>
//                           </Button>
//           <Text>Lat:  {this.props.coordinate.latitude}</Text>
//           <Text>Lng:  {this.props.coordinate.longitude}</Text>
//           <Button onPress= {() => this.props.updateCoordinates()} title={'Update'}>
//               <Text>Update</Text>
//           </Button>
//             </View>
//     );
//   }
// }
//
// function mapStateToProps(state){
//     console.log(state);
// return{
//  count : state.count, coordinate : state.coordinate
// };
// }
// function matchDispatchToProps(dispatch){
// return bindActionCreators({increment: increment, decrement: decrement,updateCoordinates : updateCoordinates}, dispatch)
// }
// export default connect(mapStateToProps, matchDispatchToProps)(Counter);
//
// TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
//     if (error) {
//         console.error(error)
//         return
//     }
//     if (data) {
//         const { latitude, longitude } = {longitude : 40,latitude : 40};
//         store.dispatch(updateCoordinates({ latitude, longitude }))
//         console.log(data);
//
//     }
// })
