import { createActorContext } from '@xstate/react'
import { uiMachine } from './uiMachine'

export const UiMachineContext = createActorContext(uiMachine)
