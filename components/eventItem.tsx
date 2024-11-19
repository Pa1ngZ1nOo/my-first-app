import React from 'react'
import { Event } from '../app/stopwatch'
import { StyleSheet, Text, View } from 'react-native'
import {format} from 'date-fns'

type EventItemProps = {
    event : Event
}

const EventItem = ({event} : EventItemProps) => {
    const {name, date} = event;
  return (
    <View>
        <Text style={styles.label}>{name}</Text>
        <Text style={styles.date}>{format(date, "yyyy-MM-dd")}</Text>
    </View>
  )
}

export default EventItem

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 6
    },
    date: {
        fontSize: 16,
        marginBottom: 6,
        color: "gray"
    }
});