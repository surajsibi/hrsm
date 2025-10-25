import { axiosPublic } from '@/lib/axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (): Promise<{
  success: boolean;
  data?: Todo[] | undefined;
  error?: unknown;
}> => {
  try {
    const { data } = await axiosPublic.get('https://jsonplaceholder.typicode.com/todos');

    return { success: true, data };
  } catch (error) {
    console.error('Fetch todos failed:', error);

    return { success: false, error };
  }
};
