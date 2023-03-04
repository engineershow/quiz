<template>
  <div class="option-item" @click="selectOption()" :class="{ '--selected': option.id === selectedNumber }">
    {{ option.answer }}
  </div>
</template>

<script>
export default {
  name: "OptionItem",
  props: {
    option: {
      type: Object,
      required: true
    },
    selectedNumber: {
      type: Number,
      required: false
    }
  },
  methods: {
    selectOption() {
        // 親クラス(QuizView)の@selectOptionを呼出
        this.$emit('selectOption');
    }
  }
}
</script>

<style lang="scss" scoped>
.option-item {
  margin-left: 30px;
  margin-right: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #DFE3E8;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: bold;

  // .option-item:hoverと同じ（アンパサンド）
  &:hover {
      transform: scale(1.03, 1.05);
  }

  // .option-item.--selectedと同じ（アンパサンド）
  &.--selected {
    background: #9999FF;
  }
}
</style>