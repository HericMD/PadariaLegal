<script setup>
import { ref, onMounted } from "vue";

import produtosApi from "@/api/produtos";

const produtos = ref([]);

onMounted(async () => {
  await carregarProdutos();
});

const carregarProdutos = async () => {
  const data = await produtosApi.buscarTodosOsProdutos();
  produtos.value = data;
};

const excluirProduto = async (produto) => {
  try {
    await produtosApi.excluirProduto(produto);
    await carregarProdutos();
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
  }
};
</script>

<template>
  <div class="container">
    <div v-for="produto in produtos" :key="produto.id" class="card">
      <img :src="produto.cover.url" :alt="produto.nome" />
      <div>
        <h3>{{ produto.nome }}</h3>
        <div>
          <p>R${{ produto.preco }} por {{ produto.unidade }}</p>
        </div>
        <p>{{ produto.categoria }}</p>
      </div>
      <button @click="excluirProduto(produto)">excluir</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 22.5%;
  height: 230px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: black;
}

img {
  max-width: 100px;
}
</style>
