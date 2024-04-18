"use client";

import React, { useState, useCallback } from "react";
import { ReactSortable } from "react-sortablejs";

import Card from "./Card";
import "./resize.css";
import {
  Section,
  BoxMutateHelper,
  SectionMutateHelper,
  ResizeHelper,
} from "../types";
const BasicFunction = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "shrek",
      titleStyle: "shrek",
      height: 100,
      width: 550,
      childList: [],
    },
    {
      id: "2",
      title: "fiona",
      titleStyle: "shrek",
      height: 100,
      width: 550,
      childList: [],
    },
    {
      id: "3",
      title: "fiona",
      titleStyle: "shrek",
      height: 100,
      width: 550,
      childList: [],
    },
  ]);

  // 增删改某个模块中的box信息，但并非增删改模块
  const handleMutateBoxInSection: BoxMutateHelper = useCallback(
    (id, item, op) => {
      if (op === "add") {
        setSections((prevCards) =>
          prevCards.map((card) => {
            return card.id === id
              ? {
                  ...card,
                  childList: [
                    ...card.childList,
                    { ...item, id: new Date().getTime().toString() },
                  ],
                }
              : card;
          })
        );
        return;
      }
      if (op === "delete") {
        setSections((prevCards) => prevCards.filter((card) => card.id !== id));
        return;
      }
      if (op === "update") {
        setSections((prevCards) =>
          prevCards?.map((card) => {
            return card?.id === id
              ? {
                  ...card,
                  childList: card?.childList?.map((child) => {
                    return child?.id === item?.id ? item : child;
                  }),
                }
              : card;
          })
        );
        return;
      }
    },
    [sections, setSections]
  );

  // 增删改某个模块信息
  const handleMutateSection: SectionMutateHelper = useCallback(
    (id, op) => {
      if (op === "add") {
        const newSections = [...sections];
        newSections.splice(
          sections.findIndex((sec) => sec.id === id),
          0,
          {
            id: new Date().getTime().toString(),
            title: "fiona",
            titleStyle: "shrek",
            height: 100,
            width: 550,
            childList: [],
          }
        );
        setSections(newSections);
        return;
      }
      if (op === "delete") {
        setSections((prevCards) => prevCards.filter((card) => card.id !== id));
        return;
      }
      if (op === "update") {
        return;
      }
    },
    [sections, setSections]
  );

  const handleResize: ResizeHelper = (id, size) => {
    setSections((prev) =>
      prev.map((i) => (i.id === id ? { ...i, height: size.height } : i))
    );
  };
  return (
    <ReactSortable
      list={sections}
      setList={setSections}
      animation={150}
      handle=".handle"
      style={{ marginLeft: "30px" }}
    >
      {sections.map((item) => (
        <Card
          key={item.id}
          item={item}
          onMutateBox={handleMutateBoxInSection}
          onMutateSection={handleMutateSection}
          onResize={handleResize}
        />
      ))}
    </ReactSortable>
  );
};

export default BasicFunction;
