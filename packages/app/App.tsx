import connect, { sql } from "@databases/expo"
import Constants from "expo-constants"
import * as React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button, Card, TextInput } from "react-native-paper"

const db = connect("dreams.db")

function Items() {
  const [items, setItems] = React.useState(null)

  React.useEffect(() => {
    db.tx(function* (transaction) {
      const result = yield transaction.query(sql`select * from dreams;`)
      setItems(result)
    })
  }, [])

  if (items === null || items.length === 0) {
    return null
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>"hello"</Text>
      {items.map(({ description, food, bowel }) => (
        <Text>{description + " " + food + " " + bowel}</Text>
      ))}
    </View>
  )
}

export default function App() {
  const [dreamText, setDreamText] = React.useState("")
  const [foodText, setFoodText] = React.useState("")
  const [bowelText, setBowelText] = React.useState(0)

  const { forceUpdate, forceUpdateId } = useForceUpdate()

  React.useEffect(() => {
    db.tx(function* (transaction) {
      transaction.query(
        sql`create table if not exists dreams (id integer primary key not null, description text, food text, bowel int);`
      )
    })
  }, [])

  const add = () => {
    db.tx(function* (transaction) {
      console.log("inside the transaction", dreamText, foodText, bowelText)
      yield transaction.query(
        sql`insert into dreams (description, food, bowel) values (${dreamText}, ${foodText}, ${bowelText})`
      )
      const result = yield transaction.query(sql`select * from dreams`)

      console.log(JSON.stringify(result))

      forceUpdate()
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Dream Description"
        value={dreamText}
        onChangeText={(t: string) => setDreamText(t)}
      />

      <TextInput
        label="Food Eaten (comma separated)"
        value={foodText}
        onChangeText={(t: string) => setFoodText(t)}
      />
      <TextInput
        label="How many bowel movement (number)"
        value={bowelText.toString()}
        keyboardType={"numeric"}
        onChangeText={(t: string) => setBowelText(parseInt(t))}
      />
      <Button icon="camera" mode="contained" onPress={() => add()}>
        Press me
      </Button>
      <Card>
        <Items key={`forceupdate-todo-${forceUpdateId}`} />
      </Card>
    </View>
  )
}

function useForceUpdate() {
  const [value, setValue] = React.useState(0)
  return {
    forceUpdate: () => setValue(value + 1),
    forceUpdateId: value
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  }
})
