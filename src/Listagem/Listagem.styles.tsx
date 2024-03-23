import styled from "styled-components";

export const Contato = styled.li`
  width: 100%;
  padding: 8px;
  margin: 8px 0px;
  border-bottom: 1px solid #ccc;
  line-height: 1.5;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;

  & a {
    margin-right: 12px;
  }
`;

export const ListagemWrapper = styled.ul`
  background-color: #15172b;
  border-radius: 20px;
  min-height: 100vh;
  padding: 20px;
  width: 640px;
  margin: 0 auto;
`

export const Letter = styled.div`
  font-size: 2rem;
  font-weight: bold;
  border-bottom: rgba(0, 0, 0, 0.222);
  margin-bottom: 12px;
`;

export const Linha = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  & h2 {
    font-size: 2rem;
  }
`;