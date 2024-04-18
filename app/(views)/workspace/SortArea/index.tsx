'use client'

import React, { useState, useCallback } from "react";
import { ReactSortable } from "react-sortablejs";

import Card from "./Card";
import "./resize.css";
import { Section, SectionUpdateHelper, ResizeHelper } from "../types";
const BasicFunction = () => {

  const [cards, setCards] = useState<Section[]>([
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
  ]);

  const updateCard: SectionUpdateHelper = useCallback(
    (id, item, op) => {
      if (op === "add") {
        setCards((prevCards) =>
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
      setCards((prevCards) =>
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
    },
    [cards, setCards]
  );
  const handleResize: ResizeHelper = (id, size) => {
    setCards((prev) =>
      prev.map((i) => (i.id === id ? { ...i, height: size.height } : i))
    );
  };
  return (
    <ReactSortable
      list={cards}
      setList={setCards}
      animation={150}
      handle=".handle"
      style={{marginLeft: '30px'}}
    >
      {cards.map((item) => (
        <Card
          key={item.id}
          item={item}
          updateCard={updateCard}
          onResize={handleResize}
        />
      ))}
    </ReactSortable>
  );
};

export default BasicFunction;
