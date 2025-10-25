<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList,
    ComboboxTrigger,
} from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from '@/components/ui/number-field';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { cn } from '@/utils';
import { router, useForm, usePage } from '@inertiajs/vue3';
import {
    DateFormatter,
    getLocalTimeZone,
    parseDate,
    today,
} from '@internationalized/date';
import {
    Calendar as CalendarIcon,
    Check,
    ChevronsUpDown,
    Search,
} from 'lucide-vue-next';
import { toDate } from 'reka-ui/date';
import { computed, ref, watch } from 'vue';
import { route } from 'ziggy-js';

const page = usePage();
const products = ref(page.props.products || []);

const form = useForm({
    product_id: '',
    quantity: 1,
    due_date: '',
    status: 'draft',
    notes: '',
});

const productItems = computed(() =>
    products.value.map((p: any) => ({
        value: p.id,
        label: `${p.code} - ${p.name}`,
    })),
);
const selectedProduct = ref<(typeof productItems.value)[0]>();
watch(selectedProduct, (val) => {
    form.product_id = val?.value ?? '';
});

const df = new DateFormatter('en-US', { dateStyle: 'long' });
const placeholder = ref();
const calendarValue = computed({
    get: () => (form.due_date ? parseDate(form.due_date) : undefined),
    set: (val) => val,
});
const minDate = today(getLocalTimeZone());

const submit = () => {
    form.post(route('ppic.production-plans.store'), {
        onSuccess: () => router.visit(route('ppic.production-plans.index')),
    });
};
</script>

<template>
    <AppLayout>
        <div class="w-full md:w-3/4 lg:w-1/2">
            <form @submit.prevent="submit" class="space-y-6">
                <div>
                    <h1 class="text-2xl font-bold">Add Production Plan</h1>
                    <p class="text-sm text-muted-foreground">
                        Create a new production plan for your products
                    </p>
                </div>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label for="product_id" class="mb-2">Product</Label>
                        <Combobox v-model="selectedProduct" by="label">
                            <ComboboxAnchor as-child>
                                <ComboboxTrigger as-child>
                                    <Button
                                        variant="outline"
                                        class="w-full justify-between"
                                    >
                                        {{
                                            selectedProduct?.label ??
                                            'Select or search product'
                                        }}
                                        <ChevronsUpDown
                                            class="ml-2 h-4 w-4 shrink-0 opacity-50"
                                        />
                                    </Button>
                                </ComboboxTrigger>
                            </ComboboxAnchor>
                            <ComboboxList
                                class="w-auto max-w-3xl min-w-[var(--radix-popover-trigger-width)] overflow-y-auto"
                            >
                                <div
                                    class="relative w-full max-w-sm items-center"
                                >
                                    <ComboboxInput
                                        class="h-10 w-full rounded-none border-0 border-b pl-9 focus-visible:ring-0"
                                        placeholder="Search products..."
                                    />
                                    <span
                                        class="absolute inset-y-0 start-0 flex items-center justify-center px-3"
                                    >
                                        <Search
                                            class="size-4 text-muted-foreground"
                                        />
                                    </span>
                                </div>
                                <ComboboxEmpty
                                    >No products found.</ComboboxEmpty
                                >
                                <ComboboxGroup>
                                    <ComboboxItem
                                        v-for="item in productItems"
                                        :key="item.value"
                                        :value="item"
                                    >
                                        {{ item.label }}
                                        <ComboboxItemIndicator>
                                            <Check
                                                :class="cn('ml-auto h-4 w-4')"
                                            />
                                        </ComboboxItemIndicator>
                                    </ComboboxItem>
                                </ComboboxGroup>
                            </ComboboxList>
                        </Combobox>
                        <p
                            v-if="form.errors.product_id"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ form.errors.product_id }}
                        </p>
                    </div>
                    <div>
                        <Label for="due_date" class="mb-2">Due Date</Label>
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button
                                    variant="outline"
                                    class="w-full justify-start text-left font-normal"
                                    :class="
                                        cn(
                                            !form.due_date &&
                                                'text-muted-foreground',
                                        )
                                    "
                                >
                                    <span>
                                        {{
                                            calendarValue
                                                ? df.format(
                                                      toDate(calendarValue),
                                                  )
                                                : 'Pick a due date'
                                        }}
                                    </span>
                                    <CalendarIcon
                                        class="ml-auto h-4 w-4 opacity-50"
                                    />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0" align="start">
                                <Calendar
                                    v-model:placeholder="placeholder"
                                    :model-value="calendarValue"
                                    calendar-label="Due Date"
                                    initial-focus
                                    :min-value="minDate"
                                    :max-value="minDate.add({ years: 2 })"
                                    @update:model-value="
                                        (v) => {
                                            if (v) form.due_date = v.toString();
                                            else form.due_date = '';
                                        }
                                    "
                                />
                            </PopoverContent>
                        </Popover>
                        <p
                            v-if="form.errors.due_date"
                            class="mt-1 text-sm text-red-500"
                        >
                            {{ form.errors.due_date }}
                        </p>
                    </div>
                </div>
                <div>
                    <Label for="quantity" class="mb-2">Quantity</Label>
                    <NumberField v-model="form.quantity" min="1">
                        <NumberFieldContent>
                            <NumberFieldDecrement />
                            <NumberFieldInput class="flex-1 text-center" />
                            <NumberFieldIncrement />
                        </NumberFieldContent>
                    </NumberField>
                    <p
                        v-if="form.errors.quantity"
                        class="mt-1 text-sm text-red-500"
                    >
                        {{ form.errors.quantity }}
                    </p>
                </div>
                <div>
                    <Label for="notes" class="mb-2">Notes</Label>
                    <Textarea
                        id="notes"
                        v-model="form.notes"
                        placeholder="Write additional information or special instructions..."
                    />
                </div>
                <div class="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        type="button"
                        @click="
                            router.visit(route('ppic.production-plans.index'))
                        "
                    >
                        Cancel
                    </Button>
                    <Button type="submit" :disabled="form.processing">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
