const vueComponentString:string = `
<template>
  <div>
    <button @click="fetchData" :disabled="loading">
      {{ loading ? 'Loading...' : 'Fetch Data' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: null,
      data2: null,
      data3: null,
      loading: false,
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const [response1, response2, response3] = await Promise.all([
          this.fetchFromApi1(),
          this.fetchFromApi2(),
          this.fetchFromApi3()
        ]);
        this.data1 = response1.data;
        this.data2 = response2.data;
        this.data3 = response3.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
`;

export default vueComponentString;
