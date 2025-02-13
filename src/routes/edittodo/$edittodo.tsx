import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/edittodo/$edittodo")({
  component: EditTask,
  loader: async ({ params }) => {
    try {
      const response = await axios.get(
        `https://localhost:7151/api/ToDoItems/${params.edittodo}`
      );
      const data = await response.data;
      console.log(data);
      return {
        edittodo: params.edittodo,
        description: data.name,
        isComplete: data.isComplete,
      };

      // const {name,id,isComplete}=data;
    } catch (error) {
      console.error(error);
      return {
        edittodo: params.edittodo,
        description: "",
        isComplete: false,
      };
    }
  },
});

function EditTask() {
  //   const { description, isComplete } = Route.useSearch();
  const { edittodo, description, isComplete } = Route.useLoaderData();

  const handlesubmit = (formdata: FormData) => {
    console.log(`Task: ${formdata.get("task")}`);
  };
  return (
    <div>
      <form action={handlesubmit} className="flex flex-col">
        <label htmlFor="">Task</label>
        <input type="text" name="task" value={description} />
        <label htmlFor="">Is Complete</label>
        <input type="checkbox" checked={isComplete} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
