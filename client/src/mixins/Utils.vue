<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      modelLabel: [
        'Minuit - 4h',
        '4h - 8h',
        '8h - 12h',
        '12h - 16h',
        '16h - 20h',
        '20h - Minuit',
      ],
    };
  },
  methods: {
    twoNumber(number) {
      return (`0${(number)}`).slice(-2);
    },
    chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += 1) {
        const last = chunkedArray[chunkedArray.length - 1];
        if (!last || last.length === size) {
          chunkedArray.push([array[i]]);
        } else {
          last.push(array[i]);
        }
      }
      return chunkedArray;
    },
  },
  computed: {
    ...mapGetters(['getColumn1Datas', 'getColumn2Datas']),
    worstTimeOfPublication() {
      const model = this.modelLabel.map(element => ({
        label: element,
        value: null,
      }));
      let min1 = model.map((el, index) => ({
        label: this.modelLabel[index],
        value: this.chunkArray(this.getColumn1Datas.timeOfPublication, 8).map(tab => tab.reduce((prev, next) => prev + next.value, 0))[index],
      }));
      min1 = min1.find(el => el.value === Math.min(...min1.map(e => e.value)));
      let min2 = model.map((el, index) => ({
        label: this.modelLabel[index],
        value: this.chunkArray(this.getColumn2Datas.timeOfPublication, 8).map(tab => tab.reduce((prev, next) => prev + next.value, 0))[index],
      }));
      min2 = min2.find(el => el.value === Math.min(...min2.map(e => e.value)));
      return [min1, min2];
    },
    bestTimeOfPublication() {
      const model = this.modelLabel.map(element => ({
        label: element,
        value: null,
      }));
      let max1 = model.map((el, index) => ({
        label: this.modelLabel[index],
        value: this.chunkArray(this.getColumn1Datas.timeOfPublication, 8).map(tab => tab.reduce((prev, next) => prev + next.value, 0))[index],
      }));
      max1 = max1.find(el => el.value === Math.max(...max1.map(e => e.value)));
      let max2 = model.map((el, index) => ({
        label: this.modelLabel[index],
        value: this.chunkArray(this.getColumn2Datas.timeOfPublication, 8).map(tab => tab.reduce((prev, next) => prev + next.value, 0))[index],
      }));
      max2 = max2.find(el => el.value === Math.max(...max2.map(e => e.value)));
      return [max1, max2];
    },
  },
};
</script>
