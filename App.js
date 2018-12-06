import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Button,
  PermissionsAndroid,
} from "react-native"
import Contacts from "react-native-contacts"
import ContactsListWithButton from "./Components/ContactsListWithButton"

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      isButtonPressed: false
    }
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
    const { isButtonPressed, contacts } = this.state

    return (
      <View>
        {!isButtonPressed && (
          <Button title="Get contacts" onPress={this.onButtonPressed} />
        )}

        {isButtonPressed && <ContactsListWithButton contacts={contacts} />}
      </View>
    )
  }

  onButtonPressed = () => {
    Contacts.getAll((err, contacts) => {
      if (err) throw err

      const newContacts = contacts.map(
        item => `${item.familyName} ${item.givenName}`
      )

      this.setState({
        isButtonPressed: true,
        contacts: newContacts
      })
    })
  }
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
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
}) */
