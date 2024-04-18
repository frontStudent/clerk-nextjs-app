"use client";

import React, { useRef, useMemo, useContext } from "react";
import { Space } from "antd";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import DehazeIcon from "@mui/icons-material/Dehaze";

import { Rnd } from "react-rnd";
import { Resizable } from "react-resizable";
import "./resize.css";

import { StoreCtx } from "../context";
const ItemTypes = {
  CARD: "card",
  BOX: "box",
  MOVE_BOX: "move-box",
};

const Wrap = styled.div`
  position: relative;
  margin-bottom: 10px;
  height: ${(props) => props.height + "px"};
  width: ${(props) => props.width + "px"};
  border: ${(props) =>
    props.isSelect ? "1px solid rgba(2,119,251,1)" : "1px solid transparent"};
  background: ${(props) => (props.isSelect ? "#F2F8FE" : "")};
  display: block;
`;

const IconWrap = styled(Space)`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  cursor: move;
  font-size: 16px;
`;

const Card = ({ item, id, childList, updateCard, width, height, onResize }) => {
  const { state, onChangeState } = useContext(StoreCtx);
  console.log(state, "state");
  const minHeight = useMemo(() => {
    const list = childList.map((child) =>
      child?.lastInfo
        ? child?.lastInfo.top + child?.lastInfo.height
        : child?.initInfo?.top + child?.initInfo?.height
    );
    return Math.max(...list);
  }, [childList]);
  const ref = useRef();

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX],
      drop(item, monitor) {
        const clientOffset = monitor.getSourceClientOffset();
        const dropOffset = ref.current.getBoundingClientRect();
        const left = clientOffset.x - dropOffset.x;
        const top = clientOffset.y - dropOffset.y;
        const newItem = { ...item, initInfo: { left, top } };
        updateCard(id, newItem, "add");
      },
    }),
    []
  );
  drop(ref);
  return (
    <Resizable
      width={width}
      height={height}
      onResize={(e, { size }) => onResize(id, size)}
      handle={<span className="react-resizable-handle" />}
      minConstraints={[100, minHeight]}
    >
      <Wrap
        ref={ref}
        key={id}
        width={width}
        height={height}
        isSelect={state.selectField?.id === id}
        onClick={() => {
          console.log(item, "item");
          onChangeState({ selectField: item });
        }}
      >
        <IconWrap>
          <DehazeIcon className="handle" />
        </IconWrap>
        {childList?.map((child) => (
          <Rnd
            default={{ x: child?.initInfo?.left, y: child?.initInfo?.top }}
            key={child?.id}
            onDragStop={(e, d) => {
              const rectInfo = e.target.getBoundingClientRect();
              const lastInfo = {
                height: rectInfo.height - 1,
                width: rectInfo.width,
                left: d.x,
                top: d.y - 1,
              };
              updateCard(id, { ...child, lastInfo }, "update");
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const lastInfo = {
                height: ref.offsetHeight - 1,
                width: ref.offsetWidth,
                left: position.x,
                top: position.y - 1,
              };
              updateCard(id, { ...child, lastInfo }, "update");
            }}
            bounds={"parent"}
            style={{
              border: "1px dashed gray",
              lineHeight: "30px",
              textAlign: "center",
              cursor: "move",
              width: "150px",
              height: "30px",
            }}
          >
            {child?.title}
          </Rnd>
        ))}
      </Wrap>
    </Resizable>
  );
};

export default Card;
