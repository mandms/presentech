import Presentation from "../Presentation/Presentation";
import ToolBar from "./ToolBar/ToolBar";
import { useMemo, useState } from "react";
import Alert from "../Alert/Alert.tsx";
import { Status } from "../Alert/Alert.types.ts";
import Footer from "./Footer/Footer.tsx";
import { CollapseSideBarContext } from "../../context/collapseToolBar.ts";

function Editor() {
  const [error, setError] = useState<{ message: string } | null>(null);
  const [hidden, setHidden] = useState(false);
  const collapseSideBarValue = useMemo(
    () => ({
      hidden,
      setHidden,
    }),
    [hidden],
  );

  return (
    <>
      {error && <Alert title={"Ошибка"} message={error.message} status={Status.ERROR} onClose={() => setError(null)} />}
      <CollapseSideBarContext.Provider value={collapseSideBarValue}>
        <ToolBar />
        <Presentation />
      </CollapseSideBarContext.Provider>
      <Footer />
    </>
  );
}

export default Editor;
