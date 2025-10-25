<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const form = useForm({
    email: '',
    password: '',
});

const loading = ref(false);

const submit = async () => {
    loading.value = true;
    form.post('/login', {
        onFinish: () => (loading.value = false),
    });
};
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card class="w-full max-w-md overflow-hidden shadow-lg">
            <CardContent class="p-8">
                <form @submit.prevent="submit" class="flex flex-col gap-6">
                    <div class="flex flex-col items-center text-center">
                        <h1 class="text-2xl font-bold">MANUFACTURING SYSTEM</h1>
                        <p class="text-balance text-muted-foreground">
                            Login to your account
                        </p>
                    </div>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="johndoe@example.com"
                            required
                        />
                        <span
                            v-if="form.errors.email"
                            class="text-sm text-red-500"
                        >
                            {{ form.errors.email }}
                        </span>
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            v-model="form.password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                        <span
                            v-if="form.errors.password"
                            class="text-sm text-red-500"
                        >
                            {{ form.errors.password }}
                        </span>
                    </div>
                    <Button
                        type="submit"
                        class="w-full"
                        :disabled="form.processing || loading"
                    >
                        <span v-if="!form.processing">Login</span>
                        <span v-else>Processing...</span>
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
