import React, { Fragment, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Contato, Letter, Linha, ListagemWrapper } from "./Listagem.styles";
import { Input } from "../CriarEditarContato/CriarEditarContato.style";

export default function Listagem() {
  const [listagemFinal, setListagem] = useState<ListagemContatos>();
  const listagem = useLoaderData() as Contatos[];
  const navigate = useNavigate();

  let data = (array:any) => array.reduce((r: any, e: any) => {
    let letra = e.nome[0];
    if (!r[letra]) r[letra] = { letra, contatos: [e] };
    else r[letra].contatos.push(e);
    return r;
  }, {});

  useEffect(() => {
    setListagem(data(listagem));
    console.log(listagemFinal);
  }, []);

  const buscarContatos = (event: { target: { name: any; value: any } }) => {
    const { value } = event.target;
    const busca = listagem.filter((val) => val.nome.toLowerCase().includes(value.toLowerCase()));
    setListagem(data(busca));
  }

  const ApagarContato = (id: any) => {
    if (confirm("Deseja apagar este contato?")) {
      return fetch(`http://localhost:3000/contatos/${id}`, {
        method: "DELETE",
      }).finally(() => navigate(0));
    }
  };

  return (
    <ListagemWrapper>
      <Input placeholder="Busca" onChange={buscarContatos} />
      <Linha>
        <li>
          <h2>Contatos</h2>
        </li>
        <li>
          <Link to="criar">Criar contato</Link>
        </li>
      </Linha>
      {listagemFinal && Object.keys(listagemFinal).map((key: string) => (
        <Fragment key={key}>
          <Letter>{key}</Letter>
          {listagemFinal[key]?.contatos.map(({ id, nome }: any) => (
            <Contato key={id}>
              <Link to={`contato/${id}`}>{nome}</Link>
              <div>
                <Link to={`editar/${id}`}>Editar</Link>
                <a href="#" onClick={() => ApagarContato(id)}>
                  Apagar
                </a>
              </div>
            </Contato>
          ))}
        </Fragment>
      ))}
    </ListagemWrapper>
  );
}
