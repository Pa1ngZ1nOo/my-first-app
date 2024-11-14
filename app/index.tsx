import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View, Alert, StatusBar, TextInput, ScrollView, FlatList } from 'react-native';
import List from '../components/list';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { theme } from '../theme';
import { getData, storeData } from '../utils/storage';

type TodoListType = {
  id: string,
  message: string,
  isDone: boolean
}

// const staticTodos: TodoListType[] = [
//   {
//     id: "1",
//     message: "Wake Up",
//     isDone: false
//   },
//   {
//     id: "2",
//     message: "Go To Work",
//     isDone: true
//   },
//   {
//     id: "3",
//     message: "Go To Code",
//     isDone: false
//   },
//   {
//     id: "4",
//     message: "Go To Sleep",
//     isDone: false
//   }
// ]

// const tempArray: TodoListType[] = new Array(500).fill(null).map(
//   (item, index) => {
//     return {
//       id: String(index+1),
//       message: String(index+1),
//       isDone: false
//     }
//   }
// )

const KEY="todo-app";

export default function App() {
  const [inputVal, setInputVal] = useState<string>("")
  const [todos, setTodos] = useState<TodoListType[]>([]);

  const changeStatus = async (id:string) =>{
    setTodos(prevState=>prevState.map((td)=>(td.id===id?{...td,isDone:true}:td)))
    await storeData(todos);
  }

  const undoStatus = (id:string) => {
    Alert.alert("Undo Status","Are you sure?",[
      {
        text: "Cancel",
        onPress: ()=> {},
        style: "cancel"
      },
      {
        text: "Yes",
        onPress:async () => {
          setTodos((prevState)=>prevState.map((td)=>td.id===id?{...td,isDone: false}: td))
          await storeData(todos)
          //console.log(todos);
        }
      }
    ])
  }

  const addNewTodo = async () => {
    console.log(inputVal);
    const newTodos=[
      ...todos,
      {
      id:String(todos.length + 1),
      message:inputVal,
      isDone: false
    }
    ];
    // console.log(newTodos)
    setTodos(newTodos)    
    await storeData(newTodos);       
    setInputVal("")
  }

  useEffect(()=>{
    const getTodoData = async ()=> {
      const todoData = await getData(KEY);
      setTodos(todoData)
    };

    getTodoData();
  },[])

  return (
    <View style={styles.container} >
      <View style={
        {
          width: "100%",
          paddingHorizontal: 10,  
          backgroundColor: "white"        
        }
      }>
        <TextInput placeholder='eg. Go to code' onChangeText={(val)=>setInputVal(val)} onSubmitEditing={addNewTodo} style={styles.inputBox} value={inputVal}/>
      </View>
    {/* <Link href={"/stopwatch"}>Go to stopwatch app</Link>       */}
      <View style={styles.listContainer}>
        {/* {
          todos.map(td=>(
            <List key={td.id} {...td} changeStatus={changeStatus} undoStatus={undoStatus}/>
          ))
        } */}
        <FlatList ListEmptyComponent={<View><Text style={styles.text}>No to for now.</Text></View>} data={todos} renderItem={({item})=>{
          // console.log(item);
          return <List changeStatus={changeStatus} undoStatus={undoStatus} {...item}/>}} keyExtractor={(item)=>item.id} />
      </View>        
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"}/>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    gap: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'  
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "gray"
  },
  titleText: {    
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    // flex: 2,
    // backgroundColor: "red"  
  },
  listContainer: {
    flex: 1,
    gap: 2,
    marginTop: 10,
    marginHorizontal: 10
  },
  inputBox: {
    borderColor: theme.mintGray,
    borderWidth: 2,
    borderRadius: 8,
    padding: 6,
    marginVertical: 2,
    width: "100%"
  },
  // btnText: {
  //   color: 'white',
  //   fontSize: 20
  // },
  // btn: {
  //   padding: 10
  // }
});