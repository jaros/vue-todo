<template>
  <div id="app">
    <!-- <custom-gallery /> -->
    <task-list />
  </div>
</template>

<script>
// import CustomGallery from "./components/CustomGallery.vue";
import TaskList from "./components/TaskList.vue";
export default {
  name: "app",
  components: {
    // CustomGallery,
    TaskList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
