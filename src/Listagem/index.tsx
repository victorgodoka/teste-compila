import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Contato, Letter, ListagemWrapper } from "./Listagem.styles";

export default function Listagem() {
  const listagem = useLoaderData() as Contatos[];

  let data = listagem.reduce((r: any, e: any) => {
    let letra = e.nome[0];
    if (!r[letra]) r[letra] = { letra, contatos: [e] };
    else r[letra].contatos.push(e);
    return r;
  }, {});

  return (
    <ListagemWrapper>
      <li>Contatos</li>
      <li>
        <Link to="criar">Criar contato</Link>
      </li>
      {Object.keys(data).map((key) => (
        <>
          <Letter>{key}</Letter>
          {data[key].contatos.map(({ id, nome }: any) => (
            <Contato>{nome}</Contato>
          ))}
        </>
      ))}
    </ListagemWrapper>
  );
}
