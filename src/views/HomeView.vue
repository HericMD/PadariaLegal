<script setup>
import { ref, reactive, onMounted } from "vue";

import ProdutoList from "@/components/ProdutoList.vue";
import Modal from "@/components/template/Modal.vue";

import ProdutosApi from "@/api/produtos.js";
import CategoriaApi from "@/api/categorias.js";
import imageService from "@/api/imagem.js";

const categorias = ref([]);
const coverUrl = ref("");
const file = ref(null);
const unidades = ref({
  1: "Unidade",
  2: "Kg",
});
const produtoAtual = reactive({
  nome: "",
  categoria: "",
  unidade: "",
  preco: 0,
});

function onFileChange(e) {
  file.value = e.target.files[0];
  coverUrl.value = URL.createObjectURL(file.value);
}

async function salvar() {
  const image = await imageService.uploadImage(file.value);
  produtoAtual.cover_attachment_key = image.attachment_key;
  await ProdutosApi.adicionarProduto(produtoAtual);
  Object.assign(produtoAtual, {
    id: "",
    nome: "",
    unidade: 0,
    preco: 0,
    categoria: "",
    cover_attachment_key: "",
  });
  showForm.value = false;
}

onMounted(async () => {
  const data = await CategoriaApi.buscarTodasAsCategorias();
  categorias.value = data;
});

const showForm = ref(false);
</script>

<template>
  <h1>produto</h1>
  <button @click="showForm = true">Add</button>
  <modal :visible="showForm" @close="showForm = false">
    <template #header>
      <h1>Cadastro de produto</h1>
    </template>
    <template #body>
      <form>
        <div>
          <div>
            <input type="file" @change="onFileChange" />
            <div>
              <img v-if="coverUrl" :src="coverUrl" />
            </div>
          </div>
          <div>
            <input
              type="text"
              id="nome"
              v-model="produtoAtual.nome"
              placeholder="Nome"
            />
          </div>
          <div>
            <input
              type="text"
              id="preco"
              v-model="produtoAtual.preco"
              placeholder="Preço"
            />
          </div>
          <div>
            <select v-model="produtoAtual.categoria">
              <option disabled value="">Selecione uma categoria</option>
              <option
                v-for="categoria in categorias"
                :key="categoria.id"
                :value="categoria.id"
              >
                {{ categoria.descricao }}
              </option>
            </select>
          </div>
          <div>
            <select v-model="produtoAtual.unidade">
              <option disabled value="">Selecione um tipo de unidade</option>
              <option
                v-for="(label, value) in unidades"
                :key="value"
                :value="value"
              >
                {{ label }}
              </option>
            </select>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <div>
        <button @click="showForm = false">Cancelar</button>
        <button @click="salvar">Salvar</button>
      </div>
    </template>
  </modal>
  <ProdutoList />
</template>

