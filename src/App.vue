<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import Library from './components/Library.vue';
// import TheWelcome from './components/TheWelcome.vue'
import Auth from './components/books.vue'

const msge = "hello world"

</script>

<template>
  <div class="container">
    <header>
      <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div> -->

      <!-- <HelloWorld msg="You did it!"/> -->
    </header>

    <main>
      <!-- <TheWelcome /> -->
      <!-- <span>Message: {{ msge }}</span> -->
      <!-- <ElImage src="http://localhost:8080/mypic/person_10.jpg"></ElImage> -->

      <!-- <Library/> -->

      <auth msg="Welcome to the Library"/>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
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
