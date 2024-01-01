import Presentation from "../Presentation/Presentation";
import ToolBar from "../Header/Menu/Menu.tsx";
import { useMemo, useState } from "react";
import Alert from "../Alert/Alert.tsx";
import { Status } from "../Alert/Alert.types.ts";
import Footer from "./Footer/Footer.tsx";
import { CollapseToolBarContext } from "../../context/collapseToolBar.ts";

function Editor() {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [hidden, setHidden] = useState(false);
  const collapseToolBarValue = useMemo(
    () => ({
      hidden,
      setHidden,
    }),
    [hidden],
  );

  return (
    <>
      <CollapseToolBarContext.Provider value={collapseToolBarValue}>
        <ToolBar />
        <Presentation />
      </CollapseToolBarContext.Provider>
    </>
  );
}

export default Editor;
