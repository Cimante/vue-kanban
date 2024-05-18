import { defineStore } from "pinia";
import { Item } from "../types/item";
import { List } from "../interfaces/List";

export const useKanbanStore = defineStore("kanban", {
  state: () => {
    return {
      lists: [
        {
          id: 1,
          title: "Не спланировано",
          items: [
            {
              id: 0,
              title: "Task A",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum, tortor vitae finibus suscipit, orci nulla pharetra magna, vitae hendrerit mi massa sit amet arcu. Sed finibus ac eros quis gravida.",
            },
            {
              id: 1,
              title: "Task B",
              text: "Cras posuere bibendum malesuada. Pellentesque aliquet eros ex, a varius diam dictum sit amet. Sed dignissim leo sapien, et ultrices arcu scelerisque sed. Vivamus rutrum bibendum venenatis. Nulla tempus metus orci, in posuere erat eleifend at. Sed eget varius ligula, in maximus metus.",
            },
          ] as Item[],
        } as List,
        {
          id: 2,
          title: "В работе",
          items: [
            {
              id: 2,
              title: "Task C",
              text: "Vivamus nibh leo, condimentum sed consequat nec, interdum sit amet lorem. Nullam fringilla hendrerit vestibulum. In nec rhoncus lacus. Nullam sed neque consectetur, cursus neque pretium, vestibulum ligula. Morbi ac magna sed est vehicula porta. Donec ultricies eget mi nec lacinia.",
            },
          ] as Item[],
        } as List,
      ] as List[],
    };
  },
  actions: {
    itemSwap(itemID: number, ListFrom: number, ListTo: number) {
      if (ListFrom != ListTo) {
        const targetList = this.$state.lists.find(
          (list) => list.id === ListFrom
        );
        let targetItem = null;

        if (targetList) {
          targetItem = targetList.items.find((item) => item.id === itemID);
          if (targetItem) {
            targetList.items.splice(targetList.items.indexOf(targetItem), 1);

            const toList = this.$state.lists.find((list) => list.id === ListTo);
            if (toList) toList.items.push(targetItem);
          }
        }
      }
    },
    itemCreate(item: Item, ListTo: number) {
      const targetList = this.$state.lists.find((list) => list.id === ListTo);
      targetList
        ? targetList.items.push(item)
        : console.error("Target list does not exists");
    },
  },
  getters: {
    getList: (state) => {
      return (listID: number) => {
        const list = state.lists.find((list) => list.id === listID);
        return list ? list.items : [];
      };
    },
  },
});
