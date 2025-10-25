<script setup lang="ts">
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
import { router, useForm, usePage } from '@inertiajs/vue3';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
import { toast } from 'vue-sonner';

const page = usePage();
const search = ref('');
const selectedStatus = ref<string | null>(null);

const form = useForm({
    actual_quantity: 0,
    rejected_quantity: 0,
    notes: '',
});

onMounted(() => {
    const flash = page.props.flash || {};
    if (flash.success) toast.success(flash.success, { duration: 5000 });
    else if (flash.error) toast.error(flash.error, { duration: 5000 });
});

const productionOrders = ref(
    page.props.orders as {
        data:
            | Array<{
                  id: number;
                  product: { name: string; code: string } | null;
                  quantity: number;
                  target_date: string;
                  status: string;
                  actual_quantity: number | null;
                  rejected_quantity: number | null;
              }>
            | [];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
    },
);

watch(
    () => page.props.orders,
    (newOrders) => {
        productionOrders.value = newOrders as typeof productionOrders.value;
    },
);

const statusCounts = computed(() => {
    const counts: Record<string, number> = {};
    productionOrders.value.data.forEach((order) => {
        const status = order.status || 'unknown';
        counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
});

const filteredOrders = computed(() =>
    productionOrders.value.data.filter((o) => {
        const matchesSearch =
            o.product?.name
                ?.toLowerCase()
                .includes(search.value.toLowerCase()) ||
            o.product?.code?.toLowerCase().includes(search.value.toLowerCase());

        const matchesStatus =
            !selectedStatus.value ||
            selectedStatus.value === 'all' ||
            o.status === selectedStatus.value;

        return matchesSearch && matchesStatus;
    }),
);

const goToPage = (url: string | null) => {
    if (url) router.visit(url, { preserveScroll: true });
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'waiting':
            return 'bg-yellow-500 text-black';
        case 'in_progress':
            return 'bg-blue-500 text-white';
        case 'completed':
            return 'bg-green-500 text-white';
        default:
            return 'bg-gray-300 text-black';
    }
};

const openDetailDialog = ref(false);
const openCompleteDialog = ref(false);
const openLogDialog = ref(false);
const selectedOrder = ref<any>(null);

const showDetails = (order: any) => {
    selectedOrder.value = order;
    openDetailDialog.value = true;
};
const showLogs = (order: any) => {
    selectedOrder.value = order;
    openLogDialog.value = true;
};
const showCompleteDialog = (order: any) => {
    selectedOrder.value = order;
    form.actual_quantity = 0;
    form.rejected_quantity = 0;
    form.notes = '';
    openCompleteDialog.value = true;
};
const processOrder = async (id: number) => {
    if (!id) return;

    router.put(
        route('production.production-orders.process', id),
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Production process started', {
                    duration: 4000,
                });
                openDetailDialog.value = false;
            },
            onError: () => {
                toast.error('Failed to start production process.', {
                    duration: 4000,
                });
            },
        },
    );
};

watch(
    () => form.actual_quantity,
    (val) => {
        if (!selectedOrder.value) return;
        const planned = selectedOrder.value.quantity;
        const actual = Number(val) || 0;
        form.rejected_quantity = Math.max(planned - actual, 0);
    },
);

watch(
    () => form.rejected_quantity,
    (val) => {
        if (!selectedOrder.value) return;
        const planned = selectedOrder.value.quantity;
        const rejected = Number(val) || 0;
        form.actual_quantity = Math.max(planned - rejected, 0);
    },
);

