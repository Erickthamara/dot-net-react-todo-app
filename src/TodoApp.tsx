// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "react-query";
// import { FaTrashAlt } from "react-icons/fa";
// import { MdModeEdit } from "react-icons/md";
// import { fetchTasks, addTask, deleteTask, updateTask } from "./api/todoApi";

// interface toDoItem {
//   readonly taskId: number;
//   description: string;
//   isComplete: boolean;
//   dateToComplete?: Date;
// }

// const TodoApp = () => {
//   const queryClient = useQueryClient();
//   const { data: taskItems = [], refetch } = useQuery("tasks", fetchTasks);

//   const addTaskMutation = useMutation(addTask, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("tasks");
//     },
//   });

//   const deleteTaskMutation = useMutation(deleteTask, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("tasks");
//     },
//   });

//   const updateTaskMutation = useMutation(updateTask, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("tasks");
//     },
//   });

//   const handleNewTask = (formdata: FormData) => {
//     const newTask = formdata.get("task") as string;
//     if (!newTask.trim()) return; // Prevent empty tasks
//     addTaskMutation.mutate({ description: newTask });
//   };

//   const handleDeleteItem = (taskId: number) => {
//     deleteTaskMutation.mutate(taskId);
//   };

//   const handleCompleteItem = (taskId: number) => {
//     const task = taskItems.find((item: toDoItem) => item.taskId === taskId);
//     if (task) {
//       updateTaskMutation.mutate(taskId, { isComplete: !task.isComplete });
//     }
//   };

//   return (
//     <main>
//       <div className=" flex flex-col h-screen gap-3.5 justify-center items-center border border-black border-solid">
//         <h2 className="text-5xl font-bold text-green-600 ">To Do App</h2>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             const formdata = new FormData(e.currentTarget);
//             handleNewTask(formdata);
//           }}
//           className="flex gap-2 justify-center items-center"
//         >
//           <input
//             className=" border border-black"
//             type="text"
//             name="task"
//             placeholder="eg.Study at 5.00 pm"
//           />
//           <button type="submit" name="task">
//             Add
//           </button>
//         </form>
//         <div>
//           <ul className="list-disc list-inside">
//             {taskItems.map((item: toDoItem) => {
//               const { taskId, description, isComplete } = item;
//               return (
//                 <li
//                   className="flex gap-2 justify-between items-center"
//                   key={taskId}
//                 >
//                   <input
//                     type="checkbox"
//                     onClick={() => handleCompleteItem(taskId)}
//                     checked={isComplete}
//                   />
//                   <span className={isComplete ? "line-through" : undefined}>
//                     {description}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => handleDeleteItem(taskId)}
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default TodoApp;
