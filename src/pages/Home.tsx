import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList, EditTask } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function validateTaskTitle(title: string) {
    if (tasks.some((task) => task.title === title)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

      return false;
    }

    return true;
  }

  function handleAddTask(newTaskTitle: string) {
    if (!validateTaskTitle(newTaskTitle)) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleEditTask(editTask: EditTask) {
    const { taskId, taskNewTitle } = editTask;

    if (!validateTaskTitle(taskNewTitle)) return false;

    const newList = tasks.map((task) => {
      return task.id === taskId ? { ...task, title: taskNewTitle } : task;
    });

    setTasks(newList);

    return true;
  }

  function handleToggleTaskDone(id: number) {
    const newList = tasks.map((task) => {
      return task.id === id ? { ...task, done: !task.done } : task;
    });

    setTasks(newList);
  }

  function handleRemoveTask(id: number) {
    const newList = tasks.filter((task) => task.id !== id);

    setTasks(newList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
