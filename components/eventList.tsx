import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Event } from '../app/stopwatch'
import EventItem from './eventItem'

type EventListProps = {
  events : Event[]
}

const EventList = ({events}: EventListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList data={events} renderItem={({item})=> <EventItem event={item}/>}/>
    </View>
  )
}

export default EventList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    // backgroundColor: "red"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10    
  }
})