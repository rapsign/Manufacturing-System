<script setup lang="ts">
import ProductionPlansTable from '@/components/table/ProductionPlansTable.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/AppLayout.vue';
import { router, usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { route } from 'ziggy-js';

const page = usePage();
const productionPlans = ref(page.props.productionPlans);
const openDetailDialog = ref(false);
const selectedPlan = ref<any>(null);
const selectedStatus = ref<string | null>('all');
const search = ref('');

onMounted(() => {
    const flash = page.props.flash || {};
    if (flash.success) toast.success(flash.success);
    else if (flash.error) toast.error(flash.error);
});

watch(
    () => page.props.productionPlans,
    (newPlans) => (productionPlans.value = newPlans),
);

const getStatusColor = (status: string) => {
    switch (status) {
        case 'draft':
            return 'bg-gray-500 text-white';
        case 'pending':
            return 'bg-yellow-500 text-black';
        case 'approved':
            return 'bg-green-500 text-white';
        case 'rejected':
            return 'bg-red-500 text-white';
        case 'processed':
            return 'bg-blue-500 text-white';
        default:
            return 'bg-gray-300 text-black';
    }
};

const statusCounts = computed(() => {
    const counts: Record<string, number> = {};
    productionPlans.value.data.forEach((plan: any) => {
        const status = plan.status || 'unknown';
        counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
});

const filteredPlans = computed(() => {
    const filtered = productionPlans.value.data.filter((p: any) => {
        const matchesStatus =
            selectedStatus.value === 'all' ||
            !selectedStatus.value ||
            p.status === selectedStatus.value;
        const query = search.value.toLowerCase();
        const matchesSearch =
            p.product?.name?.toLowerCase().includes(query) ||
            p.product?.code?.toLowerCase().includes(query) ||
            p.creator?.toLowerCase().includes(query);
        return matchesStatus && matchesSearch;
    });
    return filtered;
});

const goToPage = (url: string | null) => {
    if (url) router.visit(url, { preserveScroll: true });
};

const showDetails = (plan: any) => {
    selectedPlan.value = plan;
    openDetailDialog.value = true;
};

const approvePlan = (id: number) => {
    router.put(
        route('manager.production-plans.approve', id),
        {},
        {
            onSuccess: () => {
                toast.success('Plan approved successfully');
                openDetailDialog.value = false;
            },
            onError: () => toast.error('Failed to approve plan'),
        },
    );
};

const rejectPlan = (id: number) => {
    router.put(
        route('manager.production-plans.reject', id),
        {},
        {
            onSuccess: () => {
                toast.error('Plan rejected');
                openDetailDialog.value = false;
            },
            onError: () => toast.error('Failed to reject plan'),
        },
    );
};
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">
                        Production Plan Approvals
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        Review and approve production plans submitted by PPIC.
                    </p>
                </div>
            </div>
            <div class="flex items-center justify-start gap-2">
                <div class="w-64">
                    <Input
                        v-model="search"
                        type="text"
                        placeholder="Search by product, code, or creator..."
                    />
                </div>
            </div>
            <Card>
                <CardHeader class="border-b pb-3">
                    <div
                        class="flex w-full flex-wrap items-center justify-between gap-4"
                    >
                        <CardTitle class="text-lg font-semibold">
                            Production Plans
                        </CardTitle>
                        <div
                            class="flex flex-wrap items-center justify-center gap-2"
                        >
                            <Badge
                                variant="outline"
                                class="cursor-pointer bg-white text-gray-700 transition-all duration-150 hover:bg-gray-100"
                                :class="{
                                    'ring-2 ring-primary ring-offset-2':
                                        selectedStatus === 'all',
                                }"
                                @click="selectedStatus = 'all'"
                            >
                                All ({{ productionPlans.data.length }})
                            </Badge>

                            <Badge
                                v-for="(count, status) in statusCounts"
                                :key="status"
                                class="cursor-pointer capitalize transition-all duration-150"
                                :class="[
                                    getStatusColor(status),
                                    {
                                        'scale-105 ring-2 ring-primary ring-offset-2':
                                            selectedStatus === status,
                                    },
                                ]"
                                @click="selectedStatus = status"
                            >
                                {{ status }} ({{ count }})
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <ProductionPlansTable
                        :plans="productionPlans"
                        :filtered-plans="filteredPlans"
                        @show-details="showDetails"
                        @paginate="goToPage"
                    />
                </CardContent>
            </Card>

            <Dialog v-model:open="openDetailDialog">
                <DialogContent
                    class="max-w-lg rounded-2xl border border-border bg-background shadow-lg"
                >
                    <DialogHeader class="border-b pb-4">
                        <div class="flex items-center gap-2">
                            <DialogTitle
                                class="text-xl font-semibold tracking-tight"
                            >
                                Production Plan Detail
                            </DialogTitle>

                            <Badge
                                :class="`${getStatusColor(selectedPlan?.status)} px-3 py-0.5 text-xs font-medium capitalize shadow-sm`"
                            >
                                {{ selectedPlan?.status || '-' }}
                            </Badge>
                        </div>

                        <DialogDescription
                            class="-mt-2 text-sm text-muted-foreground"
                        >
                            Detailed information of the selected plan.
                        </DialogDescription>
                    </DialogHeader>

                    <div v-if="selectedPlan" class="divide-y divide-border">
                        <div class="flex items-center justify-between py-3">
                            <span class="text-sm text-muted-foreground">
                                Product
                            </span>
                            <div
                                class="flex items-center justify-end gap-2 text-right"
                            >
                                <Badge
                                    v-if="selectedPlan.product?.code"
                                    variant="outline"
                                    class="text-[11px] font-normal text-muted-foreground"
                                >
                                    {{ selectedPlan.product.code }}
                                </Badge>
                                <span class="font-medium">
                                    {{ selectedPlan.product?.name || '-' }}
                                </span>
                            </div>
                        </div>

                        <div class="flex items-center justify-between py-3">
                            <span class="text-sm text-muted-foreground">
                                Quantity
                            </span>
                            <span class="font-semibold text-foreground">
                                {{ selectedPlan.quantity }}
                            </span>
                        </div>

                        <div class="flex items-center justify-between py-3">
                            <span class="text-sm text-muted-foreground">
                                Due Date
                            </span>
                            <span class="font-semibold text-foreground">
                                {{ selectedPlan.due_date }}
                            </span>
                        </div>

                        <div class="flex items-center justify-between py-3">
                            <span class="text-sm text-muted-foreground">
                                Created By
                            </span>
                            <span class="font-medium text-foreground">
                                {{ selectedPlan.creator }}
                            </span>
                        </div>

                        <div class="flex items-start justify-between py-3">
                            <span class="text-sm text-muted-foreground">
                                Notes
                            </span>
                            <span
                                class="max-w-[70%] text-right leading-relaxed font-normal text-foreground/90"
                            >
                                {{ selectedPlan.notes || '-' }}
                            </span>
                        </div>
                    </div>

                    <DialogFooter class="mt-6 flex justify-end gap-3 pt-4">
                        <template v-if="selectedPlan?.status === 'pending'">
                            <Button
                                variant="default"
                                class="font-medium"
                                @click="approvePlan(selectedPlan.id)"
                            >
                                Approve
                            </Button>

                            <Button
                                variant="destructive"
                                class="font-medium"
                                @click="rejectPlan(selectedPlan.id)"
                            >
                                Reject
                            </Button>
                        </template>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </AppLayout>
</template>
