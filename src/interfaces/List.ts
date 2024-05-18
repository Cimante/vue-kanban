import { Item } from "./../types/item";

export interface List {
  id: number;
  title: string;
  items: Item[];
}
