import React, { Component } from "react"
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Animated,
  Easing
} from "react-native"

export default class ContactsListWithButton extends Component {
  anime = {
    height: new Animated.Value(),
    contendHeight: 0,
    expanded: true
  }

  render() {
    const { contacts } = this.props

    if (!contacts.length) {
      return (
        <View>
          <Text>Loading ...</Text>
        </View>
      )
    }

    return (
      <ScrollView>
        <Button onPress={this.toggle} title="Show/Hide the contacts" />

        <Animated.View
          style={{ height: this.anime.height }}
          onLayout={this.animLayout}
        >
          {contacts.map((item, index) => (
            <Text style={styles.contacts} key={index}>
              {item}
            </Text>
          ))}
        </Animated.View>
      </ScrollView>
    )
  }

  getMaxValue = () => this.anime.contendHeight
  getMinValue = () => 0

  animLayout = e => {
    console.log("anim Layout Height = ", e.nativeEvent.layout.height)

    if (this.anime.contendHeight > 0) return

    this.anime.contendHeight = e.nativeEvent.layout.height

    this.anime.height.setValue(
      this.anime.expanded ? this.getMaxValue() : this.getMinValue()
    )
  }

  toggle = () => {
    console.log("Button is pressed")

    Animated.timing(this.anime.height, {
      toValue: this.anime.expanded ? this.getMinValue() : this.getMaxValue(),
      duration: 1000
    }).start()

    this.anime.expanded = !this.anime.expanded
  }
}

const styles = StyleSheet.create({
  header: {
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
