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
    isComplete: false,
  },
  {
    taskId: 2,
    description: "Clean my Room",
    isComplete: false,
  },
  {
    taskId: 3,
    description: "Take some protein",
    isComplete: false,
  },
];

const TodoApp = () => {
  return (
    <main>
      <div>
        <h2 className="text-3xl">To Do List</h2>
      </div>
    </main>
  );
};

export default TodoApp;
