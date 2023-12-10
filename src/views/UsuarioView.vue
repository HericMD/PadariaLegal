<script>
import UsuariosApi from "@/api/usuarios";
const usuariosApi = new UsuariosApi();

export default {
  data() {
    return {
      usuarios: [],
      usuario: {},
      mostrarCarrinho: false,
    };
  },
  async created() {
    this.usuarios = await usuariosApi.buscarTodosOsUsuarios();
  },
  methods: {
    verCarrinho(usuario) {
      this.usuario = usuario;
      this.mostrarCarrinho = true;
      if (this.usuario.carrinho && this.usuario.carrinho.item) {
        this.usuario.carrinho.total = this.usuario.carrinho.item.reduce(
          (total, item) => {
            return total + item.produto.preco * item.quantidade;
          },
          0
        );
      } else {
        this.usuario.carrinho.total = 0;
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Usuários</h1>
    <div class="container">
      <div v-for="usuario in usuarios" :key="usuario.id" class="card">
        <p>{{ usuario.id }}</p>
        <img :src="usuario.foto.url" :alt="usuario.nome" />
        <h3>{{ usuario.first_name }} {{ usuario.last_name }}</h3>
        <p>{{ usuario.email }}</p>
        <p>Cpf: {{ usuario.cpf }}</p>
        <p>Telefone: {{ usuario.telefone }}</p>
        <p>Endereço do Usuário:</p>
        <p>CEP: {{ usuario.endereco_usuario?.cep }}</p>
        <p>Complemento: {{ usuario.endereco_usuario?.complemento }}</p>
        <p>Número: {{ usuario.endereco_usuario?.numero }}</p>
        <button @click="verCarrinho(usuario)">Ver carrinho</button>
      </div>
    </div>

    <!-- Modal para ver o carrinho -->
    <div v-if="mostrarCarrinho" class="modal">
      <div class="modal-content">
        <h2>Carrinho de {{ usuario.first_name }} {{ usuario.last_name }}</h2>
        <p>Endereço de entrega:</p>
        <p>Cep: {{ usuario.carrinho.endereco_carrinho?.cep }}</p>
        <p>
          {{ usuario.carrinho.endereco_carrinho?.complemento }}
          {{ usuario.carrinho.endereco_carrinho?.numero }}
        </p>
        <hr />
        <p>Itens:</p>
        <div v-for="item in usuario.carrinho.item" :key="item.id">
          <p>{{ item.produto.nome }} x{{ item.quantidade }}</p>
        </div>
        <hr />
        <p>Valor do carrinho:</p>
        <div v-for="item in usuario.carrinho.item" :key="item.id">
          <p>
            R${{ item.produto.preco }} * {{ item.quantidade }} = R${{
              (item.produto.preco * item.quantidade).toFixed(2)
            }}
          </p>
        </div>
        <p>Total: R${{ usuario.carrinho.total.toFixed(2) }}</p>
        <button @click="mostrarCarrinho = false">Fechar Carrinho</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: black;
}
.container {
  display: flex;
  flex-wrap: wrap;
  color: black;
}

.card {
  width: 22.5%;
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

img {
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
