<script>
import UsuariosApi from "@/api/usuarios";
const usuariosApi = new UsuariosApi();
import EnderecosApi from "@/api/enderecos";
const enderecosApi = new EnderecosApi();

export default {
  data() {
    return {
      usuarios: [],
      usuario: {},
      enderecos: [],
      endereco: {},
    };
  },
  async created() {
    this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
    this.enderecos = await enderecosApi.buscarTodosOsEnderecos();
  },
  methods: {
    async salvar() {
      if (this.usuario.id) {
        await usuariosApi.atualizarUsuario(this.usuario);
      } else {
        await usuariosApi.adicionarUsuario(this.usuario);
      }
      this.usuario = {};
      this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
    },
    editar(usuario) {
      Object.assign(this.usuario, usuario);
    },
    async excluir(usuario) {
      await usuariosApi.excluirUsuario(usuario.id);
      this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
    },
  },
};
</script>

<template>
  <h1>Usuários</h1>
  <div class="container">
    <div v-for="usuario in usuarios" :key="usuario.id" class="card">
      <p>{{ usuario.id }}</p>
      <img :src="usuario.foto.url" :alt="usuario.nome" />
      <h3>{{ usuario.first_name }} {{ usuario.last_name }}</h3>
      <p>{{ usuario.email }}</p>
      <p>Cpf: {{ usuario.cpf }}</p>
      <p>Telefone: {{ usuario.telefone }}</p>
    </div>
  </div>
</template>

<style>
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
  align-items: center;
  min-width: 210px;
}
img{
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
</style>
