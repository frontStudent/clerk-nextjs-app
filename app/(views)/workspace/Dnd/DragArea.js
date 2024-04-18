import DragBox from "./DragBox.js";
const boxes = [
  { id: "1", title: "Drag me around" },
  { id: "2", title: "Drag me too" },
];

const DragArea = () => {
  return (
    <div
      style={{
        width: "300px",
        height: "150px",
        border: "1px solid black",
      }}
    >
      {boxes.map(({ id, title }) => {
        return <DragBox key={id} id={id} title={title}></DragBox>;
      })}
    </div>
  );
};

export default DragArea;
