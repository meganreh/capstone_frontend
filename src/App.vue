<template>
  <div id="app">
    <header id="header">
      <h1>Diddit!</h1>
      <nav class="links">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="jwt"><router-link to="/habits">Habits</router-link></li>
          <li v-if="jwt"><router-link to="/tasks">Tasks</router-link></li>
          <li v-if="!jwt"><router-link to="/signup">Signup</router-link></li>
          <li v-if="!jwt"><router-link to="/login">Login</router-link></li>
          <li v-if="jwt"><router-link to="/logout">Logout</router-link></li>
        </ul>
      </nav>
    </header>

    <section class="wrapper style1 align-center">
      <div class="content"><router-view v-on:theJwtChanged="updateJwt()" /></div>
    </section>
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      jwt: null
    };
  },
  created: function() {
    this.jwt = localStorage.jwt;
  },
  methods: {
    updateJwt: function() {
      this.jwt = localStorage.jwt;
    }
  }
};
</script>
