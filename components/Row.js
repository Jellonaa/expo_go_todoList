import { Pressable, StyleSheet, Text } from "react-native"
import React from "react"

export default function Row({item,selectedID,select,data,storeData}) {
    const textDecorationLine = item.done === true ? 'line-through' : null

    const taskDone = () => {
        select(null)
        if (selectedID == item.id) {
            item.done == true ? item.done = false : item.done = true
        } else {
            select(item.id)
            item.done == true ? item.done = false : item.done = true
        }
        storeData(data)
    }

    return (
        <Pressable style={styles.row} onPress={() => taskDone()}>
            <Text style={[styles.rowText,{textDecorationLine}]}>{item.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowText: {
        fontSize: 16,
        padding: 4,
        margin: 4,
    }
})