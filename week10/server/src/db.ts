import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017'
const MONGO_DB = process.env.MONGO_DB ?? 'todos'

export async function connectDb(): Promise<void> {
  await mongoose.connect(MONGO_URL, { dbName: MONGO_DB })
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect()
}

export function describeConnection(): string {
  return `${MONGO_URL}/${MONGO_DB}`
}
