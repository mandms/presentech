import React, { createContext } from "react";
export const CollapseSideBarContext = createContext<{
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>> | null;
}>({
  hidden: true,
  setHidden: null,
});
