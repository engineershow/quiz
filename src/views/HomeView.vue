<template>
  <div class="home">
    <h1>10問常識クイズ</h1>
    <h2></h2>
    <button @click="goQuizPage()">Let's Play!</button>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  import { useSelectedNumbers } from '../store/selectedNumbers';
  import { useQuizzes } from '../store/quizzes';
  import axios from 'axios';

  export default {
    name: 'HomeView',
    setup() {
      const router = useRouter();
      const selectedNumbersStore = useSelectedNumbers();
      const quizzesStore = useQuizzes();

      // 選択済みの回答を初期化
      onMounted(() => selectedNumbersStore.initializeState());
      // Quizデータを取得
      onMounted(() => axios.get('http://localhost:8080/api/getAll')
        .then(res => quizzesStore.setQuizzes(res.data))
      );

      // 1問目のページに進む機能
      function goQuizPage() {
        router.push({
          name: 'quiz',
          params: {'quizId': 1}
        })
      }

      return {
        goQuizPage
      }

    }
  }
</script>

<style scoped lang="scss">
button {
  height: 48px;
  background-color: white;
  color: blue;
  border: solid 1px blue;
  border-radius: 2px;
  padding: 0 24px;
  cursor: pointer;

  &:hover {
    background-color: blue;
    color: white;
  }
}
</style>
