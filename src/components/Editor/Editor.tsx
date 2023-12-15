import { TEditor, TPresentation } from "../../types";
import Presentation from "../Presentation/Presentation";
import ToolBar from "./ToolBar/ToolBar";
import { useState } from "react";
import Alert from "../Alert/Alert.tsx";
import { Status } from "../Alert/Alert.types.ts";
import Footer from "./Footer/Footer.tsx";
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer.ts";

interface IEditorProps {
  editor: TEditor;
}

function Editor({ editor }: IEditorProps) {
  const [presentation, setPresentation] = useState<TPresentation>(editor.presentation);
  const [error, setError] = useState<{ message: string } | null>(null);

  const setCurrentSlideById = (id: number) => {
    setPresentation(prevState => ({ ...prevState, currentSlideId: id }));
  };

  /* const addSlide = (slide: TSlide) => {
    setPresentation(prevState => ({...prevState, slides: [...prevState.slides, slide]}))
  }*/

  return (
    <>
      {error && <Alert title={"Ошибка"} message={error.message} status={Status.ERROR} onClose={() => setError(null)} />}
      <ToolBar
      /*setError={message => setError({message})}
        changePresentation={data => setPresentation(data)}
        presentation={presentation}
        setCurrentSlideById={setCurrentSlideById}
        addSlide={addSlide}*/
      />
      <Presentation setCurrentSlideById={id => setCurrentSlideById(id)} presentation={presentation} />
      <Footer />
    </>
  );
}

const mapStateToProps = (state: RootState): IEditorProps => {
  return {
    editor: {
      history: state.history,
      presentation: state.presentation,
    },
  };
};

export default connect(mapStateToProps)(Editor);
