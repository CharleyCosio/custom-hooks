import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer";

export const useTodo = () => {
  
    const initialState = [
        // {
        //     id: new Date().getTime(),
        //     description: 'Recolectar la piedra del tiempo',
        //     done: false
        // },
        ];
        //Esta funcion es el tercer parametro del hook reducer y
        // es el estado inicial del arreglo de objeto lo mismo
        //que haciamos arriba en initialState pero en una funcion
        //que toda los datos del localStorage se pude hacer de ambas formas
        const init=()=>{
            return JSON.parse(localStorage.getItem('todos')) || [];
        }

        const [todos, dispatch] = useReducer(todoReducer, initialState,init)

        useEffect(() => {
          localStorage.setItem('todos', JSON.stringify(todos))
        }, [todos])
        
    
        const handleNewTodo = (todo) => {
            const action={
                type: '[TODO] Add Todo',
                payload: todo
            }
    
            dispatch(action);
        }
        const handleDeleteTodo = (id) => {
            const action={
                type: '[TODO] Remove Todo',
                payload: id
            }
    
            dispatch(action);
        }
        const handleToggleTodo = (id) => {
            dispatch({
                type: '[TODO] Toggle Todo',
                payload: id
            });
        }

        const todosCount=todos.length;
        const pendingTodosCount=todos.filter(todo=>!todo.done).length;
    
  
    return {
        todos,
        todosCount,
        pendingTodosCount,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo
    }
}
