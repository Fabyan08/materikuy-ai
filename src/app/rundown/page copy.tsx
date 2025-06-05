"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";

interface Item {
  id: string;
  content: string;
}

interface Column {
  title: string;
  items: Item[];
}

type ColumnId = "todo" | "inProgress" | "done";

type Columns = {
  [key in ColumnId]: Column;
};

const initialData: Columns = {
  todo: {
    title: "To Do",
    items: [
      { id: "1", content: "Belajar Matematika" },
      { id: "2", content: "Baca Sejarah" },
    ],
  },
  inProgress: {
    title: "In Progress",
    items: [],
  },
  done: {
    title: "Done",
    items: [],
  },
};

export default function Rundown() {
  const [columns, setColumns] = useState<Columns>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId as ColumnId];
    const destCol = columns[destination.droppableId as ColumnId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems },
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            padding: "8px",
            width: "90vw",
            gap: "16px",
          }}
        >
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? "#a0c4ff" : "#d0e1ff",
                    padding: 8,
                    borderRadius: 8,
                    minWidth: 250,
                    maxHeight: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto", // scroll vertical kalau isi banyak
                    boxSizing: "border-box",
                  }}
                >
                  <h2 style={{ marginBottom: 8, fontWeight: "bold", color: "#023e8a" }}>
                    {column.title}
                  </h2>
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: 16,
                            marginBottom: 8,
                            backgroundColor: snapshot.isDragging ? "#48cae4" : "#ffffff",
                            color: "#000",
                            borderRadius: 4,
                            boxShadow: snapshot.isDragging
                              ? "0 4px 8px rgba(0,0,0,0.3)"
                              : "none",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
