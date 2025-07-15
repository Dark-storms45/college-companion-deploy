import React, { useState } from "react";

function CreateGroupModal({ isOpen, onClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim() && description.trim()) {
      onCreateGroup({ groupName, description });
      setGroupName("");
      setDescription("");
      onClose();
    } else {
      alert("Please enter both group name and description.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Study Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="groupName">Group Name:</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="create-button">
              Create
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;
