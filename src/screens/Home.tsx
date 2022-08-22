import { FC, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'
import Checkbox from 'expo-checkbox'
import useTodos from '../hooks/use-todos'

import type { Todo } from '../types'

const TodoForm = () => {
  const addTodo = useTodos((state) => state.addTodo)
  const [todo, setTodo] = useState('')

  return (
    <View style={styles.formWrapper}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          value={todo}
          multiline
          numberOfLines={4}
          placeholder="Add your todo"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setTodo(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addTodo({
            id: Math.floor(Math.random() * 1000),
            name: todo,
            completed: false,
          })
          setTodo('')
        }}
      >
        <Text style={{ textAlign: 'center' }}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

const TodoListItem: FC<{ todo: Todo }> = ({ todo }) => {
  const { toggleTodo, removeTodo } = useTodos()

  return (
    <View style={styles.todoItemWrapper}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Checkbox
          value={todo.completed}
          onValueChange={() => toggleTodo(todo.id)}
          style={styles.todoItemCheckbox}
          color="#8b5cf6"
        />
        <Text
          style={[
            styles.todoItemText,
            {
              textDecorationLine: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'grey' : 'white',
            },
          ]}
        >
          {todo.name}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => {
          removeTodo(todo.id)
        }}
      >
        <Text style={{ textAlign: 'center' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

const TodoLists = () => {
  const todos = useTodos((state) => state.todos)

  return (
    <>
      <View style={{ paddingVertical: 30 }}>
        <Text style={{ fontSize: 22, fontWeight: '700' }}>My Todos</Text>
      </View>

      {todos.length > 0 ? (
        <ScrollView style={{ minHeight: 300, height: 'auto' }}>
          <FlatList
            data={todos}
            renderItem={({ item }) => <TodoListItem todo={item} />}
          />
        </ScrollView>
      ) : (
        <View
          style={{
            minHeight: 300,
            height: 'auto',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            Looks like you dont have any todo
          </Text>
        </View>
      )}
    </>
  )
}

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TodoLists />
      </View>
      <View style={styles.container}>
        <TodoForm />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
    flex: 1,
    fontSize: 20,
  },
  formWrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputView: {
    flexGrow: 1,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 6,
    borderRadius: 6,
  },
  input: {},
  btn: {
    backgroundColor: '#8b5cf6',
    padding: 6,
    width: 60,
    flexShrink: 0,
    borderRadius: 5,
  },
  todoItemWrapper: {
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 5,
    borderColor: '#fff',
  },
  todoItemCheckbox: {
    marginRight: 10,
    width: 18,
    height: 18,
  },
  todoItemText: {
    fontSize: 16,
    flexGrow: 1,
  },
  removeBtn: {
    backgroundColor: 'red',
    padding: 6,
    flexShrink: 0,
    borderRadius: 5,
  },
})

export default HomeScreen
