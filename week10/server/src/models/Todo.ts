import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from 'mongoose'

const todoSchema = new Schema(
  {
    text: { type: String, required: true, trim: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
)

export type TodoAttrs = InferSchemaType<typeof todoSchema>
export type TodoDoc = HydratedDocument<TodoAttrs>

export const TodoModel = model('Todo', todoSchema)
