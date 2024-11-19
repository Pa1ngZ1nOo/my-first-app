import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker"
import { Event } from '../app/stopwatch'
import AntDesign from '@expo/vector-icons/AntDesign';

type EventInputProps = {
  addNewEvent : ({name,date} : Event) => void;
}

const EventInput = ({addNewEvent}: EventInputProps) => {
    const [eventName, setEventName] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date())
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const datePickerHandler = (e : DateTimePickerEvent, d : Date | undefined) => {
      // console.log(e.type)
      if(e.type==="set"){
        const currentDate = d || date;
        if(currentDate > new Date()){
          setDate(currentDate);
          // console.log(currentDate)
        }else{
          Alert.alert("Invalid date","Please select a future date")
        }
      }
      setShowPicker(false);
    }

  const addNewEventHandler = () => {
    if(eventName.trim().length===0){
      Alert.alert("Event name is required","Please enter a name for the event")
      return
    }

    addNewEvent({name: eventName, date, id: Math.random().toString()});
    setEventName("")
    setDate(new Date())
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD NEW EVENT</Text> 
        <View style={styles.inputContainer}>
          <TextInput style={styles.eventInput} placeholder='Enter event name' value={eventName} onChangeText={setEventName} />
          <Pressable style={styles.icon} hitSlop={20} onPress={()=>setShowPicker(true)}>
            <AntDesign name="calendar" size={30} color="#fff" />
          </Pressable>
        </View>
        {
          showPicker && (
            <DateTimePicker value={date} mode='date' display='default' onChange={datePickerHandler}/>
          )
        }
        <Pressable style={styles.btnSubmit} onPress={addNewEventHandler}>
          <Text style={styles.btnText}>Add Event</Text>
        </Pressable>
    </View>
  )
}

export default EventInput

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      width: "100%",
      padding: 16,
      marginBottom: 20,
      // backgroundColor: "blue"
    },
    inputContainer: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",     
      justifyContent: "center",
      gap: 6,
      marginBottom: 10,
    },
    btnSubmit: {
      padding: 8,
      // borderWidth: 1,
      // borderColor: '#000',
      backgroundColor: "#000",
      borderRadius: 20,
      marginVertical: 10
    },
    btnText: {
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14
    },
    icon: {
      backgroundColor: "#000",
      padding: 6,
      borderRadius: 6
    },
    title: {      
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,      
      // textAlign: "center"
    },
    eventInput: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        // marginBottom: 10
    }
})