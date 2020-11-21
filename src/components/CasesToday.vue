<template>
  <div class="cases">
    <p class="text-gray-700 text-xl">
      Gisteren zijn er
      <span class="font-mono text-blue-500 font-bold">{{ newCasesToday }}</span>
      besmettingen gemeld.
    </p>
    <p
      class="text-gray-700 text-xl"
      v-if="caseDifference.direction !== 'equal'"
    >
      Dat zijn er
      <span
        class="font-mono font-bold"
        :class="{
          'text-green-500': caseDifference.direction === 'up',
          'text-red-500': caseDifference.direction === 'down'
        }"
        >{{ caseDifference.number }}</span
      >
      <span v-if="caseDifference.direction === 'up'"> minder</span>
      <span v-if="caseDifference.direction === 'down'"> meer</span>
      dan de dag ervoor!
      <span v-if="caseDifference.direction === 'down'"> 😫</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "CasesToday",
  props: {
    newCasesToday: Number,
    newCasesYesterday: Number
  },
  data() {
    return {};
  },
  computed: {
    caseDifference() {
      let diff = this.newCasesYesterday - this.newCasesToday;
      if (diff > 0) {
        return { direction: "up", number: diff };
      } else if (diff < 0) {
        return { direction: "down", number: Math.abs(diff) };
      } else return { direction: "equal", number: diff };
    }
    // updatedCasesToday: function() {
    //   this.casesToday = 6343;
    //   return this.casesToday;
    // }
  }
};
</script>
