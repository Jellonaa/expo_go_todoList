import { useState, useCallback, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Add from './components/Add';
import uuid from 'react-native-uuid';
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items_key'

export default function App() {
  const [data, setData] = useState([])
  const [selectedID, setSelectedID] = useState(null)

  useEffect(() => {
    //AsyncStorage.clear()
    getData()
  }, [])

  useEffect(() => {
    storeData(data)
  }, [data])

  const select = (id) => {
    setSelectedID(id)
  }

  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name,
      done: false
    }
    const tempData = [...data,newItem]
    setData(tempData)
  },[data])

  const getData = async() => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json == null) {
        json = []
      }
      setData(json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const storeData = async(value) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY,json)
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo list</Text>
      <Add add={add} setData={setData}/>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        extraData={selectedID}
        renderItem={({item}) => (
          <Row
            item={item}
            selectedID={selectedID}
            select={select}
            data={data}
            storeData={storeData}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header : {
    fontSize: 32,
    marginTop: 24
  }
});
