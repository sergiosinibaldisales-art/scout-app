import { useState } from 'react';
const formVazio = {
  jogador: '',
  numero: '',
  clube: '',
  posicao: '',
  pe: 'Direito',
  jogo: '',
  data: new Date().toISOString().slice(0, 10),
};

function FormNovoRelatorio({ onSalvar, onCancelar }) {
  const [form, setForm] = useState(formVazio);

  function atualizar(campo, valor) {
    setForm({ ...form, [campo]: valor });
  }

  function enviar(evento) {
    evento.preventDefault();
    onSalvar(form);
  }

  return (
    <div className="tela">
      <header className="topo">
        <p className="Scout"> Novo Relatorio . Passo 1 </p>
        <h1> Jogador e jogo </h1>
      </header>

      <form className="formulario" onSubmit={enviar}>
        <label>
          Nome do Jogador
          <input
            value={form.jogador}
            onChange={(e) => atualizar('jogador', e.target.value)}
            required
          />
        </label>

        <div className="linha">
          <label>
            Numero
            <input
              type="number"
              value={form.numero}
              onChange={(e) => atualizar('numero', e.target.value)}
            />
          </label>
          <label>
            Pe preferido
            <select
              value={form.pe}
              onChange={(e) => atualizar('pe', e.target.value)}
            >
              <option> Direito</option>
              <option> Esquerdo</option>
              <option> Ambos</option>
            </select>
          </label>
        </div>

        <label>
          Clube
          <input
            value={form.clube}
            onChange={(e) => atualizar('clube', e.target.value)}
          />
        </label>
        <label>
          Posicao
          <input
            value={form.posicao}
            onChange={(e) => atualizar('posicao', e.target.value)}
            placeholder="Ex.: Atacante / Ponta"
          />
        </label>
        <label>
          Jogo
          <input
            value={form.jogo}
            onChange={(e) => atualizar('jogo', e.target.value)}
            placeholder="Ex.: Glasgow City x Rangers"
            required
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={form.data}
            onChange={(e) => atualizar('data', e.target.value)}
          />
        </label>

        <div className="acoes">
          <button
            type="button"
            className="botao secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button type="submit" className="botao">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormNovoRelatorio;