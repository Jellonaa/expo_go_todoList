import { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";

export default function Add({add}) {
    const [name, setName] = useState('')

    const save = () => {
        add(name)
        setName('')
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.container} value={name} onChangeText={text => setName(text)} placeholder="Enter task" />
            <Button title="Save" onPress={() => save(name)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        alignItems: 'flex-end',
    },
})