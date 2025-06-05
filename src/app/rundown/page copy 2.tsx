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

  return (
    <div className="relative flex px-4 md:px-0 w-full overflow-hidden text-white">
      <div className="flex justify-center items-center h-[70vh]">
        <Ripple />
      </div>
      <div className="flex items-center justify-center w-full mt-10 h-screen">
        <div className="bg-white/20 backdrop-blur-sm md:w-[90vw] w-[100vw] h-[600px] md:h-[80vh] flex justify-center items-center">
          {/* Hilangkan overflow-x-auto di sini */}
          <div className="bg-white backdrop-blur-sm md:w-[85vw] w-[90vw] h-[500px] md:h-[75vh] p-4 rounded-xl flex gap-4 overflow-x-scroll relative">
            {/* overflow-x-scroll agar tetap bisa scroll horizontal, 
        dan relative agar posisi clone drag tepat */}
            <DragDropContext onDragEnd={onDragEnd}>
              {Object.entries(columns).map(([columnId, column]) => (
                <Droppable
                  droppableId={columnId}
                  key={columnId}
                  isDropDisabled={false}
                >
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-blue-100 rounded-xl w-64 p-3 flex flex-col"
                      style={{ position: "relative" }} // posisi relative penting
                    >
                      <h2 className="text-lg font-bold text-blue-700">
                        {column.title}
                      </h2>
                      {column.items.map((item, index) => (
                        <Draggable
                          draggableId={item.id}
                          index={index}
                          key={item.id}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="bg-white shadow p-2 mt-2 rounded cursor-pointer text-black"
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
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}
