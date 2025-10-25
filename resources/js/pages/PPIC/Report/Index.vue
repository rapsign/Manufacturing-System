<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button/Button.vue';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/AppLayout.vue';
import { router, usePage } from '@inertiajs/vue3';
import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
    parseDate,
    today,
} from '@internationalized/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { toDate } from 'reka-ui/date';
import { computed, ref, watch } from 'vue';
import { route } from 'ziggy-js';

const page = usePage();
const summary = computed(() => page.props.summary);
const byProduct = computed(() => page.props.byProduct);

const filters = ref(
    page.props.filters || {
        period: 'monthly',
        date: new Date().toISOString().slice(0, 10),
    },
);

const search = ref('');

const dfFull = new DateFormatter('en-US', { dateStyle: 'long' });
const dfMonth = new DateFormatter('en-US', { month: 'long', year: 'numeric' });
const minDate = today(getLocalTimeZone());

const toCalendarDate = (val?: string) => {
    try {
        if (!val) return today(getLocalTimeZone());
        if (typeof val === 'string') return parseDate(val);
        if (val && typeof val === 'object' && 'calendar' in val) return val;
    } catch {
        return today(getLocalTimeZone());
    }
    return today(getLocalTimeZone());
};

const selectedDate = ref<CalendarDate>(toCalendarDate(filters.value.date));

watch(selectedDate, (v) => {
    if (v) filters.value.date = v.toString();
});

watch(
    () => filters.value.period,
    (newPeriod) => {
        const now = today(getLocalTimeZone());
        filters.value.date = now.toString();
        selectedDate.value = now;
    },
);

const applyFilter = () => {
    router.visit(route('ppic.reports.index'), {
        data: filters.value,
        preserveScroll: true,
        preserveState: true,
    });
};

const filteredProducts = computed(() => {
    if (!search.value) return byProduct.value;
    return byProduct.value.filter((item: any) =>
        `${item.product_name} ${item.product_code}`
            .toLowerCase()
            .includes(search.value.toLowerCase()),
    );
});

const displayDate = computed(() => {
    if (!selectedDate.value) return 'Select date';
    const safeDate = toDate(selectedDate.value);
    if (filters.value.period === 'monthly') {
        return dfMonth.format(safeDate);
    }
    return dfFull.format(safeDate);
});
</script>

<template>
    <AppLayout>
        <div class="space-y-4">
            <h1 class="mb-1 text-2xl font-bold">Production Report</h1>
            <p class="text-sm text-muted-foreground">
                Summary and performance of production activities
            </p>

            <div class="flex flex-wrap items-end gap-4">
                <div>
                    <label class="text-sm font-medium">Period</label>
                    <Select v-model="filters.period">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label class="mb-1 block text-sm font-medium">Date</label>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button
                                variant="outline"
                                class="w-[240px] justify-start text-left font-normal"
                            >
                                <CalendarIcon class="mr-2 h-4 w-4 opacity-50" />
                                <span>{{ displayDate }}</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0" align="start">
                            <Calendar
                                :model-value="selectedDate"
                                @update:model-value="
                                    (v) => v && (selectedDate = v)
                                "
                                :min-value="minDate.subtract({ years: 1 })"
                                :max-value="minDate.add({ years: 1 })"
                                initial-focus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <Button variant="outline" @click="applyFilter">Apply</Button>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card v-for="(value, key) in summary" :key="key">
                    <CardHeader>
                        <CardTitle class="capitalize">{{
                            key.replace('_', ' ')
                        }}</CardTitle>
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
                    <div class="w-full sm:w-64">
                        <Input
                            type="text"
                            v-model="search"
                            placeholder="Search product..."
                        />
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
                                <th class="p-2">Completed</th>
                                <th class="p-2">Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in filteredProducts"
                                :key="index"
                                class="border-b hover:bg-muted/40"
                            >
                                <td class="p-2 font-medium">
                                    {{ item.product_name }} ({{
                                        item.product_code
                                    }})
                                </td>
                                <td class="p-2">{{ item.total_planned }}</td>
                                <td class="p-2">{{ item.total_actual }}</td>
                                <td class="p-2">{{ item.total_rejected }}</td>
                                <td class="p-2">{{ item.completed }}</td>
                                <td class="p-2">
                                    <Badge variant="outline"
                                        >{{ item.progress }}%</Badge
                                    >
                                </td>
                            </tr>
                            <tr v-if="filteredProducts.length === 0">
                                <td
                                    colspan="6"
                                    class="py-6 text-center text-muted-foreground"
                                >
                                    No data found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>
