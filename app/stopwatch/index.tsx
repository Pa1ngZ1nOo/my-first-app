import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EventInput from '../../components/eventInput';
import EventList from '../../components/eventList';
import CountDownTimer from '../../components/countDownTimer';


const STORAGE_KEY = "@events";
export type Event = {
    id: string,
    name: string,
    date: Date
}

const StopWatch = () => {
    const [events, setEvents] = useState<Event[]>([])

    const addNewEvent = (event : Event) => {
        const updatedEvents = [...events, event];
        setEvents(updatedEvents);
    }

    return (
        <View style={styles.container}>
            <EventInput addNewEvent={addNewEvent}/>
            <CountDownTimer event={events[0]}/>
            <EventList events={events}/>
        </View>
    )
}

export default StopWatch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})