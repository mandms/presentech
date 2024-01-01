import styles from "../Menu/Menu.module.css";
import { TPresentation } from "../../../types.ts";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import { connect } from "react-redux";
import {useEffect, useState} from "react";

type Props = {
    presentation: TPresentation;
    rename: (name: string) => void;
};

export function Title({presentation, rename} : Props) {
    const [title, setName] = useState(presentation["name"])

    useEffect(() => {
        setName(title);
    }, [title]);


    const setTitle = () => {
        rename(title);
    };

    return (
        <input
            className={styles.name}
            value={presentation.name}
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
    return { presentation: state.presentation };
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
