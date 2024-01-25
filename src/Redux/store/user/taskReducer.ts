import {Reducer} from 'redux';

// Define the task interface
interface Task {
  id: number;
  text: string;
}

// Define the initial state
interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

// Define the reducer function
const taskReducer: Reducer<TaskState, TaskAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {...state, tasks: [...state.tasks, action.payload]};
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export default taskReducer;

// Define action types and action creators
type TaskAction =
  | {type: 'ADD_TASK'; payload: Task}
  | {type: 'REMOVE_TASK'; payload: number};

export const addTask = (task: Task): TaskAction => ({
  type: 'ADD_TASK',
  payload: task,
});

export const removeTask = (taskId: number): TaskAction => ({
  type: 'REMOVE_TASK',
  payload: taskId,
});
