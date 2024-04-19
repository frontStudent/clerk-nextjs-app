import { createContext } from "react";
export type GlobalContent = {
  state: {
    selectField: any;
    selectType: string
  };
  onChangeState: (s: any) => void;
};
export const StoreCtx = createContext<GlobalContent>({
  state: {
    selectField: {},
    selectType: "resume"
  },
  onChangeState: () => {},
});
