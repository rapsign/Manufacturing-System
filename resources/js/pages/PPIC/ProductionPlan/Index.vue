<script setup lang="ts">
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
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
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import { router, usePage } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, Eye, Plus } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { route } from 'ziggy-js';

const page = usePage();

onMounted(() => {
    const flash = page.props.flash || {};
    if (flash.success) toast.success(flash.success, { duration: 5000 });
    else if (flash.error) toast.error(flash.error, { duration: 5000 });
});

const productionPlans = ref(
    page.props.productionPlans as {
        data:
            | Array<{
                  id: number;
                  product: { name: string } | null;
                  productCode: { code: string } | null;
                  quantity: number;
                  due_date: string;
                  creator: { name: string } | null;
                  status: string;
                  notes: string | null;
              }>
            | [];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
    },
);

watch(
    () => page.props.productionPlans,
    (newPlans) => {
        productionPlans.value = newPlans as typeof productionPlans.value;
    },
);

const search = ref('');
const selectedStatus = ref<string | null>(null);

const statusCounts = computed(() => {
    const counts: Record<string, number> = {};
    productionPlans.value.data.forEach((plan) => {
        const status = plan.status || 'unknown';
        counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
});

const filteredPlans = computed(() =>
    productionPlans.value.data.filter((p) => {
        const matchesSearch =
            p.product?.name
                ?.toLowerCase()
                .includes(search.value.toLowerCase()) ||
            p.status?.toLowerCase().includes(search.value.toLowerCase()) ||
            p.notes?.toLowerCase().includes(search.value.toLowerCase());

        const matchesStatus =
            !selectedStatus.value ||
            selectedStatus.value === 'all' ||
            p.status === selectedStatus.value;

        return matchesSearch && matchesStatus;
    }),
);

const goToPage = (url: string | null) => {
    if (url) router.visit(url, { preserveScroll: true });
};

const openDeleteDialog = ref(false);
const planToDelete = ref<number | null>(null);

const confirmDelete = (id: number) => {
    planToDelete.value = id;
    openDeleteDialog.value = true;
};

const destroy = async () => {
    if (!planToDelete.value) return;
    router.delete(route('ppic.production-plans.destroy', planToDelete.value), {
        preserveScroll: true,
        onSuccess: () => {
            productionPlans.value.data = productionPlans.value.data.filter(
                (p) => p.id !== planToDelete.value,
            );
            openDeleteDialog.value = false;
            planToDelete.value = null;
            toast.success('Production Plan deleted successfully!', {
                duration: 4000,
            });
        },
        onError: () => {
            toast.error('Failed to delete Production Plan.', {
                duration: 4000,
            });
        },
    });
};

const openDetailDialog = ref(false);
const selectedPlan = ref<any>(null);

const showDetails = (plan: any) => {
    selectedPlan.value = plan;
    openDetailDialog.value = true;
};

const handleDeleteFromDialog = (id: number) => {
    openDetailDialog.value = false;
    setTimeout(() => {
        confirmDelete(id);
    }, 200);
};

const submitPlan = async (id: number) => {
    if (!id) return;

    router.put(
        route('ppic.production-plans.submit', id),
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Production Plan has been submitted!', {
                    duration: 4000,
                });
                openDetailDialog.value = false;
            },
            onError: () => {
                toast.error('Failed to submit Production Plan.', {
                    duration: 4000,
                });
            },
        },
    );
};

const goToCreate = () => router.visit(route('ppic.production-plans.create'));

