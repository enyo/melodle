import fs from 'fs'

function _rand(max) {
  return Math.floor(Math.random() * max)
}
const _randNote = () => _rand(12)

let content = 'export const melodies = [\n'
for (let i = 0; i < 1000; i++) {
  content += `  [${_randNote()},${_randNote()},${_randNote()},${_randNote()},${_randNote()}],\n`
}
content += ']\n'
fs.writeFile('melodies.ts', content, () => {
  return
})
