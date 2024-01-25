import {createSlice} from '@reduxjs/toolkit';

export interface Task {
  id: number;
  text: string;
}

export type TodoState = {
  tasks: Task[];
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: [] as Task[],
  },
  reducers: {
    onAddTask: (state, action: {payload: Task}) => {
      state.tasks = [...state.tasks, action.payload];
    },
    onRemoveTask: (state, action: {payload: number}) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const {onAddTask, onRemoveTask} = todoSlice.actions;

export default todoSlice.reducer;
