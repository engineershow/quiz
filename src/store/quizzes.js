import { defineStore } from 'pinia';

export const useQuizzes = defineStore('quizzes', {
  state: () => ({
    quizzes: []
  }),
  actions: {
    setQuizzes(quizzes) {
      this.quizzes = quizzes;
    }
  },
})