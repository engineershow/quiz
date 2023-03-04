<template>
  <div class="question_title">
    <h1>Q{{ state.quiz.id }} / {{ totalQuizNumber }}</h1>
  </div>
  <div class="question_body">
    <div class="question_sentence">
      <h2>{{ state.quiz.question }}</h2>
    </div>
    <div class="question_options">
      <OptionItem @selectOption="selectOption(option)"
      v-for="option in state.quiz.option"
      :key="option.id"
      :option="option"
      :selectedNumber="state.currentSelectedNumber"
      />
    </div>
  </div>
  <div class="buck_and_forth_buttons">
    <ButtonItem @changePage="changePage(0)" :disabled="state.isBackButtonDisabled" :isBackButtonDisabled="state.isBackButtonDisabled">Back</ButtonItem>
    <ButtonItem @changePage="changePage(1)" :disabled="state.isNextbuttonDisabled"  v-if="state.quiz.id !== totalQuizNumber" :isNextButtonDisabled="state.isNextButtonDisabled">Next</ButtonItem>
    <ButtonItem @changePage="changePage(2)" :disabled="state.isNextbuttonDisabled" :isNextButtonDisabled="state.isNextButtonDisabled" v-else>Result</ButtonItem>
  </div>
</template>
<script>
  // import { quizzes } from "../assets/quiz";
  import { reactive, computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useSelectedNumbers } from '../store/selectedNumbers';
  import { useQuizzes } from '../store/quizzes';
  import OptionItem from "../components/OptionItem"
  import ButtonItem from '../components/ButtonItem';

  export default {
  name: 'QuizView',
  components: { OptionItem, ButtonItem },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const selectedNumbersStore = useSelectedNumbers();
    const quizzesStore = useQuizzes();
    const quizId = computed(() => route.params.quizId);
    const totalQuizNumber = computed(() => quizzesStore.quizzes.length)

    const state = reactive({
      currentSelectedNumber: null,
      isBackButtonDisabled: true,
      isNextButtonDisabled: true,
      quiz: quizzesStore.quizzes[quizId.value - 1],
    })

    function selectOption(option) {
      state.currentSelectedNumber = option.id;
    }

    function changePage(isNext) {
      if(isNext === 1) {
        if(state.currentSelectedNumber){
          selectedNumbersStore.setSelectedNumber(quizId.value - 1, state.currentSelectedNumber);
          router.push({
            name: 'quiz',
            params: {
              quizId: parseInt(quizId.value) + 1
            }
          });
          state.quiz = quizzesStore.quizzes[quizId.value];
          if(selectedNumbersStore.selectedNumbers[quizId.value].selectedNumber) {
            state.currentSelectedNumber = selectedNumbersStore.selectedNumbers[quizId.value].selectedNumber;
          } else {
            state.currentSelectedNumber = null;
          }
        }
      } else if(isNext === 0) {
        router.push({
          name: 'quiz',
          params: {
            quizId: parseInt(quizId.value) - 1
          }
        });
        state.quiz = quizzesStore.quizzes[quizId.value - 2];
        state.currentSelectedNumber = selectedNumbersStore.selectedNumbers[quizId.value - 2].selectedNumber;
      } else {
        if(state.currentSelectedNumber){
          selectedNumbersStore.selectedNumbers[quizId.value - 1].selectedNumber = state.currentSelectedNumber;
          router.push({
            name: 'result',
          });
        }
      }
    }

    function buttonDisabled(isNext) {
      if(isNext === true) {
        if(!state.currentSelectedNumber) {
          state.isNextButtonDisabled = true;
        } else {
          state.isNextButtonDisabled = false;
        }
      } else {
         if(state.quiz.id === 1) {
        state.isBackButtonDisabled = true;
        } else {
          state.isBackButtonDisabled = false;
        }
      }
    }

    watch(() => state.quiz, () => buttonDisabled(false));
    watch(() => state.currentSelectedNumber, () => buttonDisabled(true));

    return {
      selectOption,
      changePage,
      buttonDisabled,
      state,
      quizId,
      totalQuizNumber,
      selectedNumbersStore
    }
  }
}
</script>
<style>

</style>