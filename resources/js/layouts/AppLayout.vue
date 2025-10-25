<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import 'vue-sonner/style.css';

const page = usePage();
const user = page.props.auth.user;

const links = ref([
    { name: 'Dashboard', href: '/' },
    { name: 'Products', href: '/manager/products', role: 'manager' },
    {
        name: 'Production Plans',
        href: '/manager/production-plans',
        role: 'manager',
    },
    {
        name: 'Warehouse',
        href: '/manager/warehouse',
        role: 'manager',
    },
    {
        name: 'Production Plans',
        href: '/ppic/production-plans',
        role: 'staff_ppic',
    },
    {
        name: 'Reports',
        href: '/ppic/reports',
        role: 'staff_ppic',
    },
    {
        name: 'Production Orders',
        href: '/production/production-orders',
        role: 'staff_production',
    },
    {
        name: 'Reports',
        href: '/production/reports',
        role: 'staff_production',
    },
]);

const logout = () => router.post('/logout');
</script>
<template>
    <SidebarProvider>
        <div class="flex h-screen w-full overflow-hidden bg-muted/40">
            <Sidebar class="border-r bg-background">
                <SidebarHeader class="border-b p-4">
                    <h1 class="text-lg font-bold text-primary">
                        Manufacturing System
                    </h1>
                </SidebarHeader>
                <SidebarContent class="flex-1 overflow-y-auto">
                    <SidebarGroup>
                        <SidebarMenu>
                            <template v-for="link in links" :key="link.name">
                                <SidebarMenuItem
                                    v-if="!link.role || link.role === user.role"
                                >
                                    <SidebarMenuButton
                                        :as="'a'"
                                        :href="link.href"
                                        :class="
                                            cn(
                                                'block w-full rounded-md px-4 py-2 text-left transition',
                                                link.href === '/'
                                                    ? $page.url === '/'
                                                        ? 'bg-muted font-semibold text-primary'
                                                        : 'text-muted-foreground hover:bg-muted/60'
                                                    : $page.url.startsWith(
                                                            link.href,
                                                        )
                                                      ? 'bg-muted font-semibold text-primary'
                                                      : 'text-muted-foreground hover:bg-muted/60',
                                            )
                                        "
                                    >
                                        {{ link.name }}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </template>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter class="border-t p-4">
                    <div class="mb-3 text-center text-sm text-white">
                        <p class="font-medium">{{ user.email }}</p>
                        <p class="text-xs capitalize">
                            {{ user.role.replace('_', ' ') }}
                        </p>
                    </div>
                    <Button
                        @click="logout"
                        variant="outline"
                        size="sm"
                        class="w-full text-destructive"
                    >
                        Logout
                    </Button>
                </SidebarFooter>
            </Sidebar>
            <main class="flex-1 overflow-y-auto bg-black">
                <header
                    class="bg-neutral flex items-center justify-between border-b p-4"
                >
                    <div class="flex items-center gap-2">
                        <SidebarTrigger />
                    </div>
                </header>
                <div class="p-6">
                    <slot />
                    <Toaster position="top-right" richColors />
                </div>
            </main>
        </div>
    </SidebarProvider>
</template>
