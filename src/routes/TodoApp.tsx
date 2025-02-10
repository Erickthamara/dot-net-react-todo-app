import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

interface toDoItem {
  readonly taskId: number;
  description: string;
  isComplete: boolean;
  dateToComplete?: Date;
}

const tasks: toDoItem[] = [
  {
    taskId: 1,
    description: "Wash Clothes",
    isComplete: true,
  },
  {
    taskId: 2,
    description: "Clean my Room",
    isComplete: false,
  },
  {
    taskId: 3,
    description: "Take some protein shake before ",
    isComplete: false,
  },
  {
    taskId: 4,
    description: "Cut my nails",
    isComplete: false,
  },
];

export const Route = createFileRoute("/TodoApp")({
  component: TodoApp,
});

function TodoApp() {
  const [taskItems, settaskItem] = useState(tasks);
  const handleNewTask = (formdata: FormData) => {
    const newTask = formdata.get("task") as string;
    if (!newTask.trim()) return; // Prevent empty tasks
    const newTaskItem: toDoItem = {
      taskId: taskItems.length + 1,
      description: newTask,
      isComplete: false,
    };

    if (newTask != null) {
      settaskItem((prev) => [...prev, newTaskItem]);
    }
  };

  const handleDeleteItem = (taskId: number) => {
    const newTaskList = taskItems.filter((item) => {
      return item.taskId != taskId;
    });
    settaskItem(newTaskList);
  };

  const handleCompleteItem = (taskId: number) => {
    let editedList: toDoItem[] = [];

    taskItems.map((item) => {
      if (item.taskId == taskId) {
        item = { ...item, isComplete: !item.isComplete };
      }
      editedList = editedList.concat(item);
    });

    settaskItem(editedList);
  };
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
            {taskItems.map((item) => {
              const { taskId, description, isComplete } = item;
              return (
                <li
                  className="flex gap-2 justify-between items-center"
                  key={taskId}
                >
                  <input
                    type="checkbox"
                    onClick={() => handleCompleteItem(taskId)}
                    checked={isComplete}
                  />
                  <span className={isComplete ? "line-through" : undefined}>
                    {description}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(taskId)}
                    // onSubmit={() => console.log(`Hello world`)}
                  >
                    <FaTrashAlt />
                  </button>
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
