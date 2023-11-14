import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { openDatabase } from "expo-sqlite";
import AntDesign  from "@expo/vector-icons/AntDesign";
//flatlist
import { FlatList } from "react-native";
const db = openDatabase("hike.db");
const Home = ({ navigation }) => {
  const [hike, setHike] = useState([]);

  const fetchData = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "SELECT * FROM hike",
          [],
          (_, { rows }) => {
            // Process the fetched data here
            setHike(
              rows._array.map((row) => ({
                id: row.id,
                name: row.name,
                location: row.location,
                date: row.date,
                parking: row.parking,
                length: row.length,
                difficulty: row.difficulty,
                description: row.description,
              }))
            );
            console.log(rows._array);
          },
          (_, error) => {
            console.log("Error occurred while fetching data:", error);
          }
        );
      });
    } catch (error) {
      console.log("Error occurred while fetching data");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const navigateToScreen1 = () => {
    // navigate to Screen1
    navigation.navigate("Home");
  };

  const navigateToScreen2 = () => {
    // navigate to Screen2
    navigation.navigate("Add");
  };
  return (
    fetchData(),
    (
      <View style={styles.container}>
        <View style={styles.title1Container}>
          <Text style={styles.title1}>Home</Text>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Delete", "Are you sure you want to delete?", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    db.transaction((tx) => {
                      tx.executeSql(
                        "DELETE FROM hike",
                        [],
                        (_, resultSet) => {
                          hike.splice(0, hike.length);
                          console.log("Data deleted successfully");
                        },
                        (_, error) => {
                          console.log(
                            "Error occurred while deleting data:",
                            error
                          );
                        }
                      );
                    });
                  },
                },
              ]);
            }}
            style={styles.btn1Container}
          >
            <Text style={styles.btn1}>Delete All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={hike}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.listContainer,styles.titleHike]}>
              <View>
                <Text style={styles.title2}>Name : {item.name}</Text>
                <Text style={styles.title2}>Location : {item.location}</Text>
                <Text style={styles.title2}>Date : {item.date}</Text>
              </View>
              <View style={styles.containerBtn}>
                <View style={styles.btnMore}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Edit", {
                        id: item.id,
                        name: item.name,
                        location: item.location,
                        date: item.date,
                        parking: item.parking,
                        length: item.length,
                        difficulty: item.difficulty,
                        description: item.description,
                      });
                    }}
                  >
                    <AntDesign name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={styles.btnDelete}>
                  <TouchableOpacity
                    onPress={() => {
                      //dialog alert
                      Alert.alert(
                        "Delete",
                        "Are you sure you want to delete?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: async () => {
                              await db.transaction((tx) => {
                                tx.executeSql(
                                  "DELETE FROM hike WHERE id = ?",
                                  [item.id],
                                  (_, result) => {
                                    hike.splice(item.id, 1);
                                    console.log(result);
                                  }
                                );
                              });
                            },
                          },
                        ]
                      );
                    }}
                  >
                   <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles.Navigation}>
        <View style={styles.ButtonNavigation}>
          <TouchableOpacity
            style={styles.btn}
            title="Home"
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <AntDesign name="home" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.ButtonNavigation}>
          <TouchableOpacity style={styles.btn}
          title="Add"
          onPress={() => {
            navigation.navigate("Add");
          }}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  );
};

export default Home;

const styles = StyleSheet.create({
  btnDelete: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 0.18,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  
    backgroundColor: "red",
  },
  btnMore: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 0.2,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    //xanh lá
    backgroundColor: "green",
  },
  title2: {
    width: "100%",
    lineHeight: 40,
    marginLeft: 10,
  },
  titleHike: {
    flex: 0.52,
    width: "auto",
    borderWidth: 1,
    borderRadius: 10,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    justifyContent: "space-between",
    marginTop: 30,
  },
  btn1Container: {
    width: 155,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    //đỏ
    backgroundColor: "#F44336",
  },
  title1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 39,
  },
  title1Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
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
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btn: {
    backgroundColor: "#1453F7",
    width: 100,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    shadowColor: "#000",
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  btn1: {
    color: "white",
    fontStyle: "italic",
    fontWeight: "700",
  },
});
