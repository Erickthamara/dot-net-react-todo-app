import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import axios from "axios";
import { fetchTasks } from "@/api/todoApi";
import { useQuery } from "@tanstack/react-query";
import { error } from "console";

// const axios = require("axios").default;

export interface toDoItem {
  readonly id: number;
  name: string;
  IsComplete: boolean;
  DueDate?: Date;
}

// const tasks: toDoItem[] = [
//   {
//     taskId: 1,
//     description: "Wash Clothes",
//     isComplete: true,
//   },
//   {
//     taskId: 2,
//     description: "Clean my Room",
//     isComplete: false,
//   },
//   {
//     taskId: 3,
//     description: "Take some protein shake before ",
//     isComplete: false,
//   },
//   {
//     taskId: 4,
//     description: "Cut my nails",
//     isComplete: false,
//   },
// ];

export const Route = createFileRoute("/TodoApp")({
  component: TodoApp,
});

function TodoApp() {
  const [taskItems, settaskItem] = useState<toDoItem[]>([]);

  const { isPending, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTasks,
  });

  // useEffect(() => {
  //   // const fetchTasks = async () => {
  //   //   try {
  //   //     console.log("hello");
  //   //     const response = await axios.get(
  //   //       "https://localhost:7151/api/ToDoItems"
  //   //     );
  //   //     const data = await response.data;
  //   //     settaskItem(data);
  //   //   } catch (error) {
  //   //     console.error(error);
  //   //   }
  //   // };
  //   // fetchTasks();
  //   // const testdata = fetchTasks();
  //   // console.log(testdata);
  // }, []);

  const handleNewTask = (formdata: FormData) => {
    const newTask = formdata.get("task") as string;
    if (!newTask.trim()) return; // Prevent empty tasks
    const newTaskItem: toDoItem = {
      id: taskItems.length + 1,
      name: newTask,
      IsComplete: false,
    };

    if (newTask != null) {
      settaskItem((prev) => [...prev, newTaskItem]);
    }
  };

  const handleDeleteItem = (taskId: number) => {
    const newTaskList = taskItems.filter((item) => {
      return item.id != taskId;
    });
    settaskItem(newTaskList);
    // data = newTaskList;
  };
  // const handleEditItem = (taskId: number) => {
  //   const newTaskList = taskItems.filter((item) => {
  //     return item.taskId != taskId;
  //   });
  //   settaskItem((prev) => [...newTaskList]);
  // };

  const handleCompleteItem = (taskId: number) => {
    let editedList: toDoItem[] = [];

    taskItems.map((item) => {
      if (item.id == taskId) {
        item = { ...item, IsComplete: !item.IsComplete };
      }
      editedList = editedList.concat(item);
    });

    settaskItem(editedList);
  };

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>An console.error occurred: {error.message} </div>;
  return (
    <main>
      <div className=" flex flex-col h-screen gap-3.5 justify-center items-center border border-black border-solid">
        <h2 className="text-5xl font-bold text-green-600 ">To Do App</h2>
        <form
          action={handleNewTask}
          className="flex gap-2 justify-center items-center"
        >
          <input
            className=" border border-black"
            type="text"
            name="task"
            placeholder="eg.Study at 5.00 pm"
          />
          <button type="submit" name="task">
            Add
          </button>
        </form>
        <div>
          <ul className="list-disc list-inside">
            {data.map((item) => {
              const { id, name, IsComplete } = item;
              return (
                <li
                  className="flex gap-2 justify-between items-center"
                  key={id}
                >
                  <input
                    type="checkbox"
                    onClick={() => handleCompleteItem(id)}
                    checked={IsComplete}
                  />
                  <span className={IsComplete ? "line-through" : undefined}>
                    {name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      // onClick={() => handleDeleteItem(taskId)}
                    >
                      <Link
                        to="/edittodo/$edittodo"
                        params={{ edittodo: String(id) }}
                      >
                        <MdModeEdit />
                      </Link>
                    </button>
                    <button type="button" onClick={() => handleDeleteItem(id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}

// export default TodoApp;
