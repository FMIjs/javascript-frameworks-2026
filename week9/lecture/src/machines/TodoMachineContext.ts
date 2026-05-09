import { createActorContext } from '@xstate/react'
import { todoMachine } from './todoMachine'

export const TodoMachineContext = createActorContext(todoMachine)
