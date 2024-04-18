import { createContext } from "react";
export type GlobalContent = {
  state: {
    selectField: any;
  };
  onChangeState: (s: any) => void;
};
export const StoreCtx = createContext<GlobalContent>({
  state: {
    selectField: {},
  },
  onChangeState: () => {},
});
