import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useTodo} from '../../hooks/useTodo';

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const {tasks, addTodo, removeTodo} = useTodo();
  const Space = () => {
    return <View style={{height: 20}} />;
  };
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask === '') return;
    //@ts-ignore
    const task: Task = {id: Date.now(), text: newTask};
    //@ts-ignore
    addTodo(task);
    setNewTask('');
  };
  return (
    <View>
      <Text style={{textAlign: 'center'}}>Todo List Toolkit</Text>
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
        onPress={() => addTask()}
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
                  onPress={() => removeTodo(item?.id)}
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

const styles = StyleSheet.create({
  container: {},
});
