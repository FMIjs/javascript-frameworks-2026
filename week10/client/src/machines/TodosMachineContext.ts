import { createActorContext } from '@xstate/react'
import { todosMachine } from './todosMachine'

export const TodosMachineContext = createActorContext(todosMachine)
