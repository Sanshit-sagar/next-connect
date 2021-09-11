import React from "react";

import { atom, useAtom } from "jotai"
import { useUpdateAtom } from "jotai/utils"
import type { PrimitiveAtom } from 'jotai'

import { Cross2Icon } from '@radix-ui/react-icons'
import { a, useTransition } from '@react-spring/web'

import { Radio, RadioGroup } from '../../../compositions/RadioGroup'

import { Text } from '../../../primitives/Text'
import { Flex } from '../../../primitives/Flex'
import { TextField } from '../../../primitives/TextField'
import { IconButton } from '../../../primitives/IconButton'
import { LargeControlGroup } from '../../../primitives/FieldSet'

type Todo = {
    title: string
    completed: boolean
}

const filterAtom = atom('all')
const todosAtom = atom<PrimitiveAtom<Todo>[]>([])
const filteredAtom = atom<PrimitiveAtom<Todo>[]>((get) => {
  const filter = get(filterAtom)
  const todos = get(todosAtom)
  if (filter === 'all') return todos
  else if (filter === 'completed')
    return todos.filter((atom) => get(atom).completed)
  else return todos.filter((atom) => !get(atom).completed)
})

type RemoveFn = (item: PrimitiveAtom<Todo>) => void
type TodoItemProps = {
  atom: PrimitiveAtom<Todo>
  remove: RemoveFn
}

const TodoItem = ({ atom, remove }: TodoItemProps) => {
  const [item, setItem] = useAtom(atom)
  const toggleCompleted = () =>
    setItem((props) => ({ ...props, completed: !props.completed }))
  return (
   
        <Flex css={{ width: '100%', fd: 'row', jc: 'flex-start', ai: 'flex-start', gap: '$2' }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={toggleCompleted}
            />

            <Text>
                <span style={{ textDecoration: item.completed ? 'line-through' : '' }}>
                    {item.title}
                </span>
            </Text>

            <IconButton variant='ghost' onClick={() =>  remove(atom)}>
                <Cross2Icon />
            </IconButton>

        </Flex>
  )
}


const Filter = () => {
    const [filter, setFilter] = useAtom(filterAtom)

    return (
        <RadioGroup 
            label={'Status'}
            value={filter}
            onChange={(updatedFilter: string) => setFilter(updatedFilter)}
            orientation={'horizontal'}
        > 
        <div style={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 
'flex-start' }}>
                <Radio value="all">All</Radio>
                <Radio value="completed">Completed</Radio>
                <Radio value="incompleted">Incompleted</Radio>
            </div>
        </RadioGroup>
    );
}


type FilteredType = {
    remove: RemoveFn
}
const Filtered = (props: FilteredType) => {
    const [todos] = useAtom(filteredAtom)
    const transitions = useTransition(todos, {
        keys: (todo) => todo.toString(),
        from: { opacity: 0, height: 0 },
        enter: { opacity: 1, height: 40 },
        leave: { opacity: 0, height: 0 },
    })

    return transitions((style, atom) => (
      <a.div className="item" style={style}>
        <TodoItem atom={atom} {...props} />
      </a.div>
    ))
  }
  
const TodoList = () => {
    const [inputValue, setInputValue] = React.useState('')

    const setTodos = useUpdateAtom(todosAtom)

    const remove: RemoveFn = (todo) => setTodos((prev) => prev.filter((item) => item !== todo))

    const add = () => {
        const title = inputValue
        setInputValue('')
        setTodos((prev) => [...prev, atom<Todo>({ title, completed: false })])
    }

    return (
        <Flex css={{ fd: 'column', jc: 'flex-start', ai: 'stretch', gap: '$2'}}>
            
            <Filter />

            <LargeControlGroup>
                <Flex css={{ fd: 'row', jc: 'space-between', ai: 'center', gap: '$2' }}>
                    <TextField 
                        name="inputTitle" 
                        placeholder="Type ..." 
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.currentTarget.value)}
                        autoComplete="off" 
                        style={{ width: '300px', height: '20px' }}
                    />
                    <button onClick={() => add()}> + </button>
                </Flex>
            </LargeControlGroup>

            <Filtered remove={remove} />
        </Flex>
    )
}

export const AlternateUrls = () => <TodoList />;
