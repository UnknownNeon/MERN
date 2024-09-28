import {create } from "zustand"

const PORT = 9999;
const SITE = "http://localhost"

export const useItemStore = create((set)=>({
    items : [],
    setItems : (items) => set({items}),
    createItem : async (newItem) => {
        if(!newItem.name || !newItem.image || !newItem.severity){
            return { success: false , message: "Fill all field "}
        }
        const res = await fetch(`${SITE}:${PORT}/api/items`,
            {
                method : "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newItem)
            }
        )
        const data = await res.json();
        set((state) => ({items: [...state.items , data.data]}))
        return { success: true , message: "Succesfull Created"}
    },
}));