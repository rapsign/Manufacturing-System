<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout.vue';
import { router, usePage } from '@inertiajs/vue3';
import { route } from 'ziggy-js';

const page = usePage();
const order = page.props.order;

const getStatusColor = (status: string) => {
    switch (status) {
        case 'waiting':
            return 'bg-yellow-500 text-black';
        case 'in_progress':
            return 'bg-blue-500 text-white';
        case 'completed':
            return 'bg-green-500 text-white';
        case 'shipped':
            return 'text-black';
        default:
            return 'bg-gray-400 text-black';
    }
};

const printReport = () => {
    window.print();
};

const goBack = () => {
    router.visit(route('production.reports.index'));
};
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">Production Report Detail</h1>
                    <p class="text-sm text-muted-foreground">
                        Detailed report of a single production order
                    </p>
                </div>
                <div class="flex items-center gap-2">
                    <Button variant="outline" @click="goBack">Back</Button>
                    <Button variant="default" @click="printReport">
                        Print Report
                    </Button>
                </div>
            </div>
            <Card class="shadow-md print:shadow-none">
                <CardHeader
                    class="flex items-center justify-between border-b pb-2"
                >
                    <CardTitle>Production Order #{{ order.id }}</CardTitle>
                    <Badge
                        :class="`${getStatusColor(order.status)} capitalize`"
                        class="text-sm"
                    >
                        {{ order.status.replace('_', ' ') }}
                    </Badge>
                </CardHeader>
                <CardContent class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="space-y-3 text-sm">
                        <div>
                            <p class="text-muted-foreground">Product Name</p>
                            <p class="font-semibold">
                                {{ order.product_name }}
                            </p>
                        </div>
                        <div>
                            <p class="text-muted-foreground">Product Code</p>
                            <p class="font-semibold">
                                {{ order.product_code }}
                            </p>
                        </div>
                        <div>
                            <p class="text-muted-foreground">Target Date</p>
                            <p class="font-semibold">
                                {{ order.target_date }}
                            </p>
                        </div>
                        <div>
                            <p class="text-muted-foreground">Created By</p>
                            <p class="font-semibold">
                                {{ order.created_by || '-' }}
                            </p>
                        </div>
                        <div>
                            <p class="text-muted-foreground">Completed At</p>
                            <p class="font-semibold">
                                {{ order.completed_at || '-' }}
                            </p>
                        </div>
                    </div>
                    <div class="space-y-3 text-sm">
                        <div>
                            <p class="text-muted-foreground">
                                Planned Quantity
                            </p>
                            <p class="font-semibold">{{ order.quantity }}</p>
                        </div>

                        <div>
                            <p class="text-muted-foreground">Actual Quantity</p>
                            <p class="font-semibold text-green-600">
                                {{ order.actual_quantity ?? '-' }}
                            </p>
                        </div>

                        <div>
                            <p class="text-muted-foreground">
                                Rejected Quantity
                            </p>
                            <p class="font-semibold text-red-500">
                                {{ order.rejected_quantity ?? '-' }}
                            </p>
                        </div>

                        <div>
                            <p class="text-muted-foreground">Approved By</p>
                            <p class="font-semibold">
                                {{ order.approved_by || '-' }}
                            </p>
                        </div>

                        <div>
                            <p class="text-muted-foreground">Completed By</p>
                            <p class="font-semibold">
                                {{ order.completed_by || '-' }}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>

<style scoped>
@media print {
    button,
    .flex.items-center.gap-2 {
        display: none !important;
    }
    .print\:shadow-none {
        box-shadow: none !important;
    }
}
</style>
