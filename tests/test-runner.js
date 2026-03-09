#!/usr/bin/env node
/**
 * test-runner.js — Executor de testes do Humboldt
 *
 * Uso:
 *   node tests/test-runner.js
 *
 * Executa todos os suítes de teste e imprime o resultado.
 * Exit code 0 = todos passaram. Exit code 1 = algum falhou.
 *
 * Não depende de Jest, Mocha ou qualquer framework externo.
 * Requer Node.js >= 18 (para fetch nativo e import()).
 */

import { runDataTests }   from './data-tests.js';
import { runModuleTests } from './module-tests.js';
import { runUITests }     from './ui-tests.js';

// -------------------------------------------------------
// Infraestrutura mínima de testes
// -------------------------------------------------------

let _passed = 0;
let _failed = 0;
let _currentSuite = '';

/**
 * Define o nome da suíte atual (para output agrupado).
 * @param {string} name
 */
export function suite(name) {
  _currentSuite = name;
  console.log(`\n  ${name}`);
}

/**
 * Registra um caso de teste.
 * @param {string}   description
 * @param {Function} fn  - pode ser sync ou async; lança para falhar
 */
export async function test(description, fn) {
  try {
    await fn();
    _passed++;
    console.log(`    \x1b[32mok\x1b[0m  ${description}`);
  } catch (err) {
    _failed++;
    console.log(`    \x1b[31mfail\x1b[0m ${description}`);
    console.log(`         \x1b[33m${err.message}\x1b[0m`);
  }
}

/**
 * Assertion básica.
 * @param {boolean} condition
 * @param {string}  [message]
 */
export function assert(condition, message = 'assertion failed') {
  if (!condition) throw new Error(message);
}

/**
 * Igualdade profunda simples (JSON round-trip).
 * @param {any}    actual
 * @param {any}    expected
 * @param {string} [message]
 */
export function assertEqual(actual, expected, message) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    throw new Error(message || `Expected ${e} but got ${a}`);
  }
}

// -------------------------------------------------------
// Execução principal
// -------------------------------------------------------

async function main() {
  const start = Date.now();
  console.log('\nHumboldt — Testes Automatizados');
  console.log('================================');

  await runDataTests();
  await runModuleTests();
  await runUITests();

  const elapsed = Date.now() - start;
  console.log('\n--------------------------------');
  console.log(`Resultado: ${_passed} ok  ${_failed} falhou  (${elapsed}ms)`);

  if (_failed > 0) {
    console.log('\x1b[31mAlguns testes falharam.\x1b[0m\n');
    process.exit(1);
  } else {
    console.log('\x1b[32mTodos os testes passaram.\x1b[0m\n');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Erro fatal no test runner:', err);
  process.exit(1);
});
