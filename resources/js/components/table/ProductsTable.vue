<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Pencil, Trash } from 'lucide-vue-next';

const props = defineProps<{
    products: {
        data: Array<{
            id: number;
            name: string;
            code: string;
            description: string | null;
        }>;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
    };
    filteredProducts: Array<{
        id: number;
        name: string;
        code: string;
        description: string | null;
    }>;
}>();

const emit = defineEmits<{
    (e: 'edit', id: number): void;
    (e: 'delete', id: number): void;
    (e: 'paginate', url: string | null): void;
}>();

const goToPage = (url: string | null) => emit('paginate', url);
</script>

<template>
    <div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[50px] text-center">#</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead class="w-[150px] text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow
                    v-for="(product, index) in filteredProducts"
                    :key="product.id"
                    class="hover:bg-muted/40"
                >
                    <TableCell class="text-center">
                        {{ (props.products.current_page - 1) * 5 + index + 1 }}
                    </TableCell>
                    <TableCell class="font-medium">{{
                        product.code
                    }}</TableCell>
                    <TableCell>{{ product.name }}</TableCell>
                    <TableCell>{{ product.description || '-' }}</TableCell>
                    <TableCell class="space-x-2 text-center">
                        <Button
                            variant="outline"
                            size="sm"
                            @click="emit('edit', product.id)"
                        >
                            <Pencil class="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            @click="emit('delete', product.id)"
                        >
                            <Trash class="h-4 w-4" />
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow v-if="filteredProducts.length === 0">
                    <TableCell
                        colspan="5"
                        class="py-6 text-center text-muted-foreground"
                    >
                        No products found.
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <div class="mt-6 flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="icon"
                class="h-8 w-8"
                :disabled="!products.links?.[0]?.url"
                @click="goToPage(products.links?.[0]?.url)"
            >
                <ChevronLeft class="h-4 w-4" />
            </Button>

            <template
                v-for="(link, index) in products.links?.slice(
                    1,
                    products.links.length - 1,
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
                :disabled="!products.links?.[products.links.length - 1]?.url"
                @click="
                    goToPage(products.links?.[products.links.length - 1]?.url)
                "
            >
                <ChevronRight class="h-4 w-4" />
            </Button>
        </div>
    </div>
</template>
