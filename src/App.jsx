import { useEffect, useState } from 'react';
import './App.css';
import FormNovoRelatorio from './FormNovoRelatorio.jsx';
import TelaAtributos from './TelaAtributos.jsx';
import { ATRIBUTOS } from './atributos.js';


const CHAVE = 'scout-app: relatorios';

const relatoriosIniciais = [
  { id: 1, jogador: 'Mothalo (10)', jogo: 'Glasgow City x Rangers', data: '21/10/26', status: 'Ver de novo' },
  { id: 2, jogador: 'Tariq Almasry', jogo: 'UCD AFC x St Patricks', data: '31/10/26', status: 'Rascunho' },
  { id: 3, jogador: 'Sergio Sinibaldi', jogo: 'Corinthians x Palmeiras', data: '02/11/26', status: 'Assinar' },
];

function carregarRelatorios() {
  try {
    const salvos = localStorage.getItem(CHAVE);
    if (salvos) {
      const dados = JSON.parse(salvos);
      if (Array.isArray(dados) && dados.length > 0) {
        return dados;
      }
    }
  } catch (error) {
    console.error('Não consegui ler os relatórios salvos:', error);
  }
  return relatoriosIniciais;
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano.slice(2)}`;
}

function App() {
  const [relatorios, setRelatorios] = useState(carregarRelatorios);
  const [tela, setTela] = useState('inicio');
    const [abertoId, setAbertoId] = useState(null);


  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(relatorios));
  }, [relatorios]);

  function abrirAtributos(id) {
    setAbertoId(id);
    setTela('atributos');
  }

  function salvarRelatorio(dados) {
    const novo = { ...dados, id: Date.now(), data: formatarData(dados.data), status: 'Rascunho' };
    setRelatorios((atual) => [...atual, novo]);
    abrirAtributos(novo.id);;
  }

    function salvarNotas(notas, contagens) {
    setRelatorios((atual) =>
      atual.map((r) => (r.id === abertoId ? { ...r, notas, contagens } : r))
    );
    setTela('inicio');
  }

  function removerRelatorio(id) {
    setRelatorios((atual) => atual.filter((r) => r.id !== id));
  }

  if (tela === 'novo') {
    return <FormNovoRelatorio onSalvar={salvarRelatorio} onCancelar={() => setTela('inicio')} />;
  }
  if (tela === 'atributos') {
    const aberto = relatorios.find((r) => r.id === abertoId);
    return (
      <TelaAtributos
        relatorio={aberto}
        onSalvar={salvarNotas}
        onVoltar={() => setTela('inicio')}
      />
    );
  }

  return (
    <div className="tela">
      <header className="topo">
        <p className="scout">Scout: Sergio Sinibaldi</p>
        <h1>Meus relatórios</h1>
        <p className="contagem">{relatorios.length} relatórios</p>
      </header>

      <main className="lista">
        {relatorios.map((r) => (
          <div key={r.id} className="cartao">
              <div className="info" onClick={() => abrirAtributos(r.id)}>
                    <strong>
                {r.jogador}
                {r.numero && ` (${r.numero})`}
                </strong>
                <p>{r.jogo} · {r.data}</p>
                <p>
                  {Object.values(r.notas || {}).filter(Boolean).length}/{ATRIBUTOS.length} notas
                </p>
              </div>
            <span className="etiqueta">{r.status}</span>
            <button className="remover" onClick={() => removerRelatorio(r.id)}>
              X
            </button>
          </div>
        ))}
      </main>

      <footer className="rodape">
        <button className="botao" onClick={() => setTela('novo')}>
          + Novo relatório
        </button>
      </footer>
    </div>
  );
}

export default App;
