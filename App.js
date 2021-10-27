import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Work from './componenets/Timer';
import TimeForm from './componenets/TimeForm';
import { styles } from './componenets/styles/styles';
import TimerSound from './componenets/TimerSound';

export default class App extends Component {
  state = {
    counting: false,
    showingForm: false,
    preparingTime: 5,
    workTime: 30,
    restTime: 10,
  }

  toggleIsCounting = () => {
    this.setState(prevState => ({ counting: !prevState.counting }))
  }

  showForm = () => {
    this.setState(prevState => ({ showingForm: !prevState.showingForm }))
  }

  changeIntervals = (workTime, restTime) => {
    this.setState({ showingForm: false, workTime, restTime })
  }

  render() {
    if (this.state.showingForm) return <View style={styles.container}>
      <TimeForm onSubmit={this.changeIntervals} showForm={this.showForm} /></View>
    return (
      <View style={styles.container}>
        <TimerSound
          showForm={this.showForm}
          isCounting={this.state.counting}
          workTime={+this.state.workTime} restTime={+this.state.restTime}
          preparingTime={+this.state.preparingTime}
          toggleIsCounting={this.toggleIsCounting} timeToWork={this.state.timeToWork} />
      </View>
    );
  }
}