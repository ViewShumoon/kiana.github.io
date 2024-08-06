import type { ItemBase } from "@/types/tarkov/items";
import itemsData from "./database/templates/items.json";
import localesZhCN from "./database/locales/global/ch.json"

const items: ItemBase[] = Object.values(itemsData);

const localesZhCNMap: LocalesItem = localesZhCN;

const localesZhCNItems = getLocalizedItems();

interface LocalesItem {
    [key: string]: string;
}

function getLocalizedItems(): ItemBase[] {
    const result = items.map((item) => {

      const Name = localesZhCNMap[`${item._id} Name`];
      if (Name){
        item._props.Name = Name;
      }

      const ShortName = localesZhCNMap[`${item._id} ShortName`]
      if (ShortName){
        item._props.ShortName = ShortName;
      }

      const Description = localesZhCNMap[`${item._id} Description`];
      if (Description){
        item._props.Description = Description;
      }
      
      return item;
    });
  
    return result;
  }

export { items, localesZhCNItems }
