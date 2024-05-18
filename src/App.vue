<script setup lang="ts">
import { defineComponent } from "vue";
import Column from "./components/Column.vue";
import { Item } from "./types/item";
import { useKanbanStore } from "./store";

defineComponent({
  components: {
    Column,
  },
});

const store = useKanbanStore();

const startDrag = (e: any, item: Item, listID: number): void => {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("itemID", item.id);
  e.dataTransfer.setData("listFromID", listID);
};

const onDrop = (e: any, listToID: number): void => {
  const itemID = e.dataTransfer.getData("itemID");
  const listFromID = e.dataTransfer.getData("listFromID");
  store.itemSwap(+itemID, +listFromID, listToID);
};

const textCrop = (text: String): String => {
  if (text.length > 80) {
    return text.slice(0, 80).trim() + "...";
  } else {
    return text;
  }
};
</script>

<template>
  <main class="App">
    <Column
      class="drop-zone"
      :title="list.title"
      v-for="(list, listIdx) in store.lists"
      :key="`${list.id}__${listIdx}`"
      :id="listIdx + 1"
      @drop="onDrop($event, listIdx + 1)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div
        v-for="(item, idx) in store.getList(listIdx + 1)"
        :key="idx"
        class="drag-el"
        draggable="true"
        @dragstart="startDrag($event, item, listIdx + 1)"
      >
        <p class="card-title">{{ item.title }}</p>
        <span class="card-text">{{ textCrop(item.text) }}</span>
      </div>
    </Column>
  </main>
</template>

<style lang="scss">
@import "./styles/normalize.css";

.App {
  display: flex;
  gap: 4px;

  .drag-el {
    background-color: white;
    padding: 6px 8px;
    margin-bottom: 6px;
    border-radius: 6px;
    min-height: 48px;
    box-shadow: 0 1px 2px rgba(#000, 0.2);
    border: 1px solid rgba(#000, 0.2);
    transition: border-color 0.2s;
    cursor: grab;

    &:hover {
      border-color: rgba(#000, 0.7);
    }

    .card-title {
      font-size: 14px;
      margin-top: 0;
      margin-bottom: 8px;
    }

    .card-text {
      display: inline-block;
      opacity: 0.8;
      font-size: 12px;
      line-height: 1.2;
    }
  }
}
</style>
