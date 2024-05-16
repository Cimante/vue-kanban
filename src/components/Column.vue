<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="Column">
    <header class="header">
      <h4 class="title">{{ title }}</h4>
      <div class="controls">
        <button>+</button>
      </div>
    </header>
    <div class="content">
      <slot></slot>
      <button class="create">
        <span>Добавить запись</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.Column {
  width: 240px;
  height: 80dvh;
  padding: 0 4px;
  border-style: none dashed none dashed;
  border-width: 0 1px 0 1px;
  border-color: #bdbdbd;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .title {
      margin: 0;
    }

    .controls > button {
      cursor: pointer;
    }
  }

  .content {
    width: 100%;
    height: 100%;

    .create {
      background: white;
      border: 1px dashed rgba(#bdbdbd, 0.4);
      padding: 12px 4px;
      margin: 8px 0;
      text-align: center;
      width: 100%;
      transition: border-color 0.2s;
      cursor: pointer;

      &:hover {
        border-color: rgba(#bdbdbd, 0.8);
      }

      span {
        color: #bdbdbd;
      }
    }
  }
}
</style>
