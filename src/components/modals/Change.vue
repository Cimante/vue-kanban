<script setup lang="ts">
import { computed, toRaw } from "vue";
import { Item } from "../../types/item";
import { useKanbanStore } from "../../store";

const store = useKanbanStore();

const props = defineProps({
  itemID: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const data = computed(() =>
  structuredClone(
    toRaw(store.items.filter((item) => item.id === props.itemID)[0])
  )
);

const onSave = (data: Item) => {
  store.itemChange(data);
  emit("close");
};

const onDelete = (data: Item) => {
  emit("close");
  store.itemDelete(data.id);
};
</script>

<template>
  <div class="Popup show">
    <div class="Popup-overlay"></div>
    <div class="Popup-container">
      <div class="Popup-header">
        <h3>Изменение задачи</h3>
      </div>
      <div class="Popup-content">
        <div class="input-group">
          <label for="title">Заголовок</label>
          <input id="title" type="text" v-model="data.title" />
        </div>
        <div class="input-group">
          <label for="text">Описание</label>
          <textarea
            id="text"
            type="text"
            v-model="data.text"
            rows="7"
          ></textarea>
        </div>
      </div>
      <div class="Popup-controls">
        <button class="delete" @click="onDelete(data)">Удалить</button>
        <button @click="$emit('close')">Закрыть</button>
        <button @click="onSave(data)">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    min-height: 35vmin;
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
    gap: 24px;

    .input-group {
      display: flex;
      flex-direction: column;
      width: 100%;

      label {
        margin-bottom: 4px;
      }

      textarea {
        padding: 4px;
        resize: none;
      }

      input {
        padding: 4px;
      }
    }
  }

  &-controls {
    display: flex;
    justify-content: end;
    gap: 8px;

    .delete {
      margin: 0 auto 0 0;
    }

    button {
      padding: 2px 8px;
    }
  }
}
</style>
