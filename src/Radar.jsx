import { NOTAS } from './atributos.js';

const LARGURA = 300;
const ALTURA = 240;
const CENTRO_X = LARGURA / 2;
const CENTRO_Y = ALTURA / 2;
const RAIO = 80;
const MAXIMO = NOTAS.length; // 6 = nota A

// Converte "ponta número i, a uma distância d do centro" em coordenadas x,y.
function ponto(i, total, distancia) {
  const angulo = -Math.PI / 2 + (i * 2 * Math.PI) / total;
  return {
    x: CENTRO_X + distancia * Math.cos(angulo),
    y: CENTRO_Y + distancia * Math.sin(angulo),
  };
}

// Transforma uma lista de pontos no texto que o <polygon> entende: "x1,y1 x2,y2 ..."
function paraTexto(pontos) {
  return pontos.map((p) => `${p.x},${p.y}`).join(' ');
}

function Radar({ valores }) {
  const total = valores.length;

  const aneis = [2, 4, 6].map((nivel) =>
    paraTexto(valores.map((v, i) => ponto(i, total, (RAIO * nivel) / MAXIMO)))
  );

  const forma = paraTexto(
    valores.map((v, i) => ponto(i, total, (RAIO * (v.valor || 0)) / MAXIMO))
  );

  return (
    <svg className="radar" viewBox={`0 0 ${LARGURA} ${ALTURA}`}>
      {aneis.map((pontos, i) => (
        <polygon key={i} points={pontos} className="radar-anel" />
      ))}

      {valores.map((v, i) => {
        const fim = ponto(i, total, RAIO);
        return <line key={v.nome} x1={CENTRO_X} y1={CENTRO_Y} x2={fim.x} y2={fim.y} className="radar-eixo" />;
      })}

      <polygon points={forma} className="radar-forma" />

      {valores.map((v, i) => {
        const p = ponto(i, total, RAIO + 22);
        return (
          <text key={v.nome} x={p.x} y={p.y} className="radar-rotulo">
            {v.nome}
          </text>
        );
      })}
    </svg>
  );
}

export default Radar;