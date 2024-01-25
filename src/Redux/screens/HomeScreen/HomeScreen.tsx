import {RootState} from '@reduxjs/toolkit/query';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Task,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, removeTask} from '../../store/user/taskReducer';

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const tasks = useSelector((state: any) => state.tasks);
  const Space = () => {
    return <View style={{height: 20}} />;
  };
  const addNewTask = () => {
    if (newTask === '') return;

    //@ts-ignore
    const task: Task = {id: Date.now(), text: newTask};
    //@ts-ignore
    dispatch(addTask(task));
    setNewTask('');
  };

  const handleRemoveTask = (taskId: number) => {
    dispatch(removeTask(taskId));
  };
  return (
    <View>
      <Text style={{textAlign: 'center'}}>Todo List</Text>
      <Space />
      <TextInput
        value={newTask}
        onChangeText={text => {
          setNewTask(text);
        }}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          color: 'black',
          fontSize: 14,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
        placeholder="New task"
        placeholderTextColor={'gray'}
      />
      <Space />
      <TouchableOpacity
        onPress={() => addNewTask()}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          paddingVertical: 10,
          width: '50%',
          alignSelf: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>Submit</Text>
      </TouchableOpacity>
      <Space />
      <View>
        <Text>Todo List</Text>
        <Space />
        {tasks.map((item: {id: number; text: string}, index: number) => {
          return (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>{item?.text}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveTask(item?.id)}
                  style={{padding: 5, borderWidth: 1}}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>

              <Space />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default HomeScreen;
