import { useState } from 'react';
import { ATRIBUTOS, NOTAS } from './atributos.js';

function TelaAtributos({ relatorio, onSalvar, onVoltar }) {
  const [notas, setNotas] = useState(relatorio.notas || {});
  const [contagens, setContagens] = useState(relatorio.contagens || {});
  const [modo, setModo] = useState('vivo');

  function escolher(chave, nota) {
    setNotas((atual) => {
      const novaNota = atual[chave] === nota ? undefined : nota;
      return { ...atual, [chave]: novaNota };
    });
  }

  function contar(chave, tipo) {
    setContagens((atual) => {
      const c = atual[chave] || { certos: 0, errados: 0 };
      return { ...atual, [chave]: { ...c, [tipo]: c[tipo] + 1 } };
    });
  }

  function resumo(chave) {
    const c = contagens[chave];
    if (!c || c.certos + c.errados === 0) {
      return 'sem contagem';
    }
    const total = c.certos + c.errados;
    const pct = Math.round((c.certos * 100) / total);
    return `${c.certos} de ${total} certas · ${pct}%`;
  }

  const preenchidas = ATRIBUTOS.filter((a) => notas[a.chave]).length;

  return (
    <div className="tela">
      <header className="topo">
        <p className="scout">
          {relatorio.jogador} · Passo 2 · {preenchidas}/{ATRIBUTOS.length} com nota
        </p>
        <h1>Atributos</h1>
        <div className="abas">
          <button
            type="button"
            className={modo === 'vivo' ? 'aba ativa' : 'aba'}
            onClick={() => setModo('vivo')}
          >
            Ao vivo ✓ ✗
          </button>
          <button
            type="button"
            className={modo === 'nota' ? 'aba ativa' : 'aba'}
            onClick={() => setModo('nota')}
          >
            Avaliar A–F
          </button>
        </div>
      </header>

      <main className="lista">
        {ATRIBUTOS.map((a) => (
          <div key={a.chave} className="atributo">
            <span className="atributo-nome">{a.nome}</span>
            <span className="resumo">{resumo(a.chave)}</span>

            {modo === 'vivo' ? (
              <div className="contador">
                <button
                  type="button"
                  className="nota"
                  onClick={() => contar(a.chave, 'errados')}
                >
                  ✗ {contagens[a.chave]?.errados || 0}
                </button>
                <button
                  type="button"
                  className="nota escolhida"
                  onClick={() => contar(a.chave, 'certos')}
                >
                  ✓ {contagens[a.chave]?.certos || 0}
                </button>
              </div>
            ) : (
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
            )}
          </div>
        ))}
      </main>

      <footer className="rodape acoes">
        <button type="button" className="botao secundario" onClick={onVoltar}>
          Voltar
        </button>
        <button type="button" className="botao" onClick={() => onSalvar(notas, contagens)}>
          Salvar
        </button>
      </footer>
    </div>
  );
}

export default TelaAtributos;