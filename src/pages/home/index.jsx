import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../components/api";

import GerarCards from "../../components/gerarCards";


import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function GerrarHome() {
  const [listaDecontatos, setlistaDecontatos] = useState([
    { email: "", clientee: "", telefone: "", name: "", id: "" },
  ]);

  useEffect(() => {
    api
      .get("http://localhost:3001/contatos/")
      .then((response) => {
        setlistaDecontatos(response.data);
      })
      .catch((err) => {
        console.error("ops!" + err);
      });
  }, [listaDecontatos]);

  const history = useHistory();

  const idDoCliente = history.location.state.mensagem.id;

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    name: yup.string().required("Nome obrigatório"),
    telefone: yup.string().required("telefone obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });


  
  const onSubmitFunction = async (data) => {

    const url = "http://localhost:3001/contatos/" + idDoCliente;

    await api
      .post(url, data)
      // .then((response) => alert("contato adicionado"))
      .catch((err) => {
        alert("ocoreu um erro");
        console.error("ops!" + err);
      });

  };


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="Nome" {...register("name")} />
        {errors.name?.message}
        <br></br>
        <input placeholder="Email" {...register("email")} />
        {errors.email?.message}
        <br></br>
        <input placeholder="telefone" {...register("telefone")} />
        {errors.telefone?.message}
        <br></br>
        <button type="submit">adicionar contato!</button>
      </form>
      <div>
        <GerarCards
          idDoCliente={idDoCliente}
          itens={listaDecontatos}
        ></GerarCards>
      </div>
    </div>
  );
}

export default GerrarHome;
