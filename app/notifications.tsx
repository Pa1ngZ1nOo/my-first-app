import React from 'react'
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { pushNotificationsAsync } from '../utils/push-notifications-async';
import * as Notifications from "expo-notifications";

const Creation = () => {

  const trigger = new Date(Date.now() + 5 * 1000);

  const pushNotification = async () => {
    const result = await pushNotificationsAsync();
    // console.log(result);
    if(result === "granted"){      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Notification Testing from Button Click!"
        },
        trigger: null,
      })
      // let d = (new Date()).getSeconds();
      // console.log("Seconds : ", d);
      // console.log("Notification Sent Successfully!")
      // const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      // console.log(scheduledNotifications);
    }else {
      Alert.alert("Permission Denied","You need to enable notifications in the app settings to use this feature")
    }
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={pushNotification}>
          <Text style={styles.label}>Push Notification</Text>
        </TouchableOpacity>
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