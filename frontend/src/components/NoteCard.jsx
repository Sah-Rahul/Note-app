import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 border-red-400/50 text-red-200';
      case 'medium': return 'bg-yellow-500/20 border-yellow-400/50 text-yellow-200';
      default: return 'bg-green-500/20 border-green-400/50 text-green-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-white text-lg truncate flex-1 mr-2">
          {note.title}
        </h3>
        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(note.important)}`}>
          {note.important}
        </span>
      </div>
      
      <p className="text-white/70 text-sm mb-4 line-clamp-3">
        {note.content.substring(0, 150)}...
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-xs border border-blue-400/30"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-xs text-white/50 mb-4">
        <span>Created: {formatDate(note.createdAt)}</span>
        <span>Updated: {formatDate(note.updatedAt)}</span>
      </div>
      
      <div className="flex gap-2">
        <Link
          to={`/edit-note/${note._id}`}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium text-center transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(note._id)}
          className="flex-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;