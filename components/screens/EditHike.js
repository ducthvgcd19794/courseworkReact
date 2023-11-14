import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { openDatabase } from "expo-sqlite";

const db = openDatabase("hike.db");
const EditHike = ({ navigation , route }) => {
  const [selectedRadio, setSelectedRadio] = useState(route.params.parking == "Yes" ? 1 : 2);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(route.params.date);
  const [name, setName] = useState(route.params.name);
  const [location, setLocation] = useState(route.params.location);
  const [parking, setParking] = useState(route.params.parking ? "Yes" : "No");
  const [length, setLength] = useState(route.params.length);
  const [difficulty, setDifficulty] = useState(route.params.difficulty);
  const [description, setDescription] = useState(route.params.description);
  const [hikes, setHike] = useState([]);
  const addHike = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE hike SET name = ?, location = ?, date = ?, parking = ?, length = ?, difficulty = ?, description = ? WHERE id = ?",
        [name, location, text, parking, length, difficulty, description, route.params.id],
        (_, resultSet) => {
          console.log("Data inserted successfully");
        },
        (_, error) => {
          console.log("Error occurred while inserting data");
          console.log(error);
        }
      );
    })
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);

    console.log(fDate);
  };

  const validate = () => {
    if (name.length == 0 || location.length == 0 || text.length == 0 || parking.length == 0 || length.length == 0 || difficulty.length == 0) {
      Alert.alert("Error", "Please enter all fields");
    } else {
      const data = {
        "\nName: ":name,
        "\nLocation: " : location,
        "\nDate: ": text,
        "\nParking: ": parking,
        "\nLength: ": length,
        "\nDifficulty: ": difficulty,
      };
      Alert.alert("Add Hike", 
        Object.keys(data)
          .map((key) => key + data[key])
          .join("\n"),
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          }
          ,
          {
            text: "OK",
            onPress: () => {
              addHike();
            },
          }
        ]
      );
    }
  }

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Edit Hike</Text>
          </View>
          <View style={styles.inPutContainer}>
            <View style={styles.inPutTitleContainer}>
              <Text style={styles.inPutTitle}>Name of the hike</Text>
              <Text style={styles.sao}>*</Text>
            </View>
            <View style={styles.inPutEnterContainer}>
              <TextInput
                style={styles.inputEnter}
                placeholder="Name of the hike"
                value={name}
                onChangeText={(text) => setName(text)}
              ></TextInput>
            </View>
          </View>
          <View style={styles.inPutContainer1}>
            <View style={styles.inPutTitleContainer}>
              <Text style={styles.inPutTitle}>Location</Text>
              <Text style={styles.sao}>*</Text>
            </View>
            <View style={styles.inPutEnterContainer}>
              <TextInput
                style={styles.inputEnter}
                placeholder="Location"
                value={location}
                onChangeText={(text) => setLocation(text)}
              ></TextInput>
            </View>
          </View>
          <View style={styles.inPutContainer1}>
            <View style={styles.inPutTitleContainer}>
              <Text style={styles.inPutTitle}>Date of the hike</Text>
              <Text style={styles.sao}>*</Text>
            </View>
            <View style={styles.inPutEnterContainer}>
              <Text 
              style={[styles.inputEnter , styles.date] } onPress={() => showMode("date")}>
                {text}
              </Text>
            </View>
          </View>
          <View style={styles.inPutContainer1}>
            <View style={styles.inPutTitleContainer}>
              <Text style={styles.inPutTitle}>Parking available</Text>
              <Text style={styles.sao}>*</Text>
              <View style={styles.radioButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedRadio(1);
                    setParking("Yes");
                  }}
                >
                  <View style={styles.wrapper}>
                    <View style={styles.radio}>
                      {selectedRadio == 1 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text style={styles.radioText}>Yes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedRadio(2);
                    setParking("No");
                  }}
                >
                  <View style={styles.wrapper}>
                    <View style={styles.radio}>
                      {selectedRadio == 2 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text style={styles.radioText}>No</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inPutContainer2}>
            <View style={styles.inPutTitleContainer}>
              <Text style={styles.inPutTitle}>Length of the hike</Text>
              <Text style={styles.sao}>*</Text>
            </View>
            <View style={styles.inPutEnterContainer1}>
              <TextInput
                style={styles.inputEnter1}
                placeholder="Number"
                value={length}
                onChangeText={(text) => setLength(text)}
              ></TextInput>
            </View>
          </View>
          <View style={styles.inPutContainer2}>
            <View style={styles.inPutTitleContainer}>
              <Text style={styles.inPutTitle}>Difficulty level</Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text> </Text>
              <Text style={styles.sao}>*</Text>
            </View>
            <View style={styles.inPutEnterContainer1}>
              <TextInput
                style={styles.inputEnter1}
                placeholder="HIGH"
                value={difficulty}
                onChangeText={(text) => setDifficulty(text)}
              ></TextInput>
            </View>
          </View>
          <View style={styles.inPutContainer3}>
            <View style={styles.inPutTitleContainer}>
              <Text style={styles.inPutTitle}>Description</Text>
            </View>
            <View style={styles.inPutEnterContainer}>
              <TextInput
                style={styles.inputEnter2}
                placeholder="Your Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              ></TextInput>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              validate();
            }}
          >
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableOpacity>
          {/* console.log(selectedRadio); */}
          {/* existing code */}
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default EditHike;

const styles = StyleSheet.create({
  ceneredView: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "justify",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#1453F7",
    width: "30%",
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 90,
    justifyContent: "center",
  },
  inputEnter2: {
    borderRadius: 10,
    fontStyle: "italic",
    height: 100,
    borderWidth: 1, // Add border width
    borderColor: "black", // Add border color
    alignItems: "flex-start",
  },
  inPutContainer3: {
    marginTop: 35,
  },
  inputEnter1: {
    borderRadius: 10,
    fontStyle: "italic",
    width: 160,
    alignItems: "center",
    paddingLeft: 10,
    borderWidth: 1, // Add border width
    borderColor: "black", // Add border color
    marginRight: 10,
  },
  inPutContainer2: {
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  
  },
  radioBg: {
    backgroundColor: "black",
    width: 14,
    height: 14,
    margin: 1,
    borderRadius: 7,
  },
  radio: {
    width: 20,
    height: 20,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 2,
  },
  radioText: {
    fontSize: 16,
    marginLeft: "14%",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonContainer: {
    marginLeft: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inPutContainer1: {
    marginTop: 75,
  },
  inputEnter: {
    borderRadius: 10,
    paddingHorizontal: 15,
    fontStyle: "italic",
    borderWidth: 1, // Add border width
    borderColor: "black", // Add border color
    padding: 15,
  },
  inPutEnterContainer: {
    marginHorizontal: 20,
    marginVertical: -15,
    top: 40,
  },
  sao: {
    color: "red",
    marginLeft: 4,
  },
  inPutTitle: {
    fontSize: 14,
  },
  inPutTitleContainer: {
    marginHorizontal: 20,
    marginVertical: -15,
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  containerTitle: {
    marginBottom: 20,
  },
  Container: {
    width: "100%",
    height: "100%",
  },
  Navigation: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  ButtonNavigation: {
    flex: 1,
  },
  btn:{
    backgroundColor: "#1453F7",
    width: 100,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin : 10,
    shadowColor: "#000",
  },
  date:{
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  }
});
