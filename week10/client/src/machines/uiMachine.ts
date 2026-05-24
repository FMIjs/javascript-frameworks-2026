import { setup } from 'xstate'

export type FilterMode = 'all' | 'active' | 'completed'

export const uiMachine = setup({
  types: {
    events: {} as
      | { type: 'form.show' }
      | { type: 'form.hide' }
      | { type: 'filter.all' }
      | { type: 'filter.active' }
      | { type: 'filter.completed' },
  },
  actions: {
    logEnterFilterAll: () => {
      console.log('[uiMachine] entered filter.all')
    },
  },
}).createMachine({
  id: 'ui',
  type: 'parallel',
  states: {
    form: {
      initial: 'idle',
      states: {
        idle: {
          on: { 'form.show': 'editing' },
        },
        editing: {
          on: { 'form.hide': 'idle' },
        },
      },
    },
    filter: {
      initial: 'all',
      on: {
        'filter.all': '.all',
        'filter.active': '.active',
        'filter.completed': '.completed',
      },
      states: {
        all: {
          entry: 'logEnterFilterAll',
        },
        active: {},
        completed: {},
      },
    },
  },
})
