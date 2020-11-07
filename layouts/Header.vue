<template>
  <header>
    <nav-bar></nav-bar>
  </header>
</template>

<script>
import NavBar from "../components/NavBar";
export default {
name: "Header",
  components: {NavBar}
}
</script>

<style scoped>

header {
  background-color: #17a2b8;
  position: fixed;
  min-height: 80px;
  width: 100%;
  z-index: 1000;
  border-bottom: .0625rem solid rgba(0, 0, 0, .05);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .2375rem 2.5rem;
  top: 0;
}

@media (max-width: 720px) {
  header {
    display: block;
  }

}


</style>
