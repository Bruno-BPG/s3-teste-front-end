import api from "../components/api";

const GerarCards = ({ itens, idDoCliente }) => {
  let itensFiltrados = [];

  for (let i = 0; i < itens.length; i++) {

    if (itens[i].clientee !== null) {
      if (itens[i].clientee.id === idDoCliente) {
        itensFiltrados.push(itens[i]);
      }
    }

  }

  if (itensFiltrados.length === 0) {
    return <div>voce não possui contatos</div>;
  }

    
  const deleteContato = async (idParaDeletar) => {

    const url = "http://localhost:3001/contatos/" + idParaDeletar;

    await api
      .delete(url)
      // .then((response) => alert("contato deletado"))
      .catch((err) => {
        alert("ocoreu um erro");
        console.error("ops!" + err);
      });

  };

  return itensFiltrados.map((produto) => (
    <div className="conteiner" key={produto.id}>
      <span className="card">nome do contato:{produto.name}</span>
      <br></br>
      <span className="card">telefone do contato:{produto.telefone} </span>
      <br></br>
      <span className="card">email do contato:{produto.email} </span>
      <br></br>
      <button onClick={() =>{deleteContato(produto.id)}}>deletar contato</button>
      <br></br>
      <br></br>
    </div>
  ));
};

export default GerarCards;
