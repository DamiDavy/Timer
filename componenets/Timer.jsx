import * as React from 'react'
import { Text, View, TouchableOpacity, } from 'react-native'
import { styles } from './styles/styles'

export default class Work extends React.Component {

  state = {
    seconds: this.props.preparingTime,
    timeToWork: false,
    oneMoreWorkInterval: false,
    timeToWorkSomeMore: false,
    firstStart: true,
  }

  toggleFirstStart = (a) => {
    this.setState({ firstStart: a });
  }

  toggleOneMoreWorkInterval = (bool) => {
    this.setState({ oneMoreWorkInterval: bool });
  }

  toggleWorkFlow = () => {
    this.setState(prevState => ({ timeToWork: !prevState.timeToWork }))
  }

  decrementCount = () => {
    if (this.state.seconds === 0) {
      if (this.state.firstStart) {
        this.setState(prevState => ({ seconds: prevState.seconds + this.props.workTime }))
        this.toggleFirstStart(false);
        this.toggleWorkFlow();
      }
      else if (this.state.timeToWork && this.state.timeToWorkSomeMore) {
        this.setState(prevState => ({ seconds: prevState.seconds + this.props.restTime }))
        this.toggleWorkFlow();
        this.setState({ timeToWorkSomeMore: false })
      }
      else if (this.state.timeToWork) {
        if (this.state.oneMoreWorkInterval) {
          this.setState(prevState => ({ seconds: prevState.seconds + this.props.workTime }))
          this.setState({ timeToWorkSomeMore: true })
        } else {
          this.setState(prevState => ({ seconds: prevState.seconds + this.props.restTime }))
          this.toggleWorkFlow();
        }
      } else {
        this.setState(prevState => ({ seconds: prevState.seconds + this.props.workTime }))
        this.toggleWorkFlow();
      }
    }
    else {
      if (this.state.seconds === 1) {
        this.props.playSound();
      }
      this.setState(prevState => ({ seconds: prevState.seconds - 1 }))
    }
  }

  startCounting = () => {
    this.props.toggleIsCounting()
    this.timer = setInterval(this.decrementCount, 1000)
  }

  stopCounting = () => {
    this.props.toggleIsCounting();
    clearInterval(this.timer);
  }

  resetCount = () => {
    clearInterval(this.timer)
    this.setState({ seconds: this.props.workTime })
  }

  quitTimer = () => {
    clearInterval(this.timer)
    this.setState({ seconds: this.props.preparingTime, firstStart: true, })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isCounting ?
          <TouchableOpacity onPress={this.stopCounting}>
            <Text style={styles.buttonStyle}>Pause</Text>
          </TouchableOpacity >
          : <Text><TouchableOpacity onPress={this.startCounting}>
            <Text style={styles.buttonStyle}>Start</Text>
          </TouchableOpacity >
            {this.state.timeToWork && this.state.seconds !== this.props.workTime &&
              <TouchableOpacity onPress={this.resetCount}>
                <Text style={styles.buttonStyle}>Reset</Text>
              </TouchableOpacity>}</Text>}

        <Text style={styles.figures}>
          <Text>{Math.floor(this.state.seconds / 60)}</Text>
          <Text>:{this.state.seconds % 60 < 10 ? '0' + this.state.seconds % 60 : this.state.seconds % 60}</Text>
        </Text>

        <Text style={styles.text}>{this.state.firstStart ? "Preparing..." :
          <Text>{this.state.timeToWork ?
            <Text>{this.state.timeToWorkSomeMore ? "Work Some More" : "Time To Work"}</Text> :
            "Time To Breath"}</Text>}</Text>

        <View style={styles.buttonsOnStill}>
          <TouchableOpacity onPress={() => this.props.showForm()}>
            <Text style={styles.lessButtonStyle}>Change Time Intervals</Text>
          </TouchableOpacity >
          {!this.state.oneMoreWorkInterval ?
            <TouchableOpacity onPress={() => this.toggleOneMoreWorkInterval(true)}>
              <Text style={styles.lessButtonStyle}>Add Work Interval</Text>
            </TouchableOpacity > :
            <TouchableOpacity onPress={() => this.toggleOneMoreWorkInterval(false)}>
              <Text style={styles.lessButtonStyle}>One Work Interval</Text>
            </TouchableOpacity>}
          {!this.state.firstStart && <TouchableOpacity onPress={this.quitTimer}>
            <Text style={styles.lessButtonStyle}>Quit</Text>
          </TouchableOpacity >}
        </View>
      </View>
    )
  }
}
