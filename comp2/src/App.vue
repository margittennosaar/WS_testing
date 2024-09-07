<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
      <img class="logo" src="@/assets/images/logo.png" height="55">
      <RouterLink
        :to="''"
      >
        Kirjaudu
      </RouterLink>
  </nav>
  <RouterView />
  <footer>
     <p> &copy; Taitaja 2024</p>
  </footer>
</template>

<style scoped>

nav {
  width: 100%;
  height: 75px;
  font-size: var(--text-size);
  text-align: center;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  background-color: var(--main-color);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: var(--white);
  align-self: center
}
.logo{
  padding: 5px;
}

footer{
  background-color: var(--main-color);
  height: 75px;
  color: var(--white);
  padding: 1rem;
}

</style>
