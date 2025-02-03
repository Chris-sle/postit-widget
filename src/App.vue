<template>
  <div id="app" @mousedown="startDrag" @mouseup="stopDrag" @mousemove="drag" class="app-container">
    <h1>Post-it Widget</h1>
    <div>
      <label for="color-selector">Velg Farge:</label>
      <select v-model="selectedColor" id="color-selector">
        <option v-for="color in colors" :key="color" :value="color">
          <span class="color-block" :style="{ backgroundColor: color }"></span> {{ color }}
        </option>
      </select>
      <button @click="addPostIt">Legg til Post-it</button>
    </div>
    <div class="postit-container">
      <PostIt v-for="(note, index) in notes" :key="index" :initialText="note.text"
        :backgroundColor="note.color || selectedColor" @delete="removeNote(index)"
        @update="updateNoteText(index, $event)" />
    </div>
    <button @click="closeWidget">Lukk Widget</button>
  </div>
</template>

<script>
import PostIt from './components/PostIt.vue';

export default {
  components: {
    PostIt
  },
  data() {
    return {
      notes: [],
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      windowPosition: { x: 0, y: 0 },
      selectedColor: '#ffeb3b', // Standard farge
      colors: ['#ffeb3b', '#ff5722', '#4caf50', '#2196f3']
    };
  },
  created() {
    this.loadNotes();
    const savedPosition = localStorage.getItem('widgetPosition');
    if (savedPosition) {
      this.windowPosition = JSON.parse(savedPosition);
    }
  },
  methods: {
    addPostIt() {
      this.notes.push({ text: '', color: this.selectedColor });
      this.saveNotes();
    },
    removeNote(index) {
      this.notes.splice(index, 1);
      this.saveNotes();
    },
    updateNoteText(index, newText) {
      this.notes[index].text = newText;
      this.saveNotes();
    },
    saveNotes() {
      localStorage.setItem('postitNotes', JSON.stringify(this.notes));
    },
    loadNotes() {
      const savedNotes = localStorage.getItem('postitNotes');
      if (savedNotes) {
        this.notes = JSON.parse(savedNotes);
      }
    },
    startDrag(event) {
      this.isDragging = true;
      this.dragOffset = { x: event.clientX - this.windowPosition.x, y: event.clientY - this.windowPosition.y };
    },
    stopDrag() {
      this.isDragging = false;
    },
    drag(event) {
      if (this.isDragging) {
        this.windowPosition.x = event.clientX - this.dragOffset.x;
        this.windowPosition.y = event.clientY - this.dragOffset.y;
        this.$el.style.transform = `translate(${this.windowPosition.x}px, ${this.windowPosition.y}px)`;
      }
    },
    closeWidget() {
      localStorage.setItem('widgetPosition', JSON.stringify(this.windowPosition)); // Lagre posisjon
      window.close();
    },
  }
};
</script>

<style>
.app-container {
  cursor: move;
  max-width: 90vw;
  margin: auto;
}

.postit-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.color-block {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.postit {
  flex: 1 1 calc(33% - 20px);
}

@media (max-width: 768px) {
  .postit {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .postit {
    flex: 1 1 100%;
  }
}
</style>