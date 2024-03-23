import React, { useEffect, useState } from "react";
import { Form, Input, Label, Button, Error } from "./CriarEditarContato.style";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function CriarContato() {
  const navigate = useNavigate();
  const contatoEditado = useLoaderData() as Contatos;

  const [contato, setContato] = useState({
    nome: "",
    tel_principal: "",
    tel_celular: "",
    tel_trabalho: "",
  });

  const [contatoError, setContatoError] = useState({
    nomeError: false,
    tel_principalError: false,
    tel_celularError: false,
    tel_trabalhoError: false,
  });

  useEffect(() => {
    if (contatoEditado) {
      setContato(contatoEditado);
    }
  }, []);

  const handleName = (event: { target: { name: any; value: any } }) => {
    const { value, name } = event.target;

    setContatoError((prevContatoError) => ({
      ...prevContatoError,
      nomeError: !value,
    }));
  };

  const handlePhone = (event: { target: { name: any; value: any } }) => {
    const { value, name } = event.target;
    const regexTel = new RegExp(
      /\+([0-9]{2,3})?([0-9]{2})([0-9]{4,5})([0-9]{4})/
    );

    setContatoError((prevContatoError) => ({
      ...prevContatoError,
      [`${name}Error`]: !regexTel.test(value),
    }));
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setContato((prevContato) => ({
      ...prevContato,
      [name]: value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (Object.values(contatoError).some(val => val === true)) return alert("Há erros no formulário.")
    const data = !contatoEditado
      ? contato
      : {
          ...contato,
          id: contatoEditado.id,
        };
    
    fetch(
      `http://localhost:3000/contatos/${
        contatoEditado ? contatoEditado.id : ""
      }`,
      {
        method: contatoEditado ? "PUT" : "POST",
        body: JSON.stringify(data),
      }
    ).finally(() => {
      alert("Contato criado com sucesso");
      navigate("/");
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input
          type="text"
          id="nome"
          name="nome"
          value={contato.nome}
          onChange={handleChange}
          onBlur={handleName}
        />
        {contatoError.nomeError ? (
          <Error>Nome não pode ficar vazio</Error>
        ) : (
          ""
        )}
      </div>
      <div>
        <Label htmlFor="tel_principal">Telefone Principal</Label>
        <Input
          type="text"
          id="tel_principal"
          name="tel_principal"
          value={contato.tel_principal}
          onChange={handleChange}
          onBlur={handlePhone}
          placeholder="+5511123456789"
        />
        {contatoError.tel_principalError ? (
          <Error>Telefone fora do formato.</Error>
        ) : (
          ""
        )}
      </div>
      <div>
        <Label htmlFor="tel_celular">Telefone Celular</Label>
        <Input
          type="text"
          id="tel_celular"
          name="tel_celular"
          value={contato.tel_celular}
          onChange={handleChange}
          onBlur={handlePhone}
          placeholder="+5511123456789"
        />
        {contatoError.tel_celularError ? (
          <Error>Telefone fora do formato.</Error>
        ) : (
          ""
        )}
      </div>
      <div>
        <Label htmlFor="tel_trabalho">Telefone do Trabalho</Label>
        <Input
          type="text"
          id="tel_trabalho"
          name="tel_trabalho"
          value={contato.tel_trabalho}
          onChange={handleChange}
          onBlur={handlePhone}
          placeholder="+5511123456789"
        />
        {contatoError.tel_trabalhoError ? (
          <Error>Telefone fora do formato.</Error>
        ) : (
          ""
        )}
      </div>
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
