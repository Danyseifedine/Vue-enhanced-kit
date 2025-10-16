import { ref } from 'vue';

export interface DeleteDialogItem {
    id: number;
    [key: string]: any;
}

export function useDeleteDialog<T extends DeleteDialogItem>(globalKey?: string) {
    const deleteDialogOpen = ref(false);
    const itemToDelete = ref<T | null>(null);

    const openDeleteDialog = (item: T) => {
        itemToDelete.value = item;
        deleteDialogOpen.value = true;
    };

    const closeDeleteDialog = () => {
        deleteDialogOpen.value = false;
        itemToDelete.value = null;
    };

    // Make openDeleteDialog available globally if a key is provided
    if (globalKey) {
        (window as any)[globalKey] = openDeleteDialog;
    }

    return {
        deleteDialogOpen,
        itemToDelete,
        openDeleteDialog,
        closeDeleteDialog,
    };
}

