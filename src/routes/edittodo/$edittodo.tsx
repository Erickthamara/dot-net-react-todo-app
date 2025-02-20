import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { toDoFields, toDoItemSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";

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
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error</div>,
});

function EditTask() {
  const { edittodo, description, isComplete } = Route.useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<toDoFields>({
    resolver: zodResolver(toDoItemSchema),
  });

  const submitAction: SubmitHandler<toDoFields> = async (formdata) => {
    const editedTask = { ...formdata, id: edittodo };
    try {
      await axios.put(
        `https://localhost:7151/api/ToDoItems/${edittodo}`,
        editedTask
      );
      // const data = await response.data;git
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <form onSubmit={handleSubmit(submitAction)} className=" flex flex-col">
        <label htmlFor="">Task</label>
        <input type="text" {...register("name")} defaultValue={description} />
        {errors.name?.message && (
          <p className="text-red-600">{errors.name.message}</p>
        )}
        <label htmlFor="">Is Complete</label>
        <div className="flex gap-2">
          <p>Checked</p>
          <input
            type="checkbox"
            {...register("isComplete")}
            defaultChecked={isComplete}
          />
        </div>
        {isSubmitting ? (
          <Button type="submit" variant="default" disabled={true}>
            Loading....
          </Button>
        ) : (
          <Button type="submit" variant="default">
            Save
          </Button>
        )}
      </form>
    </div>
  );
}