const getStatusColor = (status: string) => {
    switch (status) {
        case 'draft':
            return 'bg-gray-500 text-white';
        case 'pending':
            return 'bg-yellow-500 text-black';
        case 'approved':
            return 'bg-green-500 text-black';
        case 'rejected':
            return 'bg-red-500 text-white';
        case 'processed':
            return 'bg-blue-500 text-white';
        default:
            return 'bg-gray-300 text-black';
    }
};
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">Production Plans</h1>
                    <p class="text-sm text-muted-foreground">
                        Manage your production schedules efficiently
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
                        placeholder="Search plan..."
                    />
                </div>
            </div>
            <Card>
                <CardHeader class="border-b pb-3">
                    <div
                        class="flex w-full flex-wrap items-center justify-between gap-4"
                    >
                        <CardTitle
                            class="text-lg font-semibold whitespace-nowrap"
                        >
                            Production Plans
                        </CardTitle>
                        <div
                            class="flex min-w-[250px] flex-1 flex-wrap items-center justify-center gap-2"
                        >
                            <Badge
                                variant="outline"
                                class="cursor-pointer bg-white text-gray-700 transition-all duration-150 hover:bg-gray-100"
                                :class="{
                                    'ring-offset scale-105 ring-2 ring-primary':
                                        selectedStatus === 'all' ||
                                        !selectedStatus,
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
                                        'ring-offset scale-105 ring-2 ring-primary':
                                            selectedStatus === status,
                                    },
                                ]"
                                @click="selectedStatus = status"
                            >
                                {{ status }} ({{ count }})
                            </Badge>
                        </div>
                        <Button
                            size="sm"
                            @click="goToCreate"
                            class="whitespace-nowrap"
                        >
                            <Plus class="mr-1 h-4 w-4" /> Add Plan
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[50px] text-center"
                                    >#</TableHead
                                >
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Created By</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Notes</TableHead>
                                <TableHead class="w-[150px] text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="(plan, index) in filteredPlans"
                                :key="plan.id"
                                class="hover:bg-muted/40"
                            >
                                <TableCell class="text-center">
                                    {{
                                        (productionPlans.current_page - 1) * 5 +
                                        index +
                                        1
                                    }}
                                </TableCell>
                                <TableCell>
                                    <div class="flex flex-col">
                                        <span
                                            class="font-medium text-foreground"
                                        >
                                            {{ plan.product?.name || '-' }}
                                        </span>
                                        <span
                                            v-if="plan.product?.code"
                                            class="text-xs text-muted-foreground"
                                        >
                                            {{ plan.product.code }}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{{ plan.quantity }}</TableCell>
                                <TableCell>{{ plan.due_date }}</TableCell>
                                <TableCell>{{
                                    plan.creator?.name || '-'
                                }}</TableCell>
                                <TableCell>
                                    <Badge
                                        :class="`${getStatusColor(plan.status)} capitalize`"
                                    >
                                        {{ plan.status }}
                                    </Badge>
                                </TableCell>
                                <TableCell>{{ plan.notes || '-' }}</TableCell>
                                <TableCell class="text-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        @click="showDetails(plan)"
                                    >
                                        <Eye class="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="filteredPlans.length === 0">
                                <TableCell
                                    colspan="8"
                                    class="py-6 text-center text-muted-foreground"
                                >
                                    No production plans found.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div class="mt-6 flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-8 w-8"
                            :disabled="!productionPlans.links[0]?.url"
                            @click="goToPage(productionPlans.links[0]?.url)"
                        >
                            <ChevronLeft class="h-4 w-4" />
                        </Button>

                        <template
                            v-for="(link, index) in productionPlans.links.slice(
                                1,
                                productionPlans.links.length - 1,
                            )"
                            :key="index"
                        >
                            <Button
                                v-if="!isNaN(link.label)"
                                :variant="link.active ? 'default' : 'outline'"
                                class="h-8 w-8"
                                @click="goToPage(link.url)"
                            >
                                {{ link.label }}
                            </Button>
                        </template>

                        <Button
                            variant="outline"
                            size="icon"
                            class="h-8 w-8"
                            :disabled="
                                !productionPlans.links[
                                    productionPlans.links.length - 1
                                ]?.url
                            "
                            @click="
                                goToPage(
                                    productionPlans.links[
                                        productionPlans.links.length - 1
                                    ]?.url,
                                )
                            "
                        >
                            <ChevronRight class="h-4 w-4" />
                        </Button>
                    </div>
                    <ConfirmDeleteDialog
                        v-model:open="openDeleteDialog"
                        title="Delete Production Plan"
                        description="Are you sure you want to delete this plan? This action cannot be undone."
                        confirm-text="Delete"
                        cancel-text="Cancel"
                        @confirm="destroy"
                    />
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

                            <div
                                v-if="selectedPlan"
                                class="divide-y divide-border"
                            >
                                <div
                                    class="flex items-center justify-between py-3"
                                >
                                    <span class="text-sm text-muted-foreground"
                                        >Product</span
                                    >
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
                                            {{
                                                selectedPlan.product?.name ||
                                                '-'
                                            }}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    class="flex items-center justify-between py-3"
                                >
                                    <span class="text-sm text-muted-foreground"
                                        >Quantity</span
                                    >
                                    <span class="font-semibold text-foreground">
                                        {{ selectedPlan.quantity }}
                                    </span>
                                </div>

                                <div
                                    class="flex items-center justify-between py-3"
                                >
                                    <span class="text-sm text-muted-foreground"
                                        >Due Date</span
                                    >
                                    <span class="font-semibold text-foreground">
                                        {{ selectedPlan.due_date }}
                                    </span>
                                </div>

                                <div
                                    class="flex items-center justify-between py-3"
                                >
                                    <span class="text-sm text-muted-foreground"
                                        >Created By</span
                                    >
                                    <span class="font-medium text-foreground">
                                        {{ selectedPlan.creator?.name || '-' }}
                                    </span>
                                </div>

                                <div
                                    class="flex items-start justify-between py-3"
                                >
                                    <span class="text-sm text-muted-foreground"
                                        >Notes</span
                                    >
                                    <span
                                        class="max-w-[70%] text-right leading-relaxed font-normal text-foreground/90"
                                    >
                                        {{ selectedPlan.notes || '-' }}
                                    </span>
                                </div>
                            </div>

                            <DialogFooter
                                class="mt-6 flex justify-end gap-3 border-t pt-4"
                            >
                                <template
                                    v-if="selectedPlan?.status === 'draft'"
                                >
                                    <Button
                                        variant="default"
                                        class="font-medium"
                                        @click="submitPlan(selectedPlan.id)"
                                    >
                                        Submit for Approval
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        class="font-medium"
                                        @click="
                                            handleDeleteFromDialog(
                                                selectedPlan.id,
                                            )
                                        "
                                    >
                                        Delete
                                    </Button>
                                </template>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
