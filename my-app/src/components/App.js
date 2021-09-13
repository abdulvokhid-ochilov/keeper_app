import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [currentNotes, setNotes] = React.useState([]);

  fetch("http://localhost:5000/api/notes", { method: "GET" })
    .then((res) => res.json())
    .then((notes) => {
      setNotes([...notes]);
    })
    .catch((err) => console.log(err));

  return (
    <div>
      <Header />
      <CreateArea setNotes={setNotes} />
      {currentNotes.map((note) => (
        <Note
          id={note._id}
          title={note.title}
          key={note._id}
          content={note.content}
          setNotes={setNotes}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
