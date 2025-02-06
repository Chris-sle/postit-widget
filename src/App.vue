<template>
  <div class="app">
      <button @click="addNote">New Post-It Note</button>
      <button @click="closeWidget">Close Widget</button>
      <PostItNote v-for="(note, index) in notes" :key="index" @noteClosed="removeNote(index)" />
  </div>
</template>

<script>
import PostItNote from './components/PostItNote.vue';

export default {
  components: {
      PostItNote,
  },
  data() {
      return {
          notes: [],
      };
  },
  methods: {
      addNote() {
          console.log('Adding Note...');
          this.notes.push({});
      },
      removeNote(index) {
          this.notes.splice(index, 1);
      },
      closeWidget() {
          window.close(); // You may want to handle this differently based on your setup.
      }
  }
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>