<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { router, useForm, usePage } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import { route } from 'ziggy-js';

const page = usePage();
const product = page.props.product as {
    id: number;
    name: string;
    code: string;
    description?: string;
};

const form = useForm({
    name: product.name,
    code: product.code,
    description: product.description || '',
});

const submit = () => {
    form.put(route('manager.products.update', product.id), {
        onSuccess: () => {
            toast.success('Product updated successfully!', { duration: 4000 });
            router.visit(route('products.index'));
        },
        onError: () => {
            toast.error('Failed to update product.', { duration: 4000 });
        },
    });
};
</script>

<template>
    <AppLayout>
        <div class="w-full md:w-1/2">
            <form @submit.prevent="submit" class="space-y-6">
                <div>
                    <h1 class="text-2xl font-bold">Edit Product</h1>
                    <p class="text-sm text-muted-foreground">
                        Edit existing products and update product information
                    </p>
                </div>
                <div>
                    <Label for="code" class="mb-2">Product Code</Label>
                    <Input id="code" v-model="form.code" />
                    <p
                        v-if="form.errors.code"
                        class="mt-1 text-sm text-red-500"
                    >
                        {{ form.errors.code }}
                    </p>
                </div>
                <div>
                    <Label for="name" class="mb-2">Product Name</Label>
                    <Input id="name" v-model="form.name" />
                    <p
                        v-if="form.errors.name"
                        class="mt-1 text-sm text-red-500"
                    >
                        {{ form.errors.name }}
                    </p>
                </div>
                <div>
                    <Label for="description" class="mb-2">Description</Label>
                    <Textarea id="description" v-model="form.description" />
                    <p
                        v-if="form.errors.description"
                        class="mt-1 text-sm text-red-500"
                    >
                        {{ form.errors.description }}
                    </p>
                </div>
                <div class="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        type="button"
                        @click="router.visit(route('manager.products.index'))"
                        >Cancel</Button
                    >
                    <Button type="submit" :disabled="form.processing"
                        >Update</Button
                    >
                </div>
            </form>
        </div>
    </AppLayout>
</template>
