/** Firestore collection id for course documents. */
export const COURSES_COLLECTION = 'courses';

/** Shape stored under each document in `courses` (the document id is the course id). */
export interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
}

/** Seed payloads written when the collection is empty (ids assigned by Firestore). */
export const SAMPLE_COURSES: Omit<Course, 'id'>[] = [
  {
    name: 'JavaScript Frameworks',
    description: 'Single-page applications with Angular and related tooling.',
    credits: 6,
  },
  {
    name: 'Web APIs & Node.js',
    description: 'HTTP, REST, and server-side JavaScript fundamentals.',
    credits: 5,
  },
  {
    name: 'Advanced TypeScript',
    description: 'Types, generics, and patterns for large applications.',
    credits: 4,
  },
];
