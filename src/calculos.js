import { NOTAS } from './atributos.js';

// A = 6, B = 5, ... F = 1. Sem nota = null.
export function notaParaNumero(nota) {
  const posicao = NOTAS.indexOf(nota);
  if (posicao === -1) {
    return null;
  }
  return NOTAS.length - posicao;
}

// 4.6 → 'B' (arredonda para a letra mais próxima)
export function numeroParaNota(numero) {
  return NOTAS[NOTAS.length - Math.round(numero)];
}

// Média das notas de uma categoria, ignorando atributos sem nota.
export function mediaDaCategoria(categoria, notas) {
  const numeros = categoria.chaves
    .map((chave) => notaParaNumero(notas[chave]))
    .filter((n) => n !== null);

  if (numeros.length === 0) {
    return null;
  }
  const soma = numeros.reduce((total, n) => total + n, 0);
  return soma / numeros.length;
}
