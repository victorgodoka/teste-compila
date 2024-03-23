import React, { useState } from "react";
import { Form, Input, Label, Button } from "./CriarContato.style";
import { useNavigate } from "react-router-dom";

export default function CriarContato() {
  const navigate = useNavigate();
  const [contato, setContato] = useState({
    nome: "",
    tel_principal: "",
    tel_celular: "",
    tel_trabalho: "",
  });

  const handlePhone = (event: { target: { name: any; value: any } }) => {
    const { value } = event.target;
    const regexTel = new RegExp(/\+([0-9]{2,3})?([0-9]{2})([0-9]{4,5})([0-9]{4})/)
    if (!regexTel.test(value)) {
      return;
    }
    return handleChange(event)
  }

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setContato((prevContato) => ({
      ...prevContato,
      [name]: value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Dados do formulário:", contato);

    fetch("http://localhost:3000/contatos/", {
      method: "POST",
      body: JSON.stringify(contato),
    }).finally(() => {
      alert("Contato criado com sucesso")
      navigate("/");
      setContato({
        nome: "",
        tel_principal: "",
        tel_celular: "",
        tel_trabalho: "",
      });
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
        />
      </div>
      <div>
        <Label htmlFor="tel_principal">Telefone Principal</Label>
        <Input
          type="text"
          id="tel_principal"
          name="tel_principal"
          value={contato.tel_principal}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="tel_celular">Telefone Celular</Label>
        <Input
          type="text"
          id="tel_celular"
          name="tel_celular"
          value={contato.tel_celular}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="tel_trabalho">Telefone do Trabalho</Label>
        <Input
          type="text"
          id="tel_trabalho"
          name="tel_trabalho"
          value={contato.tel_trabalho}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
