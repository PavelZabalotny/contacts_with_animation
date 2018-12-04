import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableHighlight
} from "react-native"

export default class Contacts extends Component {
  state = {
    height: new Animated.Value(100)
  }

  render() {
    const { title, contacts } = this.props
    newContacts =
      title === "titleA" ? contacts.slice(0, 10) : contacts.slice(10)
    return (
      <View>
        <TouchableHighlight onPress={this.onTitlePressed}>
          <Text style={styles.title}>{title}</Text>
        </TouchableHighlight>
        <Animated.View style={{height: this.state.height}}>
            {newContacts.map((item, index) => (
              <Text style={styles.contacts} key={index}>
                {item}
              </Text>
            ))}
        </Animated.View>
      </View>
    )
  }

  onTitlePressed = () => {
    const { height } = this.state
    const { title } = this.props

    console.log(title)

    Animated.timing(height, {
      toValue: 0,
      duration: 2000
    }).start()

    /* this.setState({
      [title]: !this.state[title]
    }) */
  }
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#CDDC39",
    fontSize: 20,
    padding: 5,
    color: "#fff"
  },
  contacts: {
    fontSize: 15,
    padding: 5,
    color: "#000",
    backgroundColor: "#F5F5F5"
  }
})
