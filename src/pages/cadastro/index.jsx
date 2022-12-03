// import { useState } from "react";
import { useHistory } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../components/api";

function GerrarCadastro() {

  const history = useHistory()

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
    await api.post("http://localhost:3001/cliente/",data)
      .then((response) =>history.push('/home/',{"mensagem":response.data}))
      .catch((err) => {
        alert("ocoreu um erro tente outro email");
        console.error("ops!" + err);
      });
  };

  return (
    <div>
      <h3>cadastro cliente</h3>
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
        <button type="submit">Cadastrar!</button>
      </form>
      {/* <button onClick={() =>{}}>login</button> */}
    </div>
  );
}

export default GerrarCadastro;
