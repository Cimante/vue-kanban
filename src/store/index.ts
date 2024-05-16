import { defineStore } from "pinia";
import { Item } from "../types/item";

interface List {
  id: number;
  title: string;
  items: Item[];
}

export const useKanbanStore = defineStore("kanban", {
  state: () => {
    return {
      lists: [
        {
          id: 1,
          title: "Не спланировано",
          items: [
            { id: 0, title: "Task A" },
            { id: 1, title: "Task B" },
          ] as Item[],
        } as List,
        {
          id: 2,
          title: "В работе",
          items: [{ id: 2, title: "Task C" }] as Item[],
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
