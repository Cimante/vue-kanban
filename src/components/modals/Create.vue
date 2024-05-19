<script setup lang="ts">
import { reactive } from "vue";
import { Item } from "../../types/item";
import { useKanbanStore } from "../../store";

const store = useKanbanStore();

const onSave = (data: Item) => {
  store.itemCreate(data);
  emit("close");
};

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  listID: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["delete", "close"]);

const data = reactive<Item>({
  id: Number(new Date().getTime()),
  title: "",
  text: "",
  listID: props.listID,
});
</script>

<template>
  <div class="Popup" :class="{ show: show }">
    <div class="Popup-overlay"></div>
    <div class="Popup-container">
      <div class="Popup-header">
        <h3>Добавление новой задачи</h3>
      </div>
      <div class="Popup-content">
        <label for="title">Заголовок</label>
        <input id="title" type="text" v-model="data.title" />
        <label for="text">Описание</label>
        <textarea id="text" type="text" v-model="data.text" rows="7"></textarea>
      </div>
      <div class="Popup-controls">
        <button @click="$emit('delete')" disabled>Удалить</button>
        <button @click="$emit('close')">Закрыть</button>
        <button @click="onSave(data)">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.Popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;

  &.show,
  &.show > &-overlay {
    opacity: 1;
    pointer-events: auto;
  }

  &-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    opacity: 0;
    background-color: rgba(60, 60, 60, 0.5);
    transition: opacity 0.2s;
  }

  &-container {
    position: relative;
    display: grid;
    grid-template-rows: 24px 1fr 24px;
    width: 40vmin;
    height: 35vmin;
    background-color: white;
    padding: 16px;
    border-radius: 8px;
  }

  &-header h3 {
    font-size: 1.2rem;
    margin-bottom: 16px;
    margin-top: 0;
    padding-left: 4px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;

    textarea {
      padding: 4px;
      resize: none;
    }

    input {
      padding: 4px;
    }
  }

  &-controls {
    display: flex;
    justify-content: end;
    gap: 8px;

    button {
      padding: 2px 8px;
    }
  }
}
</style>
