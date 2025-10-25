<script setup lang="ts">
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/AppLayout.vue';
import { router, usePage } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';
import { route } from 'ziggy-js';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { Input } from '@/components/ui/input';

const page = usePage();
const summary = computed(() => page.props.summary);
const byProduct = computed(() => page.props.byProduct);

const filters = ref({
    period: 'monthly',
    date: today(getLocalTimeZone()).toString(),
    search: '',
});

const selectedDate = ref<CalendarDate | undefined>(today(getLocalTimeZone()));

watch(
    () => filters.value.period,
    (newPeriod) => {
        if (newPeriod === 'weekly') {
            selectedDate.value = today(getLocalTimeZone());
        } else {
            selectedDate.value = today(getLocalTimeZone());
        }
    },
);

const applyFilter = () => {
    filters.value.date = selectedDate.value?.toString() ?? '';
    router.visit(route('production.reports.index'), {
        data: filters.value,
        preserveScroll: true,
        preserveState: true,
    });
};

const searchQuery = ref('');
const filteredProducts = computed(() => {
    if (!byProduct.value) return [];
    return byProduct.value.filter((item: any) =>
        item.product_name
            ?.toLowerCase()
            .includes(searchQuery.value.toLowerCase()),
    );
});

const exportReport = () => {
    filters.value.date = selectedDate.value?.toString() ?? '';
    const params = new URLSearchParams(filters.value as any).toString();
    window.open(route('production.reports.export') + '?' + params, '_blank');
};

const viewReport = (id: number) => {
    router.visit(route('production.reports.show', { order: id }));
};
</script>

<template>
    <AppLayout>
        <div class="space-y-6">
            <div>
                <h1 class="text-2xl font-bold">Production Reports</h1>
                <p class="text-sm text-muted-foreground">
                    Monitor production performance
                </p>
            </div>

            <div class="flex flex-wrap items-end gap-4">
                <div>
                    <label class="text-sm font-medium">Period</label>
                    <Select v-model="filters.period">
                        <SelectTrigger class="w-[150px]">
                            <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="flex flex-col">
                    <label class="mb-1 text-sm font-medium">Date</label>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button
                                variant="outline"
                                class="w-[200px] justify-start text-left font-normal"
                            >
                                <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
                                <span>
                                    {{
                                        filters.period === 'monthly'
                                            ? new Date(
                                                  selectedDate?.toString() ??
                                                      '',
                                              ).toLocaleDateString('en-US', {
                                                  month: 'long',
                                                  year: 'numeric',
                                              })
                                            : new Date(
                                                  selectedDate?.toString() ??
                                                      '',
                                              ).toLocaleDateString('en-US', {
                                                  day: '2-digit',
                                                  month: 'long',
                                                  year: 'numeric',
                                              })
                                    }}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0" align="start">
                            <Calendar
                                v-model="selectedDate"
                                :calendar-label="'Select date'"
                                :initial-focus="true"
                                :max-value="today(getLocalTimeZone())"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <Button variant="outline" @click="applyFilter">Apply</Button>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card v-for="(value, key) in summary" :key="key">
                    <CardHeader>
                        <CardTitle class="capitalize">
                            {{ key.replace('_', ' ') }}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-3xl font-bold">{{ value }}</p>
                    </CardContent>
                </Card>
            </div>

            <Card class="mt-6">
                <CardHeader
                    class="flex flex-wrap items-center justify-between gap-4"
                >
                    <CardTitle>Production by Product</CardTitle>
                    <div class="flex items-center gap-3">
                        <Input
                            type="text"
                            placeholder="Search product..."
                            v-model="searchQuery"
                            class="w-64"
                        />
                        <Button variant="outline" @click="exportReport">
                            Print / Export
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="border-b text-left">
                                <th class="p-2">Product</th>
                                <th class="p-2">Planned</th>
                                <th class="p-2">Actual</th>
                                <th class="p-2">Rejected</th>
                                <th class="p-2">Completed / Shipped</th>
                                <th class="p-2">Progress</th>
                                <th class="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in filteredProducts"
                                :key="index"
                                class="border-b hover:bg-muted/40"
                            >
                                <td class="p-2 font-medium">
                                    {{ item.product_name }}
                                    <span class="text-xs text-muted-foreground">
                                        ({{ item.product_code }})
                                    </span>
                                </td>
                                <td class="p-2">{{ item.total_planned }}</td>
                                <td class="p-2">{{ item.total_actual }}</td>
                                <td class="p-2">{{ item.total_rejected }}</td>
                                <td class="p-2">{{ item.completed }}</td>
                                <td class="p-2">
                                    <div class="flex items-center gap-2">
                                        <div
                                            class="relative h-2 w-24 overflow-hidden rounded bg-muted"
                                        >
                                            <div
                                                class="absolute top-0 left-0 h-full bg-primary"
                                                :style="{
                                                    width: `${item.progress}%`,
                                                }"
                                            ></div>
                                        </div>
                                        <span>{{ item.progress }}%</span>
                                    </div>
                                </td>
                                <td class="p-2 text-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        @click="viewReport(item.order_id)"
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                            <tr
                                v-if="
                                    !filteredProducts ||
                                    filteredProducts.length === 0
                                "
                            >
                                <td
                                    colspan="7"
                                    class="py-4 text-center text-muted-foreground"
                                >
                                    No production data found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
