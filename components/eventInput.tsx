import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker"
import { Event } from '../app/stopwatch'

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
        <TextInput style={styles.eventInput} placeholder='Enter event name' value={eventName} onChangeText={setEventName} />
        <Pressable style={styles.btn} onPress={()=>setShowPicker(true)}>
          <Text style={styles.btnText}>SELECT EVENT DATE AND TIME</Text>
        </Pressable>
        {
          showPicker && (
            <DateTimePicker value={date} mode='date' display='default' onChange={datePickerHandler}/>
          )
        }
        <Pressable style={styles.btnSubmit} onPress={addNewEventHandler}>
          <Text style={[styles.btnText,{color: "#000"}]}>Add Event</Text>
        </Pressable>
    </View>
  )
}

export default EventInput

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      padding: 16,
      // backgroundColor: "blue"
    },
    btn: {
      padding: 10,
      backgroundColor: "#000",
      borderRadius: 20
    },
    btnSubmit: {
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 20,
      marginVertical: 10
    },
    btnText: {
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14
    },
    title: {      
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,      
      // textAlign: "center"
    },
    eventInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginBottom: 10
    }
})