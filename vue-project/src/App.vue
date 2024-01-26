<script setup>
import FormData from './components/FormData.vue'
</script>

<template>
  <header>
    <div class="bg-gray-100 border-b-0 rounded-tl-lg rounded-tr-lg border-solid border-2 p-2">
      <h1 class="text-2xl text-gray-900 font-medium">Form Data</h1>
    </div>
  </header>
  <main>
    <FormData />
  </main>
</template>

<style scoped>
header {
  display: flex;
  line-height: 1.5;
}

header div {
  margin-left: 5px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    /* display: flex; */
    place-items: center;
    justify-content: center;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
