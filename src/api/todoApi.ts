// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'https://your-api-url.com/api', // Replace with your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const fetchTasks = async () => {
//   const response = await apiClient.get('/tasks');
//   return response.data;
// };

// export const addTask = async (task: { description: string }) => {
//   const response = await apiClient.post('/tasks', task);
//   return response.data;
// };

// export const deleteTask = async (taskId: number) => {
//   const response = await apiClient.delete(`/tasks/${taskId}`);
//   return response.data;
// };

// export const updateTask = async (taskId: number, task: { isComplete: boolean }) => {
//   const response = await apiClient.put(`/tasks/${taskId}`, task);
//   return response.data;
// };
