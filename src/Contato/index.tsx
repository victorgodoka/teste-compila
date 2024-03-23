import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { ContatoWrapper } from "./Contato.styles";

export default function Contato() {
  const contato = useLoaderData() as Contatos;

  return <ContatoWrapper>
    <Link to="/">Voltar</Link>
    <h1>{contato.nome}</h1>
    <p>Tel. Principal: {contato.tel_principal}</p>
    <p>Tel. Celular: {contato.tel_celular}</p>
    <p>Tel. Trabalho: {contato.tel_trabalho}</p>
  </ContatoWrapper>
}
