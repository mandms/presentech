import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import styles from "../Menu/Menu.module.css";

type Props = {
    presentationName: string;
    renamePresentation: (name: string) => void;
};

export function Title({ presentationName, renamePresentation }: Props) {
    const [name, setName] = useState(presentationName);

    useEffect(() => {
        setName(presentationName);
    }, [presentationName]);

    const setTitle = () => {
        renamePresentation(name);
    };

    return (
        <input
            className={styles.name}
            value={name}
            onFocus={(e) => {
                e.currentTarget.select();
            }}
            onBlur={setTitle}
            onChange={(e) => setName(e.target.value)}
            placeholder="Новая презентация"
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
    return { presentationName: state.presentation.name };
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
