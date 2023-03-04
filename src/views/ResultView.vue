<template>
  <div class="result_title">
    <h1>結果</h1>
    <h1>{{ resultScore }} / {{ totalQuizNumber }}</h1>
  </div>
  <div class="result_body">

    <button @click="goHomePage()">Home</button>
  </div>
</template>

<script>
import { useSelectedNumbers } from '../store/selectedNumbers';
import { computed } from 'vue';
import { quizzes } from "../assets/quiz";
import { useRouter } from 'vue-router'

export default {
  name: 'ResultView',
  setup() {
    const store = useSelectedNumbers();
    const resultScore = computed(() => calculateResultScore(store.selectedNumbers));
    const totalQuizNumber = computed(() => quizzes.length);
    const router = useRouter();

    function calculateResultScore(selectedNumbers) {
      let score = 0;
      for(let i=0; i<10; i++) {
        if(quizzes[i].options[selectedNumbers[i].selectedNumber - 1].correct) {
          score++;
        }
      }
        return score;
    }

      function goHomePage() {
        router.push({
          name: 'home',
        })
      }

    return {
      resultScore,
      totalQuizNumber,
      goHomePage,
      store
    }

  }
}
</script>

<style lang="scss">
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