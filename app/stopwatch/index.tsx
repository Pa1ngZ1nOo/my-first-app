import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const StopWatch = () => {
    const router = useRouter()

    const gotoOwnApp=()=>{
        console.log("let's go to own app")
        router.navigate("/creation")
    }

  return (
    <View style={styles.container}>
        <Text>StopWatch</Text>
        <TouchableOpacity onPress={gotoOwnApp}>
            <Text>Go to Own App</Text>
        </TouchableOpacity>
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