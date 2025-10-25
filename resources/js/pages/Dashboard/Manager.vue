<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
const page = usePage();
const stats = computed(
    () =>
        page.props.stats as {
            products: number;
            plans: number;
            pendingPlans: number;
            orders: number;
        },
);
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <h1 class="mb-6 text-2xl font-bold">Dashboard</h1>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">{{ stats.products }}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-md font-bold"
                            >Production Plans</CardTitle
                        >
                        <Badge
                            variant="outline"
                            class="bg-yellow-600 px-2 py-1 text-sm"
                        >
                            {{ stats.pendingPlans }}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.plans }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Production Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">{{ stats.orders }}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
