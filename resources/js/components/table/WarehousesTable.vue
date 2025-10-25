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
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
    warehouses: {
        data: Array<{
            id: number;
            product?: { name?: string; code?: string };
            stock: number;
            received_at?: string | null;
            notes?: string | null;
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
    };
    filteredWarehouses: Array<any>;
}>();

const emit = defineEmits<{
    (e: 'paginate', url: string | null): void;
}>();

const goToPage = (url: string | null) => {
    if (url) emit('paginate', url);
};
</script>

<template>
    <div>
        <!-- Table -->
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[50px] text-center">#</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Received At</TableHead>
                    <TableHead>Notes</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow
                    v-for="(item, index) in filteredWarehouses"
                    :key="item.id"
                    class="hover:bg-muted/40"
                >
                    <TableCell class="text-center">
                        {{
                            (props.warehouses.current_page - 1) * 10 + index + 1
                        }}
                    </TableCell>

                    <TableCell>
                        <div class="flex flex-col">
                            <span class="font-medium">
                                {{ item.product?.name || '-' }}
                            </span>
                            <span class="text-xs text-muted-foreground">
                                {{ item.product?.code || '-' }}
                            </span>
                        </div>
                    </TableCell>

                    <TableCell>
                        <Badge
                            variant="outline"
                            class="bg-primary/10 font-semibold text-primary"
                        >
                            {{ item.stock }}
                        </Badge>
                    </TableCell>

                    <TableCell>{{ item.received_at || '-' }}</TableCell>
                    <TableCell>{{ item.notes || '-' }}</TableCell>
                </TableRow>

                <TableRow v-if="filteredWarehouses.length === 0">
                    <TableCell
                        colspan="5"
                        class="py-6 text-center text-muted-foreground"
                    >
                        No warehouse items found.
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <!-- Pagination -->
        <div class="mt-6 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="icon"
                class="h-8 w-8"
                :disabled="!warehouses.links?.[0]?.url"
                @click="goToPage(warehouses.links?.[0]?.url)"
            >
                <ChevronLeft class="h-4 w-4" />
            </Button>

            <template
                v-for="(link, index) in warehouses.links?.slice(
                    1,
                    warehouses.links.length - 1,
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
                    !warehouses.links?.[warehouses.links.length - 1]?.url
                "
                @click="
                    goToPage(
                        warehouses.links?.[warehouses.links.length - 1]?.url,
                    )
                "
            >
                <ChevronRight class="h-4 w-4" />
            </Button>
        </div>
    </div>
</template>
