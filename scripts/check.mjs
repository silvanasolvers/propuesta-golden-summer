import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8')
const required = [
  'Golden Summer',
  '$9.500.000',
  '$3.400.000',
  '$6.100.000',
  '$950.000',
  '$20.000.000',
  '10%',
  'Wompi',
  'Shopify',
  '2,65%',
  'USD $25',
  'Alianza con Lorena',
  'Mapa de calor',
  'Propuesta 02'
]
const missing = required.filter((item) => !source.includes(item))
if (missing.length) throw new Error(`Contenido requerido ausente: ${missing.join(', ')}`)
if (!source.includes('data-plan="two"') || !source.includes('activatePlan')) {
  throw new Error('La interacción de alternativas no está declarada.')
}
console.log('check: propuesta Golden Summer OK')
