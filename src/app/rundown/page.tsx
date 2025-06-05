"use client";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";

import Ripple from "@/components/ripple";
import { nanoid } from "nanoid";

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
    items: [],
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

  // Load dari localStorage setelah mount (client-side only)
  useEffect(() => {
    const saved = localStorage.getItem("rundownColumns");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.todo &&
          parsed.inProgress &&
          parsed.done &&
          Array.isArray(parsed.todo.items) &&
          Array.isArray(parsed.inProgress.items) &&
          Array.isArray(parsed.done.items)
        ) {
          setColumns(parsed);
        }
      } catch (error) {
        console.error(
          "Failed to parse rundownColumns from localStorage:",
          error
        );
      }
    }
  }, []); // hanya dijalankan sekali saat component mount

  // Simpan ke localStorage jika columns berubah
  useEffect(() => {
    localStorage.setItem("rundownColumns", JSON.stringify(columns));
  }, [columns]);

  const parseItemContent = (
    content: string
  ): { task: string; date: string } => {
    const matched = content.match(/^(.*)\s+\(Deadline: (.*)\)$/);
    if (matched) {
      return {
        task: matched[1],
        date: new Date(matched[2]).toISOString().slice(0, 10),
      };
    }
    return { task: content, date: "" };
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId as ColumnId];
    const destCol = columns[destination.droppableId as ColumnId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);
    // Simpan ke localStorage setiap kali columns berubah

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

  const handleInputChange = (
    columnId: ColumnId,
    field: "content" | "date",
    value: string
  ) => {
    setNewTasks({
      ...newTasks,
      [columnId]: {
        ...newTasks[columnId],
        [field]: value,
      },
    });
  };

  const handleAddTask = (columnId: ColumnId) => {
    const task = newTasks[columnId];
    if (!task.content.trim() || !task.date.trim()) return;

    const formattedDate = task.date.split("-").reverse().join("-");

    const newItem: Item = {
      id: nanoid(),
      content: `${task.content} (Deadline: ${formattedDate})`,
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

  const [editItem, setEditItem] = useState<{
    columnId: ColumnId;
    item: Item;
  } | null>(null);

  const [editedTask, setEditedTask] = useState<{
    content: string;
    date: string;
  }>({
    content: "",
    date: "",
  });
  const handleUpdateItem = () => {
    if (!editItem) return;

    const formattedDate = editedTask.date; // tetap dalam format YYYY-MM-DD
    const updatedContent = `${editedTask.content} (Deadline: ${formattedDate})`;

    setColumns((prev) => {
      const updatedItems = prev[editItem.columnId].items.map((item) =>
        item.id === editItem.item.id
          ? { ...item, content: updatedContent }
          : item
      );
      return {
        ...prev,
        [editItem.columnId]: {
          ...prev[editItem.columnId],
          items: updatedItems,
        },
      };
    });

    setEditItem(null);
    setEditedTask({ content: "", date: "" });
  };

  const handleDeleteItem = (columnId: ColumnId, itemId: string) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        items: prev[columnId].items.filter((item) => item.id !== itemId),
      },
    }));
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
            <div className="flex overflow-x-auto w-full gap-4 pb-4">
              {Object.entries(columns).map(([columnId, column]) => (
                <div key={columnId}>
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="bg-blue-100 p-4 rounded-lg min-w-[250px] max-h-[60vh] overflow-y-auto"
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "#a0c4ff"
                            : "#d0e1ff",
                        }}
                      >
                        <h2 className="text-blue-900 font-bold mb-2">
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
                                className={`p-3 mb-2 rounded shadow ${
                                  snapshot.isDragging
                                    ? "bg-blue-300"
                                    : "bg-white"
                                } text-black`}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="mr-2">{item.content}</span>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => {
                                        setEditItem({
                                          columnId: columnId as ColumnId,
                                          item,
                                        });

                                        const { task, date } = parseItemContent(
                                          item.content
                                        );

                                        setEditedTask({ content: task, date });
                                      }}
                                    >
                                      📝
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteItem(
                                          columnId as ColumnId,
                                          item.id
                                        )
                                      }
                                      className="text-red-500 text-sm"
                                    >
                                      ❌
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {/* Input Tambah Tugas */}
                  <div className="mt-4 w-full max-w-xs">
                    <input
                      type="text"
                      placeholder="Isi tugas..."
                      value={newTasks[columnId as ColumnId].content}
                      onChange={(e) =>
                        handleInputChange(
                          columnId as ColumnId,
                          "content",
                          e.target.value
                        )
                      }
                      className="w-full mb-2 p-2 border rounded text-black"
                    />
                    <input
                      type="date"
                      value={newTasks[columnId as ColumnId].date}
                      onChange={(e) =>
                        handleInputChange(
                          columnId as ColumnId,
                          "date",
                          e.target.value
                        )
                      }
                      className="w-full mb-2 p-2 border rounded text-black"
                    />
                    <button
                      onClick={() => handleAddTask(columnId as ColumnId)}
                      className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                    >
                      Tambah Tugas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </DragDropContext>
          {editItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                  Edit Tugas
                </h2>
                <input
                  type="text"
                  placeholder="Isi tugas..."
                  className="w-full p-2 border rounded text-black mb-2"
                  value={editedTask.content}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, content: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="w-full p-2 border rounded text-black mb-4"
                  value={editedTask.date}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, date: e.target.value })
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditItem(null)}
                    className="px-4 py-2 rounded bg-gray-400 text-white"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleUpdateItem}
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
