<script lang="ts">
  import Note, { type Status } from './Note.svelte'

  export let correctMelody: string
  export let guessedMelody: string | undefined
  export let submitted: boolean

  $: correctMelodyNotes = correctMelody?.split(' ')
  $: guessedMelodyNotes = guessedMelody?.split(' ')

  type GuessedNote = {
    note?: string
    status?: Status
  }
  let notes: GuessedNote[]
  $: {
    notes = [{}, {}, {}, {}, {}]
    if (guessedMelody) {
      let remainingMelodyNotes = [...correctMelodyNotes]

      for (let i = 0; i < 5; i++) {
        const note = guessedMelodyNotes[i]

        if (!note) break

        let status: Status
        if (remainingMelodyNotes[i] === note) {
          status = 'correct'
          remainingMelodyNotes[i] = undefined
        } else if (remainingMelodyNotes.includes(note)) {
          status = 'wrong-position'
          remainingMelodyNotes[remainingMelodyNotes.indexOf(note)] = undefined
        } else {
          status = 'incorrect'
        }

        notes[i] = { note, status }
      }
    }
  }
</script>

<div class="container">
  {#each notes as note}
    <Note note={note.note} status={note.status} />
  {/each}
</div>

<style>
  .container {
    display: flex;
  }
</style>
