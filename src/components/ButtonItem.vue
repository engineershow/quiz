<template>
  <button @click="changePage()" :class="{ '--disabled': isBackButtonDisabled === true || isNextButtonDisabled === true}">
    <slot/>
  </button>
</template>

<script>
  export default {
    name: "ButtonItem",
    props: {
      isBackButtonDisabled: {
        type: Boolean,
        required: false
      },
      isNextButtonDisabled: {
        type: Boolean,
        required: false
      }
    },
    methods: {
      // 親クラス(QuizView)の@changePageを呼出
      changePage() {
        this.$emit('changePage');
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

  &.--disabled {
    background-color: gray;
    color: black;
    border: gray;
    cursor: default;
  }
}
</style>