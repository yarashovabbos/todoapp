// Redux-ni import qilish
const { createStore } = require('redux');

// Todo harakatlar
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const LIST_TODOS = 'LIST_TODOS';

// Harakat yaratuvchilari
const addTodo = (task) => ({
  type: ADD_TODO,
  payload: { task },
});

const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});

const updateTodo = (id, task) => ({
  type: UPDATE_TODO,
  payload: { id, task },
});

const listTodos = () => ({
  type: LIST_TODOS,
});

// Todo reduktor
const initialState = {
  todos: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = {
        id: state.todos.length + 1,
        task: action.payload.task,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, task: action.payload.task }
            : todo
        ),
      };
    case LIST_TODOS:
      console.log('Current Todos:');
      state.todos.forEach(todo => {
        console.log(`ID: ${todo.id}, Task: ${todo.task}`);
      });
      return state;
    default:
      return state;
  }
}

// Redux do'konini yaratish
const store = createStore(todoReducer);

// Redux do'koniga obuna bo'lish
store.subscribe(() => {
  // Redux do'konidagi har qanday o'zgarishdan keyin consolda chiqarish
  store.dispatch(listTodos());
});

// CRUD amallarini 
store.dispatch(addTodo('Buy groceries'));
store.dispatch(addTodo('Walk the dog'));
store.dispatch(addTodo('Do homework'));
store.dispatch(removeTodo(2));
store.dispatch(updateTodo(3, 'Complete Redux tutorial'));
