import React from 'react'
import { KeyboardAvoidingView, TextInput, Text, View, TouchableOpacity } from 'react-native'
import { styles } from './styles/styles';

export default class TimeForm extends React.Component {
  state = {
    workMins: '',
    workSecs: '',
    restMins: '',
    restSecs: '',
    isFormValid: false,
  }

  getHandler = key => val => {
    if (+val >= 0 && +val < 60) {
      this.setState({ [key]: val })
    }
    if (this.state.workMins >= 0 && this.state.workMins < 25
      && this.state.workSecs >= 0 && this.state.workSecs < 60
      && this.state.restMins >= 0 && this.state.restMins < 10
      && this.state.restSecs >= 0 && this.state.restSecs < 60) {
      this.setState({ isFormValid: true })
    } else {
      this.setState({ isFormValid: false })
    }
  }

  handleWorkMinChange = this.getHandler('workMins')
  handleWorkSecsChange = this.getHandler('workSecs')
  handleRestMinChange = this.getHandler('restMins')
  handleRestSecsChange = this.getHandler('restSecs')

  handleSubmit = () => {
    console.log("submit")
    let workTime = +this.state.workMins * 60 + +this.state.workSecs;
    let restTime = +this.state.restMins * 60 + +this.state.restSecs;
    this.props.onSubmit(workTime, restTime)
  }

  hideForm = () => {
    this.props.showForm();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Text style={styles.text}>Change Time Intervals</Text>
        <View style={styles.inlineView}>
          <Text style={styles.text, styles.textSpans}>minutes</Text>
          <Text style={styles.text, styles.textSpans}>seconds</Text>
        </View>
        <View style={styles.inlineView}>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={this.state.workMins}
            onChangeText={this.handleWorkMinChange}
            placeholder="work mins"
          />
          <Text style={styles.textForm}>:</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={this.state.workSecs}
            onChangeText={this.handleWorkSecsChange}
            placeholder="work secs"
          />
        </View>
        <View style={styles.inlineView}>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={this.state.restMins}
            onChangeText={this.handleRestMinChange}
            placeholder="rest mins"
          /><Text style={styles.textForm}>:</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={this.state.restSecs}
            onChangeText={this.handleRestSecsChange}
            placeholder="rest secs"
          />
        </View>
        <TouchableOpacity onPress={this.handleSubmit} disabled={!this.state.isFormValid} >
          <Text style={styles.lessButtonStyle}>Submit</Text>
        </TouchableOpacity >
        <TouchableOpacity onPress={this.hideForm}>
          <Text style={styles.backButtonStyle}>Back</Text>
        </TouchableOpacity >
      </KeyboardAvoidingView>
    )
  }
}
