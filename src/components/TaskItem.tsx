import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import cancelIcon from "../assets/icons/cancel/cancel.png";

import { EditTask, Task } from "./TasksList";

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (editTask: EditTask) => boolean;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  editTask,
  removeTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const inputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    const result = editTask({ taskId: task.id, taskNewTitle: taskTitle });

    if (result) {
      setIsEditing(false);

      return;
    }

    setTaskTitle(task.title);
  }

  function handleRemove() {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [{ text: "Não" }, { text: "Sim", onPress: () => removeTask(task.id) }]
    );
  }

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
    else inputRef.current?.blur();
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={inputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.taskOptions}>
        {isEditing ? (
          <TouchableOpacity
            testID={`cancel-${index}`}
            style={{
              paddingHorizontal: 12,
              justifyContent: "center",
            }}
            onPress={handleCancelEditing}
          >
            <Image source={cancelIcon} style={{ marginRight: 5 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`edit-${index}`}
            style={{ paddingHorizontal: 12 }}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View
          style={{ width: 1, height: 24, backgroundColor: "#C4C4C4" }}
        ></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{
            paddingHorizontal: 12,
            opacity: isEditing ? 0.2 : 1,
          }}
          onPress={handleRemove}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 0,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  taskOptions: {
    flexDirection: "row",
    paddingRight: 12,
  },
});
