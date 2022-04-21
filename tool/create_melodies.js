import fs from 'fs'

const _getContents = (possibleNotes) => {
  const _randNote = () =>
    possibleNotes[Math.floor(Math.random() * possibleNotes.length)]

  let content = 'export const melodies = [\n'
  for (let i = 0; i < 1000; i++) {
    content += `  [${_randNote()},${_randNote()},${_randNote()},${_randNote()},${_randNote()}],\n`
  }
  content += ']\n'
  return content
}

fs.writeFile(
  'melodies_medium.ts',
  _getContents([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  () => {
    return
  },
)

fs.writeFile('melodies_easy.ts', _getContents([0, 2, 4, 5, 7, 9, 11]), () => {
  return
})