const submitCompletion = async () => {
    if (!selectedOrder.value) return;

    router.put(
        route('production.production-orders.complete', selectedOrder.value.id),
        form,
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Production order completed successfully!', {
                    duration: 4000,
                });
                openCompleteDialog.value = false;
                form.reset();
            },
            onError: () => {
                toast.error('Failed to complete production order.', {
                    duration: 4000,
                });
            },
        },
    );
};
const shipOrder = async (id: number) => {
    if (!id) return;

    router.put(
        route('production.production-orders.ship', id),
        {},
        {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    'Production order has been shipped successfully!',
                    {
                        duration: 4000,
                    },
                );
            },
            onError: () => {
                toast.error('Failed to ship the production order.', {
                    duration: 4000,
                });
            },
        },
    );
};
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">Production Orders</h1>
                    <p class="text-sm text-muted-foreground">
                        Manage your production progress and status efficiently
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
                        placeholder="Search order..."
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
                            Production Orders
                        </CardTitle>
                        <div
                            class="flex flex-wrap items-center justify-center gap-2"
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
                                All ({{ productionOrders.data.length }})
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
                                {{ status.replace('_', ' ') }} ({{ count }})
                            </Badge>
                        </div>
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
                                <TableHead>Target Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actual Qty</TableHead>
                                <TableHead>Rejected Qty</TableHead>
                                <TableHead>Detail</TableHead>
                                <TableHead class="w-[120px] text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="(order, index) in filteredOrders"
                                :key="order.id"
                                class="hover:bg-muted/40"
                            >
                                <TableCell class="text-center">
                                    {{
                                        (productionOrders.current_page - 1) *
                                            10 +
                                        index +
                                        1
                                    }}
                                </TableCell>
                                <TableCell>
                                    <div class="flex flex-col">
                                        <span
                                            class="font-medium text-foreground"
                                        >
                                            {{ order.product?.name || '-' }}
                                        </span>
                                        <span
                                            v-if="order.product?.code"
                                            class="text-xs text-muted-foreground"
                                        >
                                            {{ order.product.code }}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>{{ order.quantity }}</TableCell>
                                <TableCell>{{ order.target_date }}</TableCell>
                                <TableCell>
                                    <Badge
                                        :class="`${getStatusColor(order.status)} capitalize`"
                                    >
                                        {{ order.status.replace('_', ' ') }}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {{ order.actual_quantity ?? '-' }}
                                </TableCell>
                                <TableCell>
                                    {{ order.rejected_quantity ?? '-' }}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        @click="showLogs(order)"
                                        title="View Logs"
                                    >
                                        <Eye class="h-4 w-4" />
                                    </Button>
                                </TableCell>
                                <TableCell class="text-center">
                                    <div
                                        class="flex items-center justify-center gap-2"
                                    >
                                        <Button
                                            v-if="order.status === 'waiting'"
                                            size="sm"
                                            class="bg-yellow-500 text-black hover:bg-yellow-600"
                                            @click="showDetails(order)"
                                        >
                                            Process
                                        </Button>
                                        <Button
                                            v-if="
                                                order.status === 'in_progress'
                                            "
                                            size="sm"
                                            class="bg-green-600 text-white hover:bg-green-700"
                                            @click="showCompleteDialog(order)"
                                        >
                                            Complete Orders
                                        </Button>
                                        <Button
                                            v-else-if="
                                                order.status === 'completed'
                                            "
                                            size="sm"
                                            class="bg-blue-600 text-white hover:bg-blue-700"
                                            @click="shipOrder(order.id)"
                                        >
                                            Ship
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>

                            <TableRow v-if="filteredOrders.length === 0">
                                <TableCell
                                    colspan="8"
                                    class="py-6 text-center text-muted-foreground"
                                >
                                    No production orders found.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div class="mt-6 flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            class="h-8 w-8"
                            :disabled="!productionOrders.links[0]?.url"
                            @click="goToPage(productionOrders.links[0]?.url)"
                        >
                            <ChevronLeft class="h-4 w-4" />
                        </Button>
                        <template
                            v-for="(
                                link, index
                            ) in productionOrders.links.slice(
                                1,
                                productionOrders.links.length - 1,
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
                                !productionOrders.links[
                                    productionOrders.links.length - 1
                                ]?.url
                            "
                            @click="
                                goToPage(
                                    productionOrders.links[
                                        productionOrders.links.length - 1
                                    ]?.url,
                                )
                            "
                        >
                            <ChevronRight class="h-4 w-4" />
                        </Button>
                    </div>

                    <Dialog v-model:open="openDetailDialog">
                        <DialogContent
                            class="min-w-lg rounded-xl border border-border bg-background shadow-lg"
                        >
                            <DialogHeader class="border-b pb-3">
                                <div class="flex items-center gap-2">
                                    <DialogTitle class="text-xl font-semibold"
                                        >Production Order Detail</DialogTitle
                                    >
                                    <Badge
                                        :class="`${getStatusColor(selectedOrder?.status)} px-2 py-0.5 text-xs capitalize`"
                                    >
                                        {{
                                            selectedOrder?.status?.replace(
                                                '_',
                                                ' ',
                                            ) || '-'
                                        }}
                                    </Badge>
                                </div>
                                <DialogDescription
                                    class="mt-1 text-sm text-muted-foreground"
                                >
                                    Detailed information of this production
                                    order.
                                </DialogDescription>
                            </DialogHeader>

                            <div
                                v-if="selectedOrder"
                                class="divide-y divide-border"
                            >
                                <div
                                    v-for="(value, label) in {
                                        Product:
                                            selectedOrder.product?.name || '-',
                                        'Product Code':
                                            selectedOrder.product?.code || '-',
                                        Quantity: selectedOrder.quantity,
                                        'Target Date':
                                            selectedOrder.target_date,
                                        'Actual Quantity':
                                            selectedOrder.actual_quantity ??
                                            '-',
                                        'Rejected Quantity':
                                            selectedOrder.rejected_quantity ??
                                            '-',
                                        'Created By':
                                            selectedOrder.created_by?.name ||
                                            '-',
                                        'Approved By':
                                            selectedOrder.approved_by?.name ||
                                            '-',
                                    }"
                                    :key="label"
                                    class="flex justify-between py-3 text-sm"
                                >
                                    <span class="text-muted-foreground">{{
                                        label
                                    }}</span>
                                    <span class="font-medium text-foreground">{{
                                        value
                                    }}</span>
                                </div>
                            </div>

                            <DialogFooter
                                class="mt-6 flex justify-end gap-2 border-t pt-4"
                            >
                                <template
                                    v-if="selectedOrder?.status === 'waiting'"
                                >
                                    <Button
                                        variant="default"
                                        @click="processOrder(selectedOrder.id)"
                                        >Process</Button
                                    >
                                </template>
                                <Button
                                    variant="outline"
                                    @click="openDetailDialog = false"
                                    >Close</Button
                                >
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog v-model:open="openLogDialog">
                        <DialogContent
                            class="min-w-5xl rounded-xl border border-border bg-background shadow-lg"
                        >
                            <DialogHeader class="border-b pb-3">
                                <div class="flex items-center gap-2">
                                    <DialogTitle class="text-xl font-semibold"
                                        >Production Order Logs</DialogTitle
                                    >
                                    <Badge
                                        :class="`${getStatusColor(selectedOrder?.status)} px-2 py-0.5 text-xs capitalize`"
                                    >
                                        {{
                                            selectedOrder?.status?.replace(
                                                '_',
                                                ' ',
                                            ) || '-'
                                        }}
                                    </Badge>
                                </div>
                                <DialogDescription
                                    class="mt-1 text-sm text-muted-foreground"
                                >
                                    Detailed information of production order and
                                    activity logs.
                                </DialogDescription>
                            </DialogHeader>

                            <div
                                v-if="selectedOrder"
                                class="mb-6 divide-y divide-border"
                            >
                                <div
                                    v-for="(value, label) in {
                                        Product:
                                            selectedOrder.product?.name || '-',
                                        'Product Code':
                                            selectedOrder.product?.code || '-',
                                        Quantity: selectedOrder.quantity,
                                        'Target Date':
                                            selectedOrder.target_date,
                                        'Actual Quantity':
                                            selectedOrder.actual_quantity ??
                                            '-',
                                        'Rejected Quantity':
                                            selectedOrder.rejected_quantity ??
                                            '-',
                                        'Created By':
                                            selectedOrder.created_by?.name ||
                                            '-',
                                        'Approved By':
                                            selectedOrder.approved_by?.name ||
                                            '-',
                                    }"
                                    :key="label"
                                    class="flex justify-between py-3 text-sm"
                                >
                                    <span class="text-muted-foreground">{{
                                        label
                                    }}</span>
                                    <span class="font-medium text-foreground">{{
                                        value
                                    }}</span>
                                </div>
                            </div>

                            <h3
                                class="mb-2 text-lg font-semibold text-foreground"
                            >
                                Production Logs
                            </h3>
                            <div class="rounded-lg border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                                class="w-[40px] text-center"
                                                >#</TableHead
                                            >
                                            <TableHead>Status</TableHead>
                                            <TableHead>Changed By</TableHead>
                                            <TableHead>Notes</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow
                                            v-for="(
                                                log, index
                                            ) in selectedOrder?.production_logs"
                                            :key="log.id"
                                            class="hover:bg-muted/40"
                                        >
                                            <TableCell class="text-center">{{
                                                index + 1
                                            }}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    :class="`${getStatusColor(log.status)} capitalize`"
                                                >
                                                    {{
                                                        log.status.replace(
                                                            '_',
                                                            ' ',
                                                        )
                                                    }}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{{
                                                log.user?.name || '-'
                                            }}</TableCell>
                                            <TableCell>{{
                                                log.notes || '-'
                                            }}</TableCell>
                                            <TableCell>
                                                {{
                                                    new Date(
                                                        log.created_at,
                                                    ).toLocaleString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })
                                                }}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow
                                            v-if="
                                                !selectedOrder?.production_logs ||
                                                selectedOrder.production_logs
                                                    .length === 0
                                            "
                                        >
                                            <TableCell
                                                colspan="5"
                                                class="py-4 text-center text-muted-foreground"
                                            >
                                                No activity logs found.
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            <DialogFooter
                                class="mt-6 flex justify-end border-t pt-4"
                            >
                                <Button
                                    variant="outline"
                                    @click="openLogDialog = false"
                                    >Close</Button
                                >
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog v-model:open="openCompleteDialog">
                        <DialogContent
                            class="max-w-lg rounded-xl border border-border bg-background shadow-lg"
                        >
                            <DialogHeader class="border-b pb-3">
                                <div class="flex items-center gap-2">
                                    <DialogTitle class="text-xl font-semibold"
                                        >Complete Production Order</DialogTitle
                                    >
                                    <Badge
                                        :class="`${getStatusColor(selectedOrder?.status)} px-2 py-0.5 text-xs capitalize`"
                                    >
                                        {{
                                            selectedOrder?.status?.replace(
                                                '_',
                                                ' ',
                                            ) || '-'
                                        }}
                                    </Badge>
                                </div>
                                <DialogDescription
                                    class="mt-1 text-sm text-muted-foreground"
                                >
                                    Fill in actual and rejected quantities to
                                    complete this order.
                                </DialogDescription>
                            </DialogHeader>

                            <div
                                v-if="selectedOrder"
                                class="mt-3 space-y-4 text-sm"
                            >
                                <div
                                    class="divide-y divide-border rounded-lg border p-3"
                                >
                                    <div class="flex justify-between py-2">
                                        <span class="text-muted-foreground"
                                            >Product</span
                                        >
                                        <div class="flex gap-2">
                                            <Badge variant="outline">{{
                                                selectedOrder.product?.code ||
                                                '-'
                                            }}</Badge>
                                            <span class="font-medium">{{
                                                selectedOrder.product?.name ||
                                                '-'
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="flex justify-between py-2">
                                        <span class="text-muted-foreground"
                                            >Planned Quantity</span
                                        >
                                        <span class="font-medium">{{
                                            selectedOrder.quantity
                                        }}</span>
                                    </div>
                                </div>

                                <div>
                                    <Label
                                        for="actual_quantity"
                                        class="mb-1 text-sm font-medium"
                                        >Actual Quantity</Label
                                    >
                                    <Input
                                        id="actual_quantity"
                                        type="number"
                                        v-model="form.actual_quantity"
                                        min="0"
                                        :max="selectedOrder.quantity"
                                    />
                                </div>

                                <div>
                                    <Label
                                        for="rejected_quantity"
                                        class="mb-1 text-sm font-medium"
                                        >Rejected Quantity</Label
                                    >
                                    <Input
                                        id="rejected_quantity"
                                        type="number"
                                        v-model="form.rejected_quantity"
                                        min="0"
                                        :max="selectedOrder.quantity"
                                    />
                                </div>

                                <div>
                                    <Label
                                        for="notes"
                                        class="mb-1 text-sm font-medium"
                                        >Notes</Label
                                    >
                                    <Input
                                        id="notes"
                                        type="text"
                                        v-model="form.notes"
                                        placeholder="Optional notes..."
                                    />
                                </div>
                            </div>

                            <DialogFooter
                                class="mt-6 flex justify-end gap-2 border-t pt-4"
                            >
                                <Button
                                    variant="outline"
                                    @click="openCompleteDialog = false"
                                    >Cancel</Button
                                >
                                <Button
                                    variant="default"
                                    @click="submitCompletion"
                                    >Submit Completion</Button
                                >
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
