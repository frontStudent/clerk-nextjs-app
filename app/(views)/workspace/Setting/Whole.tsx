import React, { useContext } from "react";
import { StoreCtx } from "../context";
import { Slider } from "@/components/ui/slider";

const Whole = () => {
  return (
    <div className="p-4">
      <div>Module Title Font Size</div>
      <Slider className="mt-4 mb-8" defaultValue={[33]} max={100} step={1} />
      <div>Text Font Size</div>
      <Slider className="mt-4 mb-8" defaultValue={[33]} max={100} step={1} />
    </div>
  );
};

export default Whole;
