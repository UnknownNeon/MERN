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

    fetchItems: async () => {
        const res = await fetch(`${SITE}:${PORT}/api/items`);
        const data = await res.json();
        set({ items : data.data});
    },
    deleteItem: async (pid) => {
        const res = await fetch(`${SITE}:${PORT}/api/items/${pid}` ,{
            method:"DELETE",
        }
        );
        const data =await res.json();
        if(!data.success) 
            return { success: false , message:" Failed to delete data"}
        set(state => ({ items : state.items.filter(item => item._id !== pid)}));
        return {success: true , message: "Data deleted successfully !"}
    },
    updateItem: async (pid , updatedItem) => {
        const res = await fetch(`${SITE}:${PORT}/api/items/${pid}`, {
            method : "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(updatedItem)
        })
        const data = await res.json();
        if(!data.success) 
            return { success: false , message:" Failed to update data"}
        set(state => ({
            items: state.items.map(item => item._id === pid ? data.data : item)
        }))
    }
}));