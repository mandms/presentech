import styles from "../Menu/Menu.module.css";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import { connect } from "react-redux";
import {useEffect, useState} from "react";

type Props = {
    presentationName: string;
    renamePresentation: (name: string) => void;
};

export function Title({presentationName, renamePresentation} : Props) {
    const [title, setName] = useState(presentationName)

    useEffect(() => {
        setName(title);
    }, [title]);

    const setTitle = () => {
        renamePresentation(title);
    };

    return (
        <input
            className={styles.name}
            value={presentationName}
            onFocus={(e) => {
                e.currentTarget.select();
            }}
            onBlur={setTitle}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    e.currentTarget.blur();
                    setTitle();
                }
            }}
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
    return { presentation: state.presentation.name };
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
