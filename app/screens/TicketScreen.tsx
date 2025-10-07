import React, { useState } from "react";
import { View, FlatList } from "react-native";
import TicketItem, { ticket } from "../../components/TicketItem";

type Props = {
  tickets: ticket[];
  setTickets: React.Dispatch<React.SetStateAction<ticket[]>>;
};

const TicketScreen: React.FC<Props> = ({ tickets, setTickets }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingTicket, setEditingTicket] = useState<ticket | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Created" | "Under Assistance" | "Completed">("Created");

  const handleEdit = (t: ticket) => {
    setEditingTicket(t);
    setTitle(t.title);
    setDescription(t.description);
    setStatus(t.status);
    setEditModalVisible(true);
  };

  const handleSave = () => {
    if (!editingTicket) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === editingTicket.id ? { ...t, title, description, status } : t
      )
    );
    setEditModalVisible(false);
    setEditingTicket(null);
  };

  const handleDelete = (t: ticket) => {
    setTickets((prev) => prev.filter((x) => x.id !== t.id));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TicketItem ticket={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      />
    </View>
  );
};

export default TicketScreen;
