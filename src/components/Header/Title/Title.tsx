import styles from "../Menu/Menu.module.css";
import { TPresentation } from "../../../types.ts";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import { connect } from "react-redux";

type Props = {
    presentation: TPresentation;
};

export function Title({presentation} : Props) {
    return (
        <input
            className={styles.name}
            value={presentation.name}
            placeholder="Новая презентация"
            onFocus={(e) => {
                e.currentTarget.select();
            }}
        />
    );
}

const mapStateToProps = (state: RootState) => {
    return { presentation: state.presentation };
};

export default connect(mapStateToProps)(Title);
