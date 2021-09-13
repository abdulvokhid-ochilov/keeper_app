import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";

function CreateArea(props) {
  const [titleText, setTitleText] = React.useState("");
  const [contentText, setContentText] = React.useState("");

  const [condition, setCondition] = React.useState(false);

  const listenTitle = function (event) {
    const newTitle = event.target.value;
    setTitleText(newTitle);
  };

  const listenContent = function (event) {
    const newContent = event.target.value;
    setContentText(newContent);
  };

  const addNote = function () {
    if (titleText === "" || contentText === "")
      return alert("Fill the note form");

    const newNote = {
      title: titleText,
      content: contentText,
    };

    fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((notes) => {
        props.setNotes([...notes]);
      })
      .catch((err) => console.log(err));

    setTitleText("");
    setContentText("");
  };

  const changeCondition = function () {
    setCondition(true);
  };

  return (
    <div>
      <form className="create-note">
        {condition === true ? (
          <input
            onChange={listenTitle}
            name="title"
            placeholder="Title"
            value={titleText}
          />
        ) : null}

        <textarea
          onChange={listenContent}
          name="content"
          onClick={changeCondition}
          value={contentText}
          placeholder="Take a note..."
          rows={condition === true ? 3 : 1}
        />
        <Zoom in={condition}>
          <Fab onClick={addNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
