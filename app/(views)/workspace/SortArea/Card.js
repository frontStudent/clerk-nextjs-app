'use client'

import React, { useRef, useMemo } from "react";
import { Space } from "antd";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { MenuOutlined } from "@ant-design/icons";

import { Rnd } from "react-rnd";
import { Resizable } from "react-resizable";
import "./resize.css";

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
  display: block;
  border: 1px solid #ccc;
`;

const IconWrap = styled(Space)`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  cursor: move;
  font-size: 16px;
`;

const Card = ({ id, childList, updateCard, width, height, onResize }) => {
  const minHeight = useMemo(() => {
    const list = childList.map((child) =>
        child?.lastInfo
          ? child?.lastInfo.top + child?.lastInfo.height
          : child?.top + child?.height
      )
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
        const newItem = { ...item, left, top };
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
      <Wrap ref={ref} key={id} width={width} height={height}>
        <IconWrap>
          <MenuOutlined className="handle" />
        </IconWrap>
        {childList?.map((child) => (
          <Rnd
            default={{ x: child?.left, y: child?.top }}
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
                top: position.y -1,
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
