import React, { useContext } from "react";
import { StoreCtx } from "../context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Single from "./Single";
const SettingContainer = () => {
  const { state, onChangeState } = useContext(StoreCtx);
  return (
    <Tabs
      className="w-full"
      value={`${state.selectType}`}
    >
      <TabsList>
        <TabsTrigger
          value="resume"
          onClick={() => onChangeState({ selectType: "resume" })}
        >
          resume
        </TabsTrigger>
        <TabsTrigger
          value="box"
          onClick={() => onChangeState({ selectType: "box" })}
        >
          box
        </TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="box">
        <Single />
      </TabsContent>
    </Tabs>
  );
};
export default SettingContainer;
