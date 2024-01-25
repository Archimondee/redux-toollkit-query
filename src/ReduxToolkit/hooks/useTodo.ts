import {useDispatch, useSelector} from 'react-redux';
import {StoreStateType} from '../store';
import {Task, onAddTask, onRemoveTask} from '../store/todo/todoSlice';

export const useTodo = () => {
  const dispatch = useDispatch();
  const {tasks} = useSelector((state: StoreStateType) => state.todo);

  const addTodo = (task: Task) => {
    dispatch(onAddTask(task));
  };

  const removeTodo = (id: number) => {
    dispatch(onRemoveTask(id));
  };

  return {
    addTodo,
    removeTodo,
    tasks,
  };
};
