<template>
  <div class="post-it-note" v-if="visible">
      <textarea v-model="noteContent" placeholder="Type your note here..."></textarea>
      <button @click="closeNote">Close</button>
  </div>
</template>

<script>
export default {
  data() {
      return {
          noteContent: '',
          visible: true,
      };
  },
  methods: {
      closeNote() {
          this.visible = false;
          this.$emit('noteClosed');
      }
  }
};
</script>

<style scoped>
.post-it-note {
  background-color: yellow;
  border: 2px solid #000;
  padding: 10px;
  position: relative;
}
</style>