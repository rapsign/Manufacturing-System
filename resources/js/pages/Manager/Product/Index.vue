<script setup lang="ts">
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import ProductsTable from '@/components/table/ProductsTable.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { router, usePage } from '@inertiajs/vue3';
import { Plus } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { route } from 'ziggy-js';

const page = usePage();
const products = ref(page.props.products);
const search = ref('');
const openDeleteDialog = ref(false);
const productToDelete = ref<number | null>(null);

onMounted(() => {
    const flash = page.props.flash || {};
    if (flash.success) toast.success(flash.success, { duration: 5000 });
    else if (flash.error) toast.error(flash.error, { duration: 5000 });
});

watch(
    () => page.props.products,
    (newVal) => {
        products.value = newVal;
    },
);

const filteredProducts = computed(() =>
    products.value.data.filter(
        (p) =>
            p.name.toLowerCase().includes(search.value.toLowerCase()) ||
            p.code.toLowerCase().includes(search.value.toLowerCase()),
    ),
);

const goToPage = (url: string | null) => {
    if (url) router.visit(url, { preserveScroll: true });
};

const goToCreate = () => {
    router.visit(route('manager.products.create'));
};

const goToEdit = (id: number) => {
    router.visit(route('manager.products.edit', id));
};

const confirmDelete = (id: number) => {
    productToDelete.value = id;
    openDeleteDialog.value = true;
};

const destroy = async () => {
    if (!productToDelete.value) return;

    router.delete(route('manager.products.destroy', productToDelete.value), {
        preserveScroll: true,
        onSuccess: () => {
            products.value = products.value.filter(
                (p) => p.id !== productToDelete.value,
            );
            openDeleteDialog.value = false;
            productToDelete.value = null;
            toast.success('Product deleted successfully!', { duration: 4000 });
        },
        onError: () => {
            toast.error('Failed to delete product.', { duration: 4000 });
        },
    });
};
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">Product List</h1>
                    <p class="text-sm text-muted-foreground">
                        Manage your master product data
                    </p>
                </div>
            </div>
            <div class="flex items-center justify-start gap-2">
                <div class="w-64">
                    <Label for="search" class="sr-only">Search</Label>
                    <Input
                        id="search"
                        type="text"
                        v-model="search"
                        placeholder="Search product..."
                    />
                </div>
            </div>
            <Card>
                <CardHeader class="flex flex-row items-center justify-between">
                    <CardTitle>Products</CardTitle>
                    <Button size="sm" @click="goToCreate">
                        <Plus class="mr-1 h-4 w-4" /> Add Product
                    </Button>
                </CardHeader>
                <CardContent>
                    <ProductsTable
                        :products="products"
                        :filtered-products="filteredProducts"
                        @edit="goToEdit"
                        @delete="confirmDelete"
                        @paginate="goToPage"
                    />
                    <ConfirmDeleteDialog
                        v-model:open="openDeleteDialog"
                        title="Delete Product"
                        description="Are you sure you want to delete this product? This action cannot be undone."
                        confirm-text="Delete"
                        cancel-text="Cancel"
                        @confirm="destroy"
                    />
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
