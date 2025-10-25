<script setup lang="ts">
import WarehousesTable from '@/components/table/WarehousesTable.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/AppLayout.vue';
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

const page = usePage();
const warehouses = ref(page.props.warehouses);
const search = ref('');

const filteredWarehouses = computed(() => {
    if (!search.value) return warehouses.value.data;
    return warehouses.value.data.filter((item: any) => {
        const nameMatch = item.product?.name
            ?.toLowerCase()
            .includes(search.value.toLowerCase());
        const codeMatch = item.product?.code
            ?.toLowerCase()
            .includes(search.value.toLowerCase());
        return nameMatch || codeMatch;
    });
});

const goToPage = (url: string | null) => {
    if (url) {
        router.visit(url, {
            preserveScroll: true,
            preserveState: true,
            only: ['warehouses'],
        });
    }
};
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="flex items-center gap-2 text-2xl font-bold">
                        Warehouse
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        Overview of finished goods stored in warehouse
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader
                    class="flex flex-wrap items-center justify-between gap-4"
                >
                    <CardTitle>Warehouse Items</CardTitle>
                    <div class="w-64">
                        <Input
                            type="text"
                            placeholder="Search by product name or code..."
                            v-model="search"
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    <WarehousesTable
                        :warehouses="warehouses"
                        :filtered-warehouses="filteredWarehouses"
                        @paginate="goToPage"
                    />
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
