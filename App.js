/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Button,
  PermissionsAndroid
} from "react-native"
import Contacts from "react-native-contacts"

export default class App extends Component {
  state = {
    isButtonPress: false
  }

  async requestContactsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts app",
          message: "Contacts app needs access to your contacts"
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the contacts")
      } else {
        console.log("Contacts permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async requestProfilePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts app",
          message: "Contacts app needs access to your profile"
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the profile")
      } else {
        console.log("Profile permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentDidMount = () => {
    this.requestContactsPermission()
    this.requestProfilePermission()
  }

  render() {
    const { isButtonPress } = this.state

    return (
      <View style={styles.container}>
        <Button
          onPress={this.onPressGetContacts}
          title="Get contacts"
          color="#841584"
          accessibilityLabel="Get contacts from your phone"
        />
        {isButtonPress ? (
          <Text>Contacts</Text>
        ) : (
          <Text>Press button to get contacts</Text>
        )}
      </View>
    )
  }

  onPressGetContacts = () => {
    this.setState({
      isButtonPress: !this.state.isButtonPress
    })

    Contacts.getAll((err, contacts) => {
      if (err) throw err

      // contacts returned
      console.log(contacts)
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
})
