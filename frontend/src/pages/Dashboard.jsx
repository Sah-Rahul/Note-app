import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("/get-note");
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`/note/delete/${noteId}`);
      if (response.data.success) {
        setNotes(notes.filter((note) => note._id !== noteId));
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesFilter = filter === "all" || note.important === filter;
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">My Notes</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-md"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-md"
          >
            <option value="all" className="bg-gray-800">
              All Notes
            </option>
            <option value="high" className="bg-gray-800">
              High Priority
            </option>
            <option value="medium" className="bg-gray-800">
              Medium Priority
            </option>
            <option value="lower" className="bg-gray-800">
              Low Priority
            </option>
          </select>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            No notes found
          </h2>
          <p className="text-white/70 mb-6">
            {notes.length === 0
              ? "You haven't created any notes yet."
              : "No notes match your search criteria."}
          </p>
          <Link
            to="/create-note"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Create Your First Note
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={deleteNote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
