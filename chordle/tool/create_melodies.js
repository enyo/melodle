import fs from 'fs'

const _getContents = (noteCount) => {
  const variance = () => Math.floor(Math.random() * 3) - 1

  const offsets = [0, 4, 7, 10, 14]
  let content = 'export const melodies = [\n'
  for (let i = 0; i < 1000; i++) {
    const startNote = Math.floor(Math.random() * 12)
    const notes = [startNote]
    for (let i = 1; i < noteCount; i++) {
      notes.push(startNote + offsets[i] + variance())
    }

    content += `  [${notes.join(',')}],\n`
  }
  content += ']\n'
  return content
}

fs.writeFile('melodies_easy.ts', _getContents(3), () => {
  return
})

fs.writeFile('melodies_medium.ts', _getContents(4), () => {
  return
})
fs.writeFile('melodies_hard.ts', _getContents(5), () => {
  return
})
