import React, { Component } from 'react';
import {Text,Button,View} from 'react-native';
import { increment, decrement } from '../actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
class Counter extends Component{
  render(){
    return(
      <View>
          <Text>
              {this.props.count}
          </Text>
                        <Button title={'test'} onPress= {() => this.props.increment()}>
                         </Button>
                         <Button title={'test'} onPress= {() => this.props.decrement()}>
                          </Button>
            </View>
    );
  }
}

function mapStateToProps(state){
return{
 count : state.count
};
}
function matchDispatchToProps(dispatch){
return bindActionCreators({increment: increment, decrement: decrement}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Counter);
