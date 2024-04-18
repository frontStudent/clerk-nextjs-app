import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { DragItem } from "../types";
const DragBox = ({ id, content }: DragItem) => {
  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, content, width: 150, height: 30 },
      // collect: (monitor) => ({
      //   isDragging: monitor.isDragging(),
      // }),
    }),
    [id]
  );
  return (
    <div
      className="bg-white rounded-sm shadow-md cursor-move text-center p-4"
      ref={drag}
    >
      {content}
    </div>
  );
};
export default DragBox;