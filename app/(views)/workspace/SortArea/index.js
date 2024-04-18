'use client'

import React, { useState, useCallback } from "react";
import { ReactSortable } from "react-sortablejs";

import Card from "./Card";
import "./resize.css";

const BasicFunction = () => {
  const [cards, setCards] = useState([
    { id: 1, title: "shrek", height: 100, width: 250, childList: [] },
    { id: 2, title: "fiona", height: 100, width: 250, childList: [] },
  ]);

  const updateCard = useCallback(
    (id, item, op) => {
      if (op === "add") {
        setCards((prevCards) =>
          prevCards.map((card) => {
            return card.id === id
              ? {
                  ...card,
                  childList: [
                    ...card.childList,
                    { ...item, id: new Date().getTime() },
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
  const handleResize = (id, size) => {
    console.log(size.height, "size.height");
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
          id={item.id}
          width={item?.width}
          height={item?.height}
          childList={item?.childList}
          updateCard={updateCard}
          onResize={handleResize}
        />
      ))}
    </ReactSortable>
  );
};

export default BasicFunction;
