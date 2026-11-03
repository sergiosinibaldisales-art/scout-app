import { ATRIBUTOS, NOTAS, CATEGORIAS } from './atributos.js';
import { mediaDaCategoria, numeroParaNota } from './calculos.js';
import Radar from './Radar.jsx';

function larguraDaNota(nota) {
  const posicao = NOTAS.indexOf(nota);
  if (posicao === -1) {
    return '0%';
  }
  return `${((NOTAS.length - posicao) * 100) / NOTAS.length}%`;
}

function TelaRelatorio({ relatorio, onVoltar, onEditar }) {
  const notas = relatorio.notas || {};
  const contagens = relatorio.contagens || {};
  const avaliacao = relatorio.avaliacao || {};
    const medias = CATEGORIAS.map((c) => ({
        nome: c.nome,
        chaves: c.chaves,
        valor: mediaDaCategoria(c, notas),
    }));

  const detalhes = [relatorio.clube, relatorio.posicao, relatorio.pe].filter(Boolean).join(' · ');

  return (
    <div className="tela">
      <header className="topo nao-imprimir">
        <p className="scout">Pré-visualização</p>
        <h1>Relatório</h1>
      </header>

      <main className="lista">
        <article className="folha">
          <div className="folha-topo">
            <div>
              <p className="folha-rotulo">Relatório de jogador</p>
              <h2>
                {relatorio.jogador}
                {relatorio.numero && ` #${relatorio.numero}`}
              </h2>
              {detalhes && <p className="folha-detalhe">{detalhes}</p>}
            </div>
            <div className="nota-geral">{avaliacao.notaGeral || '–'}</div>
          </div>

          <p className="folha-detalhe folha-jogo">
            {relatorio.jogo} · {relatorio.data}
          </p>

                    <Radar valores={medias} />

          {medias.map((m) => (
            <div key={m.nome} className="categoria">
              <div className="categoria-topo">
                <span>{m.nome}</span>
                <span>
                  {m.valor === null
                    ? 'sem nota'
                    : `Média ${numeroParaNota(m.valor)} · ${m.valor.toFixed(1)}/6`}
                </span>
              </div>
              <div className="barras">
                {ATRIBUTOS.filter((a) => m.chaves.includes(a.chave)).map((a) => (
                  <div key={a.chave} className="barra-linha">
                    <span>{a.nome}</span>
                    <div className="barra-fundo">
                      <div className="barra" style={{ width: larguraDaNota(notas[a.chave]) }} />
                    </div>
                    <b>{notas[a.chave] || '–'}</b>
                    {contagens[a.chave] && (
                      <small>
                        {contagens[a.chave].certos}/
                        {contagens[a.chave].certos + contagens[a.chave].errados} certas
                      </small>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="folha-textos">
            <div>
              <b>Pontos fortes</b>
              <p>{avaliacao.fortes || '–'}</p>
            </div>
            <div>
              <b>A desenvolver</b>
              <p>{avaliacao.desenvolver || '–'}</p>
            </div>
          </div>

          {avaliacao.projecao && (
            <div className="folha-textos-um">
              <b>Projeção</b>
              <p>{avaliacao.projecao}</p>
            </div>
          )}

          <div className="recomendacao">
            Recomendação: {avaliacao.recomendacao || 'não definida'}
          </div>

          <p className="folha-rotulo">Scout: Sergio Sinibaldi</p>
        </article>
      </main>

      <footer className="rodape nao-imprimir">
        <div className="acoes acoes-tres">
          <button type="button" className="botao secundario" onClick={onVoltar}>
            Voltar
          </button>
          <button type="button" className="botao secundario" onClick={onEditar}>
            Editar
          </button>
          <button type="button" className="botao" onClick={() => window.print()}>
            PDF
          </button>
        </div>
      </footer>
    </div>
  );
}

export default TelaRelatorio;