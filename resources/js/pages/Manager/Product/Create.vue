<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { router, useForm } from '@inertiajs/vue3';
import { route } from 'ziggy-js';

const form = useForm({
    name: '',
    code: '',
    description: '',
});

const submit = () => {
    form.post(route('manager.products.store'), {
        onSuccess: () => router.visit(route('manager.products.index')),
    });
};
</script>

<template>
    <AppLayout>
        <div class="w-full md:w-1/2">
            <form @submit.prevent="submit" class="space-y-6">
                <div>
                    <h1 class="text-2xl font-bold">Add Product</h1>
                    <p class="text-sm text-muted-foreground">
                        Add new products and organize product information
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
                    <Textarea
                        id="description"
                        class="bg-neutral-950"
                        v-model="form.description"
                    />
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
                        >Save</Button
                    >
                </div>
            </form>
        </div>
    </AppLayout>
</template>
