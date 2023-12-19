import React, { createContext } from "react";
export const CollapseToolBarContext = createContext<{
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>> | null;
}>({
  hidden: true,
  setHidden: null,
});
