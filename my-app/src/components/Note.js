import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  const deleteNote = function () {
    const removedNote = { id: props.id };

    fetch("http://localhost:5000/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(removedNote),
    })
      .then((res) => res.json())
      .then((notes) => {
        props.setNotes([...notes]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleteNote}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
