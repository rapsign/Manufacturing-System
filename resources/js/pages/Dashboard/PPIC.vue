<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const stats = computed(() => page.props.stats);
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <h1 class="mb-6 text-2xl font-bold">Dashboard</h1>
            <Card class="w-full">
                <CardHeader>
                    <CardTitle>Total Production Plans</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-3xl font-bold">
                        {{ stats.total_plans }}
                    </p>
                </CardContent>
            </Card>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-md font-bold"
                            >Draft Plans</CardTitle
                        >
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.draft }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-md font-bold"
                            >Pending Plans</CardTitle
                        >
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.pending }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-md font-bold"
                            >Approved Plans</CardTitle
                        >
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.approved }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-md font-bold"
                            >Rejected Plans</CardTitle
                        >
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.rejected }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-md font-bold"
                            >In Process</CardTitle
                        >
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.processed }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader
                        class="flex flex-row items-center justify-between space-y-0 pb-2"
                    >
                        <CardTitle class="text-md font-bold"
                            >Overdue / Nearly Due</CardTitle
                        >
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.overdue }}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
