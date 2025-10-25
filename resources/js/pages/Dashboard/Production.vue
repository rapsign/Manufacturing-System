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
        <div class="space-y-8">
            <div>
                <h1 class="mb-2 text-2xl font-bold">Production Dashboard</h1>
                <p class="text-sm text-muted-foreground">
                    Monitor ongoing production orders and performance overview.
                </p>
            </div>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Production Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.total_orders }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle class="text-md font-bold">
                            Waiting Production Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.waiting }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle class="text-md font-bold">
                            Production Order In Progress
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.in_progress }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle class="text-md font-bold">
                            Completed Production Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">
                            {{ stats.completed }}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle class="text-md font-bold">
                            Overdue Production Orders
                        </CardTitle>
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
