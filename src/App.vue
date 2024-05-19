<script setup lang="ts">
import { defineComponent, ref } from "vue";
import Column from "./components/Column.vue";
import ModalChange from "./components/modals/Change.vue";
import { Item } from "./types/item";
import { useKanbanStore } from "./store";

defineComponent({
  components: {
    Column,
    ModalChange,
  },
});

const store = useKanbanStore();

const startDrag = (e: any, item: Item): void => {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("itemID", item.id);
};

const onDrop = (e: any, listTo: number): void => {
  const itemID = e.dataTransfer.getData("itemID");
  store.itemSwap(+itemID, listTo);
};

const textCrop = (text: String): String => {
  if (text.length > 80) {
    return text.slice(0, 80).trim() + "...";
  } else {
    return text;
  }
};

const modalChangeShow = ref(false);
const modalChangeID = ref(0);

const modalChangeActivate = (id: number): void => {
  modalChangeID.value = id;
  modalChangeShow.value = true;
};
</script>

<template>
  <main class="App">
    <ModalChange
      v-if="modalChangeShow"
      :show="modalChangeShow"
      :itemID="modalChangeID"
      @close="modalChangeShow = false"
    />
    <Column
      class="drop-zone"
      :title="list.title"
      v-for="list in store.lists"
      :key="`${list.id}__${list.id}`"
      :id="list.id"
      @drop="onDrop($event, list.id)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div
        v-for="(item, idx) in store.getList(list.id)"
        :key="idx"
        class="drag-el"
        draggable="true"
        @dragstart="startDrag($event, item)"
        @click="modalChangeActivate(item.id)"
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
