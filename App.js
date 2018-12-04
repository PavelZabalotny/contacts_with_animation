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
  PermissionsAndroid,
  SectionList,
  Animated,
  ScrollView
} from "react-native"
import Contacts from "react-native-contacts"
import ContactsList from "./Components/ContactsList"

export default class App extends Component {
  state = {
    isButtonPress: false,
    //contacts: [],
    listA: [],
    listB: [],
    titles: ["titleA", "titleB"],
    contacts: [],
    TitleA: true,
    TitleB: true,
    fadeAnim: new Animated.Value(1)
    //isHidden: false
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
    const {
      isButtonPress,
      listA,
      listB,
      TitleA,
      TitleB,
      fadeAnim,
      titles,
      contacts
    } = this.state
    const a = TitleA ? listA : []
    const b = TitleB ? listB : []

    //newContacts = contacts.map(item => `${item.familyName} ${item.givenName}`)

    /* const listA = newContacts.slice(0, 10)
    const listB = newContacts.slice(10) */

    return (
      <View style={styles.container}>
        <Button
          onPress={this.onPressGetContacts}
          title="Get contacts"
          color="#841584"
          accessibilityLabel="Get contacts from your phone"
        />
        {isButtonPress ? (
          <ScrollView>
            {/* <SectionList
                sections={[
                  { title: "TitleA", data: a },
                  { title: "TitleB", data: b }
                ]}
                renderSectionHeader={({ section: { title } }) => (
                  <Text
                    style={styles.header}
                    onPress={this.onTitlePressed(title)}
                  >
                    {title}
                  </Text>
                )}
                renderItem={({ item }) => (
                  <Animated.View style={{opacity: fadeAnim}}>
                    <Text style={styles.contacts}>{item}</Text>
                  </Animated.View>
                )}
                keyExtractor={(item, index) => index}
              /> */}
            {titles.map((item, index) => (
              <ContactsList title={item} key={index} contacts={contacts} />
            ))}
          </ScrollView>
        ) : (
          <Text>Press button to get contacts</Text>
        )}
      </View>
    )
  }

  onTitlePressed = title => () => {
    const { fadeAnim } = this.state
    console.log(title)

    Animated.timing(
      // Animate over time
      fadeAnim, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 10 // Make it take a while
      }
    ).start()

    this.setState({
      [title]: !this.state[title]
    })
  }

  onPressGetContacts = () => {
    this.setState({
      isButtonPress: true
    })

    Contacts.getAll((err, contacts) => {
      if (err) throw err

      newContacts = contacts.map(item => `${item.familyName} ${item.givenName}`)

      // contacts returned
      console.log(newContacts)

      this.setState({
        contacts: newContacts
      })
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
})
