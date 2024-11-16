import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { pushNotificationsAsync } from '../utils/push-notifications-async';
import * as Notifications from "expo-notifications";

const Creation = () => {

  const pushNotification = async () => {
    const result = await pushNotificationsAsync();
    // console.log(result);
    if(result === "granted"){
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Why Every 5 seconds from the Expo Go!"
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5, 
          repeats : false            
        }
      })
    }else {
      Alert.alert("Permission Denied","You need to enable notifications in the app settings to use this feature")
    }
  }

  return (
    <View style={styles.container}>
        <Pressable style={styles.button} onPress={pushNotification}>
          <Text style={styles.label}>Push Notification</Text>
        </Pressable>
    </View>
  )
}

export default Creation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
      padding: 10,
      backgroundColor: "#000",
      borderRadius: 10
    },
    label: {
      color: "#fff",
      fontWeight: "bold"
    }
})