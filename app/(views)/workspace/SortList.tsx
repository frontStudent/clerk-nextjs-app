"use client";

import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const BasicFunction = () => {
  const [cards, setCards] = useState([
    { id: 1, title: "shrek", height: 100, width: 250, childList: [] },
    { id: 2, title: "fiona", height: 100, width: 250, childList: [] },
  ]);
  return (
    <div>
      <ReactSortable
        list={cards}
        setList={setCards}
        animation={150}
        // handle=".handle"
        style={{ marginLeft: "30px" }}
      >
        {cards.map((card) => (
          <div className="border-2 border-gray-300 rounded-lg p-4 mb-4 ">
            {card.title}
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default BasicFunction;
