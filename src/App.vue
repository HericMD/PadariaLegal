<template>
  <header>
    <router-link :to="{ name: 'home' }"> Produtos </router-link> 
    <router-link to="/usuarios"> Usuários</router-link>
  </header>
  <main>
    <RouterView />
  </main>
</template>

