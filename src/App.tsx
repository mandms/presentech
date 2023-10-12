import "./App.css";
import { editor } from "./test-data/allData";
import Editor from "./components/Editor";

function App() {
  return (
    <>
      <Editor editor={editor} />
    </>
  );
}

export default App;
