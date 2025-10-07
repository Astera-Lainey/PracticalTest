import React, { useState } from "react";
import {StyleSheet,StatusBar,Button,Modal,TextInput,View,Text,Alert,ScrollView} from "react-native";
import TicketScreen from "./screens/TicketScreen";
import { ticket } from "../components/TicketItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [tickets, setTickets] = useState<ticket[]>([
    { id: "1", title: "App crashes on launch", description: "After tapping icon, app closes immediately.", status: "Created", rating: null },
    { id: "2", title: "Unable to login", description: "Sign-in fails with 'Network error' message.", status: "Under Assistance", rating: null },
    { id: "3", title: "Feature request: Dark mode", description: "Please add a dark theme option in settings.", status: "Completed", rating: 4 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Add new ticket
  const handleCreateTicket = () => {
    if (!newTitle.trim()) {
      Alert.alert("Error", "Please enter a title.");
      return;
    }

    const newTicket: ticket = {
      id: (Math.random() * 100000).toFixed(0), 
      title: newTitle.trim(),
      description: newDescription.trim(),
      status: "Created",
      rating: null,
    };

    // Adding the new ticket
    setTickets((prev) => [newTicket, ...prev]); 
    setNewTitle("");
    setNewDescription("");
    setModalVisible(false);
    Alert.alert("Ticket Created Successfully");
  };

  return (
<ScrollView style={styles.container}>
   <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View>
        <Text style={styles.h1}>Ticket Management System</Text>
      </View>

      {/* Ticket List Screen */}
      <TicketScreen tickets={tickets} setTickets={setTickets} />

      {/* Add Ticket Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Ticket</Text>

            <Text>Title</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Enter title"
            />

            <Text>Description</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Enter description"
              multiline
            />

            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Create Ticket" onPress={handleCreateTicket} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Open Modal Button */}
      <View style={styles.button}>
        <Button title="Add New Ticket" onPress={() => setModalVisible(true)} />
      </View>
    </SafeAreaView>
</ScrollView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fda6c7ff",
  },
  h1: {
    color: "#fff",
    fontSize: 20,
    fontWeight:500,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 200,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
});
