<template>
    <div class="postit" :style="{ backgroundColor: backgroundColor }">
        <textarea v-model="noteText" @input="updateText" :rows="4"></textarea>
        <div class="postit-controls">
            <button @click="deleteNote">Slett</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        initialText: {
            type: String,
            default: ''
        },
        backgroundColor: {
            type: String,
            default: '#ffeb3b'
        }
    },
    data() {
        return {
            noteText: this.initialText
        };
    },
    methods: {
        updateText() {
            this.$emit('update', this.noteText);
        },
        deleteNote() {
            this.$emit('delete');
        }
    }
};
</script>

<style scoped>
.postit {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    display: inline-block;
    width: 200px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.2s ease;
}

textarea {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
}

.postit-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

button {
    cursor: pointer;
}
</style>