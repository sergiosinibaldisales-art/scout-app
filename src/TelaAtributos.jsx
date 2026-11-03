import { useState } from 'react';
import { ATRIBUTOS, NOTAS } from './atributos.js';

function TelaAtributos({ relatorio, onSalvar, onVoltar }) {
  const [notas, setNotas] = useState(relatorio.notas || {});

  function escolher(chave, nota) {
    const novaNota = notas[chave] === nota ? undefined : nota;
    setNotas({ ...notas, [chave]: novaNota });
  }

  const preenchidas = ATRIBUTOS.filter((a) => notas[a.chave]).length;

  return (
    <div className="tela">
      <header className="topo">
        <p className="scout">
          {relatorio.jogador} · Passo 2 · {preenchidas}/{ATRIBUTOS.length} com nota
        </p>
        <h1>Atributos</h1>
      </header>

      <main className="lista">
        {ATRIBUTOS.map((a) => (
          <div key={a.chave} className="atributo">
            <span className="atributo-nome">{a.nome}</span>
            <div className="notas">
              {NOTAS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={notas[a.chave] === n ? 'nota escolhida' : 'nota'}
                  onClick={() => escolher(a.chave, n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>

      <footer className="rodape acoes">
        <button type="button" className="botao secundario" onClick={onVoltar}>
          Voltar
        </button>
        <button type="button" className="botao" onClick={() => onSalvar(notas)}>
          Salvar notas
        </button>
      </footer>
    </div>
  );
}

export default TelaAtributos;