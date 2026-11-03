import { useState } from 'react';
import { NOTAS, RECOMENDACOES } from './atributos.js';

const avaliacaoVazia = {
  notaGeral: '',
  fortes: '',
  desenvolver: '',
  projecao: '',
  recomendacao: '',
};

function TelaAvaliacao({ relatorio, onSalvar, onVoltar }) {
  const [avaliacao, setAvaliacao] = useState({ ...avaliacaoVazia, ...relatorio.avaliacao });

  function atualizar(campo, valor) {
    setAvaliacao((atual) => ({ ...atual, [campo]: valor }));
  }

  function enviar(evento) {
    evento.preventDefault();
    onSalvar(avaliacao);
  }

  return (
    <div className="tela">
      <header className="topo">
        <p className="scout">{relatorio.jogador} · Passo 3</p>
        <h1>Avaliação final</h1>
      </header>

      <form className="formulario" onSubmit={enviar}>
        <div className="campo">
          Nota geral
          <div className="notas">
            {NOTAS.map((n) => (
              <button
                key={n}
                type="button"
                className={avaliacao.notaGeral === n ? 'nota escolhida' : 'nota'}
                onClick={() => atualizar('notaGeral', n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <label>
          Pontos fortes
          <textarea
            value={avaliacao.fortes}
            onChange={(e) => atualizar('fortes', e.target.value)}
            placeholder="Ex.: passe, posicionamento, liderança"
          />
        </label>

        <label>
          A desenvolver
          <textarea
            value={avaliacao.desenvolver}
            onChange={(e) => atualizar('desenvolver', e.target.value)}
            placeholder="Ex.: pressão, confiança, comunicação"
          />
        </label>

        <label>
          Projeção
          <textarea
            value={avaliacao.projecao}
            onChange={(e) => atualizar('projecao', e.target.value)}
            placeholder="Onde pode chegar? Em quanto tempo?"
          />
        </label>

        <label>
          Recomendação
          <select
            value={avaliacao.recomendacao}
            onChange={(e) => atualizar('recomendacao', e.target.value)}
            required
          >
            <option value="">Escolha...</option>
            {RECOMENDACOES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>

        <div className="acoes">
          <button type="button" className="botao secundario" onClick={onVoltar}>
            Voltar
          </button>
          <button type="submit" className="botao">
            Concluir
          </button>
        </div>
      </form>
    </div>
  );
}

export default TelaAvaliacao;