<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-vue-next';

const props = defineProps<{
    plans: {
        data: Array<any>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
    };
    filteredPlans: Array<any>;
}>();

const emit = defineEmits<{
    (e: 'show-details', plan: any): void;
    (e: 'paginate', url: string | null): void;
}>();

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

const goToPage = (url: string | null) => {
    if (url) emit('paginate', url);
};
</script>

<template>
    <div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead class="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow
                    v-for="(plan, index) in filteredPlans"
                    :key="plan.id"
                    class="hover:bg-muted/40"
                >
                    <TableCell>
                        {{ (props.plans.current_page - 1) * 5 + index + 1 }}
                    </TableCell>

                    <TableCell>
                        <div class="flex flex-col">
                            <span class="font-medium">{{
                                plan.product?.name || '-'
                            }}</span>
                            <span class="text-xs text-muted-foreground">
                                {{ plan.product?.code }}
                            </span>
                        </div>
                    </TableCell>

                    <TableCell>{{ plan.quantity }}</TableCell>
                    <TableCell>{{ plan.due_date }}</TableCell>
                    <TableCell>{{ plan.creator || '-' }}</TableCell>

                    <TableCell>
                        <Badge
                            :class="`${getStatusColor(plan.status)} capitalize`"
                        >
                            {{ plan.status }}
                        </Badge>
                    </TableCell>

                    <TableCell class="text-center">
                        <Button
                            size="sm"
                            variant="outline"
                            @click="emit('show-details', plan)"
                        >
                            <Eye class="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>

                <TableRow v-if="filteredPlans.length === 0">
                    <TableCell
                        colspan="7"
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
                :disabled="!plans.links?.[0]?.url"
                @click="goToPage(plans.links?.[0]?.url)"
            >
                <ChevronLeft class="h-4 w-4" />
            </Button>

            <template
                v-for="(link, index) in plans.links?.slice(
                    1,
                    plans.links.length - 1,
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
                :disabled="!plans.links?.[plans.links.length - 1]?.url"
                @click="goToPage(plans.links?.[plans.links.length - 1]?.url)"
            >
                <ChevronRight class="h-4 w-4" />
            </Button>
        </div>
    </div>
</template>
