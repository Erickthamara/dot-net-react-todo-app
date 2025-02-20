import axios from 'axios';
import { toDoItem } from '@/routes/TodoApp';

const tasksUrl = 'https://localhost:7151/api/ToDoItems';
const apiClient = axios.create({
    baseURL: tasksUrl, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': ''
    },
});

export const fetchTasks = async () => {
    const response = await apiClient.get(tasksUrl);
    return response.data as toDoItem[];
};

export const addTask = async (task: { description: string }) => {
    const response = await apiClient.post('/tasks', task);
    return response.data;
};

// export const deleteTask = async (taskId: number) => {
//   const response = await apiClient.delete(`/tasks/${taskId}`);
//   return response.data;
// };

// export const updateTask = async (taskId: number, task: { isComplete: boolean }) => {
//   const response = await apiClient.put(`/tasks/${taskId}`, task);
//   return response.data;
// };
