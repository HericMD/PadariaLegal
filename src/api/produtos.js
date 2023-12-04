// import axios from 'axios';
import api from "../plugins/api";

class ProdutoApi {
  async buscarTodosOsProdutos() {
    const response = await api.get("/produto/");
    return response.data;
  }
  async adicionarProduto(produto) {
    let response;
    if (produto.id) {
      response = await api.put(`/produto/${produto.id}/`, produto);
    } else {
      response = await api.post("/produto/", produto);
    }
    return response.data;
  }
  async excluirProduto(produto) {
    const response = await api.delete(`/produto/${produto.id}/`);
    return response.data;
  }
  async editarProduto(produto) {
    if (produto.id) {
      const response = await api.put(`/produto/${produto.id}/`, produto);
      return response.data;
    } else {
      throw new Error("ID do produto não fornecido para edição.");
    }
  }
}

export default new ProdutoApi();
