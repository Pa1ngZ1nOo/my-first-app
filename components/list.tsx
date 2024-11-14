import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '../theme';

type ListProps = {
    id: string
    message : string
    isDone : boolean
    changeStatus: (id:string)=>void;
    undoStatus: (id:string)=>void;
}

const List = ({id,message,isDone, changeStatus, undoStatus}:ListProps) => {
  return (
    <View style={[
        styles.container,        
        isDone? {backgroundColor: theme.mintGray} : undefined        
    ]
    }>
        <Text style={[
            styles.text,
            {
                color: isDone? "gray":undefined, textDecorationLine: isDone? "line-through": undefined
            }            
            ]}>{message}</Text>
        {
            isDone? <AntDesign name="checkcircleo" size={24} color="black" onPress={()=> undoStatus(id)} /> : <AntDesign name="closecircleo" size={24} color="green" onPress={()=>changeStatus(id)}/>
        }
    </View>
  )
}

export default List;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,        
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        // backgroundColor: "red",
        width: "100%",
        paddingHorizontal: 20,
        borderBottomColor: theme.mintGray,
        borderBottomWidth: 1,       
        // backgroundColor: theme.mintGray,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 6
    }
})