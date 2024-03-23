type Contatos = {
  id: string;
  nome: string;
  tel_principal: string;
  tel_celular: string;
  tel_trabalho: string;
}

type ListagemContatos = {
  [key: string]: any;
  contatos: Contatos[];
}
