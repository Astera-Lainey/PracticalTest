import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TicketItem, { ticket } from "../../components/TicketItem";

const TicketScreen = () => {
  const [tickets, setTickets] = useState<ticket[]>([
    {
      id: "1",
      title: "App crashes on launch",
      description: "After tapping icon, app closes immediately.",
      status: "Created",
      rating: null,
    },
    {
      id: "2",
      title: "Unable to login",
      description: "Sign-in fails with 'Network error' message.",
      status: "Under Assistance",
      rating: null,
    },
    {
      id: "3",
      title: "Feature request: Dark mode",
      description: "Please add a dark theme option in settings.",
      status: "Completed",
      rating: 4,
    },
  ]);

  // Function for editing
  const handleEdit = (updatedTicket: ticket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
    );
  };

  // Function to handle delete
  const handleDelete = (t: ticket) => {
    setTickets((prev) => prev.filter((x) => x.id !== t.id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TicketItem
            ticket={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
