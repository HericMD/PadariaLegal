<script>

import CarrinhosApi from "@/api/carrinhos";
const carrinhosApi = new CarrinhosApi();

import UsuariosApi from "@/api/usuarios";
const usuariosApi = new UsuariosApi();

import produtosApi from "@/api/produtos";
// const produtosApi = new ProdutosApi();

import EnderecosApi from "@/api/enderecos";
const enderecosApi = new EnderecosApi();

export default {
  data() {
    return {
      carrinhos: [],
      carrinho: {},
      usuarios: [],
      usuario: {},
      produtos: [],
      produto: {},
      enderecos: [],
      endereco: {},
    };
  },
  async created() {
    this.carrinhos = await carrinhosApi.buscarTodosOsCarrinhos();
    this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
    this.produtos = await produtosApi.buscarTodosOsProdutos();
    this.enderecos = await enderecosApi.buscarTodosOsEnderecos();
  },
  methods: {
    async salvar() {
      if (this.carrinho.id) {
        await carrinhosApi.atualizarCarrinho(this.carrinho);
      } else {
        await carrinhosApi.adicionarCarrinho(this.carrinho);
      }
      this.carrinho = {};
      this.carrinhos = await carrinhosApi.buscarTodosOsCarrinhos();
    },
    editar(carrinho) {
      Object.assign(this.carrinho, carrinho);
    },
    async excluir(carrinho) {
      await carrinhosApi.excluirCarrinho(carrinho.id);
      this.carrinhos = await carrinhosApi.buscarTodosOsCarrinhos();
    },
  },
};
</script>

<template>
  <h1>Carrinhos</h1>
  <hr />
  <div class="container">
    <div v-for="carrinho in carrinhos" :key="carrinho.id" class="card">
      <p>Id: {{ carrinho.id }}</p>
      <p>Endereço:</p>
      <p>Cep: {{ carrinho.cep }}</p>
      <p>Número: {{ carrinho.numero }}</p>
      <p>Complemento: {{ carrinho.complemento }}</p>
      <!-- <div v-for="item in itens" :key="item.id">
        <p>Id: {{ item.id }}</p>
      </div> -->
      <button @click="excluir(carrinho)">Entregue</button>
    </div>
  </div>
</template>

<style></style>
