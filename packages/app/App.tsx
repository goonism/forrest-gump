import * as React from "react";
import { Card, TextInput, Button } from "react-native-paper";
import * as SQLite from "expo-sqlite";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("dreamyolo.db");
  return db;
}
const db = openDatabase();

function Items() {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from dreams;`, null, (_, { rows }) =>
        setItems(rows._array)
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>"hello"</Text>
      {items.map(({ description, food, bowel }) => (
        <Text>{description + " " + food + " " + bowel}</Text>
      ))}
    </View>
  );
}

export default function App() {
  const [dreamText, setDreamText] = React.useState("");
  const [foodText, setFoodText] = React.useState("");
  const [bowelText, setBowelText] = React.useState(0);

  const [forceUpdate, forceUpdateId] = useForceUpdate();

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists dreams (id integer primary key not null, description text, food text, bowel int);",
        null,
        null,
        (txObj, error) => console.log("Creation Error ", error)
      );
    });
  }, []);

  const add = () => {
    console.log("in add");
    console.log("in add");
    db.transaction(
      (tx) => {
        console.log("inside the transaction", dreamText, foodText, bowelText);
        tx.executeSql(
          "insert into dreams (description, food, bowel) values (?, ?, ?)",
          [dreamText, foodText, bowelText],
          null,
          (txObj, error) => console.log("Error ", error)
        );
        tx.executeSql("select * from dreams", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

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
        value={bowelText}
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
  );
}

function useForceUpdate() {
  const [value, setValue] = React.useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});
