import { defineStore } from "pinia";
import { Item } from "../types/item";
import { List } from "../types/list";

export const useKanbanStore = defineStore("kanban", {
  state: () => {
    return {
      lists: [
        {
          id: 0,
          title: "Не спланировано",
        },
        {
          id: 1,
          title: "В работе",
        },
      ] as List[],
      items: [
        {
          id: 0,
          listID: 0,
          title: "Task A",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum, tortor vitae finibus suscipit, orci nulla pharetra magna, vitae hendrerit mi massa sit amet arcu. Sed finibus ac eros quis gravida.",
        },
        {
          id: 1,
          listID: 0,
          title: "Task B",
          text: "Cras posuere bibendum malesuada. Pellentesque aliquet eros ex, a varius diam dictum sit amet. Sed dignissim leo sapien, et ultrices arcu scelerisque sed. Vivamus rutrum bibendum venenatis. Nulla tempus metus orci, in posuere erat eleifend at. Sed eget varius ligula, in maximus metus.",
        },
        {
          id: 2,
          listID: 1,
          title: "Task C",
          text: "Vivamus nibh leo, condimentum sed consequat nec, interdum sit amet lorem. Nullam fringilla hendrerit vestibulum. In nec rhoncus lacus. Nullam sed neque consectetur, cursus neque pretium, vestibulum ligula. Morbi ac magna sed est vehicula porta. Donec ultricies eget mi nec lacinia.",
        },
      ] as Item[],
    };
  },
  actions: {
    itemSwap(itemID: number, listTo: number) {
      const targetItem = this.$state.items.find((item) => item.id === itemID);
      targetItem ? (targetItem.listID = listTo) : null;
    },
    itemCreate(item: Item) {
      this.$state.items.push(item);
    },
    itemChange(item: Item) {
      const idx = this.$state.items.findIndex((el) => el.id === item.id);
      this.$state.items[idx] = item;
    },
    itemDelete(itemID: number) {
      const arr = this.$state.items;
      arr.splice(
        arr.findIndex((el) => el.id === itemID),
        1
      );
    },
  },
  getters: {
    getList: (state) => {
      return (listID: number) => {
        return state.items.filter((item) => item.listID === listID);
      };
    },
  },
});
