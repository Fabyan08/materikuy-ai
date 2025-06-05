"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";
import Ripple from "@/components/ripple";

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

  const [newTasks, setNewTasks] = useState<
    Record<ColumnId, { content: string; date: string }>
  >({
    todo: { content: "", date: "" },
    inProgress: { content: "", date: "" },
    done: { content: "", date: "" },
  });

  const handleInputChange = (columnId: ColumnId, value: string) => {
    const date = new Date().toLocaleDateString("id-ID");
    setNewTasks({
      ...newTasks,
      [columnId]: { content: value, date },
    });
  };

  const handleAddTask = (columnId: ColumnId) => {
    const task = newTasks[columnId];
    if (!task.content.trim()) return;

    const newItem: Item = {
      id: Date.now().toString(),
      content: `${task.content} (📅 ${task.date})`,
    };

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: [...columns[columnId].items, newItem],
      },
    });

    setNewTasks({
      ...newTasks,
      [columnId]: { content: "", date: "" },
    });
  };

  return (
    <div className="relative flex px-4 md:px-0 w-full overflow-hidden text-white">
      <div className="flex justify-center items-center h-[70vh]">
        <Ripple />
      </div>
      <div className="flex items-center justify-center w-full px-20 mt-10 h-screen">
        <div className="w-full h-[80vh] flex flex-col items-center justify-center bg-white p-4">
          <h1 className="text-3xl font-bold mb-4 text-gray-500">Rundown</h1>

          <DragDropContext onDragEnd={onDragEnd}>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                padding: "8px",
                width: "90vw",
                gap: "16px",
                paddingLeft: "30px",
              }}
            >
              {Object.entries(columns).map(([columnId, column]) => (
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "#a0c4ff"
                          : "#d0e1ff",
                        padding: 8,
                        borderRadius: 8,
                        minWidth: 250,
                        maxHeight: "70vh",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        boxSizing: "border-box",
                      }}
                    >
                      <h2
                        style={{
                          marginBottom: 8,
                          fontWeight: "bold",
                          color: "#023e8a",
                        }}
                      >
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
                                backgroundColor: snapshot.isDragging
                                  ? "#48cae4"
                                  : "#ffffff",
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

                      {/* Input Form Per Kolom */}
                      <div style={{ marginTop: 12 }}>
                        <input
                          type="text"
                          placeholder="Tambah item..."
                          value={newTasks[columnId as ColumnId].content}
                          onChange={(e) =>
                            handleInputChange(
                              columnId as ColumnId,
                              e.target.value
                            )
                          }
                          className="w-full p-2 rounded text-black text-sm"
                        />
                        <button
                          onClick={() => handleAddTask(columnId as ColumnId)}
                          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm"
                        >
                          Tambah
                        </button>
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
