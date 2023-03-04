import { defineStore } from 'pinia';

export const useSelectedNumbers = defineStore('selectedNumbers', {
  state: () => ({
    selectedNumbers: [
      {"id": 1, selectedNumber: null},
      {"id": 2, selectedNumber: null},
      {"id": 3, selectedNumber: null},
      {"id": 4, selectedNumber: null},
      {"id": 5, selectedNumber: null},
      {"id": 6, selectedNumber: null},
      {"id": 7, selectedNumber: null},
      {"id": 8, selectedNumber: null},
      {"id": 9, selectedNumber: null},
      {"id": 10, selectedNumber: null}
    ]
  }),
  actions: {
    setSelectedNumber(selectedNumberId, selectedNumber) {
      this.selectedNumbers[selectedNumberId].selectedNumber = selectedNumber;
    },
    initializeState() {
      this.selectedNumbers = [
        {"id": 1, selectedNumber: null},
        {"id": 2, selectedNumber: null},
        {"id": 3, selectedNumber: null},
        {"id": 4, selectedNumber: null},
        {"id": 5, selectedNumber: null},
        {"id": 6, selectedNumber: null},
        {"id": 7, selectedNumber: null},
        {"id": 8, selectedNumber: null},
        {"id": 9, selectedNumber: null},
        {"id": 10, selectedNumber: null}
      ]
    }
  },
})