import { StyleSheet, Text, View, Pressable, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export type ticket = {
  id: string;
  title: string;
  description: string;
  status: "Created" | "Under Assistance" | "Completed";
  rating: number | null;
};

type Props = {
  ticket: ticket;
  onEdit?: (t: ticket) => void;
  onDelete?: (t: ticket) => void;
};

const TicketItem = ({ ticket, onEdit, onDelete }: Props) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Local state for editing
  const [editingTicket, setEditingTicket] = useState<ticket | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Created" | "Under Assistance" | "Completed">("Created");

  // Open Edit Modal
  const handleOpenEdit = (t: ticket) => {
    setEditingTicket(t);
    setTitle(t.title);
    setDescription(t.description);
    setStatus(t.status);
    setEditModalVisible(true);
  };

  // Save changes
  const handleSave = () => {
    if (!editingTicket) return;
    onEdit?.({
      ...editingTicket,
      title,
      description,
      status,
    });
    setEditModalVisible(false);
  };

  return (
    <View style={styles.row}>
      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Editing: {editingTicket?.title}</Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter new title"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter new description"
              multiline
            />

            <Text style={styles.label}>Status</Text>
            <View style={styles.statusRow}>
              {["Created", "Under Assistance", "Completed"].map((opt) => {
                const selected = status === opt;
                return (
                  <Pressable
                    key={opt}
                    onPress={() => setStatus(opt as "Created" | "Under Assistance" | "Completed")}
                    style={[styles.statusOption, selected && styles.statusOptionSelected]}
                  >
                    <Text style={{ fontWeight: selected ? "700" : "400" }}>{opt}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.closeBtn}
                onPress={() => setEditModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.saveBtn}
                onPress={handleSave}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Delete Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <View style={styles.deleteModalView}>
            <Text style={styles.deleteTitle}>Delete Ticket</Text>
            <Text style={styles.deleteMessage}>
              Are you sure you want to delete <Text style={{ fontWeight: "700" }}>{ticket.title}</Text>?
            </Text>

            <View style={styles.deleteButtons}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.deleteBtn}
                onPress={() => {
                  onDelete?.(ticket);
                  setDeleteModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Ticket Info + Icons */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{ticket.title}</Text>
        <View style={styles.iconRow}>
          <Pressable onPress={() => handleOpenEdit(ticket)}>
            <MaterialIcons name="edit" size={24} color="#2563eb" />
          </Pressable>
          <Pressable onPress={() => setDeleteModalVisible(true)}>
            <MaterialIcons name="delete" size={24} color="#b91c1c" />
          </Pressable>
        </View>
      </View>

      <Text style={styles.desc}>{ticket.description}</Text>
      <Text
        style={{
          color:
            ticket.status === "Created"
              ? "#2b6cb0"
              : ticket.status === "Under Assistance"
              ? "#d69e2e"
              : "#16ab3bff",
          fontWeight: "700",
          fontSize: 16,
          marginTop: 6,
        }}
      >
        {ticket.status}
      </Text>
    </View>
  );
};

export default TicketItem;

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#fff",
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    gap: 10,
  },
  title: { fontWeight: "700", fontSize: 20 },
  desc: { color: "#475569", marginTop: 4, fontSize: 18 },

  // Edit modal styles
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    color: "#475569",
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  statusOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  statusOptionSelected: {
    backgroundColor: "#e0ecff",
    borderColor: "#2563eb",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
  closeBtn: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  saveBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  // Delete modal styles
  deleteModalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },
  deleteTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#b91c1c",
    marginBottom: 10,
  },
  deleteMessage: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },
  deleteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  cancelBtn: {
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
