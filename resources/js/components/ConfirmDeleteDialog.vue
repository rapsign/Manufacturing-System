<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const props = defineProps<{
    open: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}>();

const emit = defineEmits<{
    (e: 'update:open', value: boolean): void;
    (e: 'confirm'): void;
}>();

const handleClose = () => emit('update:open', false);
const handleConfirm = () => emit('confirm');
</script>

<template>
    <AlertDialog :open="open" @update:open="emit('update:open', $event)">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{
                    title || 'Delete Confirmation'
                }}</AlertDialogTitle>
                <AlertDialogDescription>
                    {{
                        description ||
                        'Are you sure you want to delete this item? This action cannot be undone.'
                    }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="handleClose">
                    {{ cancelText || 'Cancel' }}
                </AlertDialogCancel>
                <AlertDialogAction @click="handleConfirm">
                    {{ confirmText || 'Delete' }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
