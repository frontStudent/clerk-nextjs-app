"use client";

import React, { useRef, useMemo, useContext, SyntheticEvent } from "react";
import { Space } from "antd";
import { useDrop, XYCoord } from "react-dnd";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Rnd } from "react-rnd";
import { Resizable } from "react-resizable";
import "./resize.css";
import { StoreCtx } from "../context";

import { DragItem, Box, SectionProps } from "../types";
import { ItemTypes } from "../Source/ItemTypes";
import RecTitle from "./RecTitle";

const Wrap = styled.div`
  position: relative;
  margin-bottom: 10px;
  display: block;
`;

const IconWrap = styled(Space)`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  font-size: 16px;
`;

const Card = ({ item, onMutateBox, onMutateSection, onResize }: SectionProps) => {
  const { id, width, height, childList } = item;

  const { state, onChangeState } = useContext(StoreCtx);
  console.log(state, "state");
  const minHeight = useMemo(() => {
    const list = childList.map((child: Box) =>
      child.lastInfo
        ? child.lastInfo.top + child.lastInfo.height
        : child.initInfo.top + child.initInfo.height
    );
    return Math.max(...list);
  }, [childList]);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX],
      drop(item: DragItem, monitor) {
        const clientOffset = monitor.getSourceClientOffset() as XYCoord;
        const dropOffset = ref.current?.getBoundingClientRect() as DOMRect;
        const left = clientOffset.x - dropOffset.x;
        const top = clientOffset.y - dropOffset.y;
        const newItem = {
          ...item,
          initInfo: { left, top, width: 150, height: 50 },
        };
        onMutateBox(id, newItem, "add");
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
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: `${
            state.selectField?.id === id
              ? "1px solid rgba(2,119,251,1)"
              : "1px solid transparent"
          }`,
          background: `${state.selectField?.id === id ? "#F2F8FE" : ""}`,
        }}
        onClick={() => {
          console.log(item, "item");
          onChangeState({ selectField: item });
        }}
      >
        <RecTitle modTitleSize="16px" colorList={["#f4f7f6", "#4a8bd6"]}>
          模块名称
        </RecTitle>
        {state.selectField?.id === id && (
          <IconWrap>
            <AddIcon
              className="hover:cursor-pointer"
              onClick={() => onMutateSection(id, "add")}
            />
            <MenuIcon className="handle hover:cursor-move" />
            <CloseIcon
              className="hover:cursor-pointer"
              onClick={() => onMutateSection(id, "delete")}
            />
          </IconWrap>
        )}
        {childList?.map((child: Box) => (
          <Rnd
            default={{
              x: child?.initInfo?.left,
              y: child?.initInfo?.top,
              width: child?.initInfo?.width,
              height: child?.initInfo?.height,
            }}
            key={child?.id}
            onDragStop={(e, d) => {
              const rectInfo = (
                e.target as HTMLElement
              ).getBoundingClientRect();
              const lastInfo = {
                height: rectInfo.height - 1,
                width: rectInfo.width,
                left: d.x,
                top: d.y - 1,
              };
              onMutateBox(id, { ...child, lastInfo }, "update");
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const lastInfo = {
                height: ref.offsetHeight - 1,
                width: ref.offsetWidth,
                left: position.x,
                top: position.y - 1,
              };
              onMutateBox(id, { ...child, lastInfo }, "update");
            }}
            bounds={"parent"}
            style={{
              border: "1px dashed gray",
              lineHeight: "30px",
              textAlign: "center",
              cursor: "move",
            }}
          >
            {child.content}
          </Rnd>
        ))}
      </Wrap>
    </Resizable>
  );
};

export default Card;