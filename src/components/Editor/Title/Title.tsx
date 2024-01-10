import styles from "./Title.module.css";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../redux/rootReducer.ts";
import { connect } from "react-redux";

type Props = {
  title: string;
  renamePresentation: (name: string) => void;
};

function Title({ title, renamePresentation }: Props): JSX.Element {
  const [name, setName] = useState(title);

  const setTitle = () => {
    renamePresentation(name);
  };

  return (
    <input
      className={styles.name}
      value={name}
      onFocus={e => {
        e.currentTarget.select();
      }}
      onBlur={setTitle}
      onChange={e => setName(e.target.value)}
    />
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    renamePresentation: (name: string) =>
      dispatch({
        type: "RENAME_PRESENTATION",
        payload: name,
      }),
  };
};

const mapStateToProps = (state: RootState) => {
  return { title: state.presentation.name };
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
