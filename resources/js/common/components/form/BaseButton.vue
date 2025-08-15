<script setup lang="ts">
import { Button } from '@ui/button';
import { CircleDot, Cog, Disc3, Loader2, LoaderCircle, RefreshCw, RotateCw } from 'lucide-vue-next';
import { computed, useSlots, type HTMLAttributes } from 'vue';

const props = withDefaults(
    defineProps<{
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'warning' | 'gradient' | 'glass';
        size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl' | 'icon';
        loading?: boolean;
        loadingText?: string;
        loadingPosition?: 'before' | 'after';
        loadingIcon?: 'circle' | 'spinner' | 'rotate' | 'refresh' | 'gear' | 'dot' | 'disc' | 'none';
        class?: HTMLAttributes['class'];
        disabled?: boolean;
        type?: 'button' | 'submit' | 'reset';
    }>(),
    {
        variant: 'default',
        size: 'default',
        loading: false,
        loadingPosition: 'after',
        loadingIcon: 'circle',
        type: 'button',
    },
);

const slots = useSlots();
const isDisabled = computed(() => props.disabled || props.loading);

// Smart loading text - uses default slot content if no loadingText provided
const displayLoadingText = computed(() => {
    if (props.loadingText) return props.loadingText;

    // Extract text from default slot
    const defaultSlot = slots.default?.();
    if (defaultSlot?.[0]?.children) {
        return defaultSlot[0].children as string;
    }
    return 'Loading...';
});

// Get loading icon component
const getLoadingIcon = computed(() => {
    switch (props.loadingIcon) {
        case 'circle':
            return LoaderCircle;
        case 'spinner':
            return Loader2;
        case 'rotate':
            return RotateCw;
        case 'refresh':
            return RefreshCw;
        case 'gear':
            return Cog;
        case 'dot':
            return CircleDot;
        case 'disc':
            return Disc3;
        case 'none':
            return null;
        default:
            return LoaderCircle;
    }
});

// Custom variant styles
const customVariantClasses = computed(() => {
    switch (props.variant) {
        case 'success':
            return 'bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700';
        case 'warning':
            return 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500 hover:border-orange-600';
        case 'gradient':
            return 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0 shadow-lg hover:shadow-xl';
        case 'glass':
            return 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10 text-foreground shadow-lg hover:shadow-xl dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20';
        default:
            return '';
    }
});

// Custom size styles
const customSizeClasses = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'h-7 px-2 text-xs';
        case '2xl':
            return 'h-14 px-8 text-lg font-semibold';
        case 'xl':
            return 'h-12 px-6 text-base font-medium';
        default:
            return '';
    }
});

defineSlots<{
    default(): any;
    icon?(): any;
}>();
</script>

<template>
    <Button
        :variant="['success', 'warning', 'gradient', 'glass'].includes(variant) ? 'default' : variant"
        :size="['xs', 'xl', '2xl'].includes(size) ? 'default' : size"
        :type="type"
        :disabled="isDisabled"
        :class="['relative transition-all duration-200', 'disabled:cursor-not-allowed', customVariantClasses, customSizeClasses, props.class]"
    >
        <!-- Loading state -->
        <template v-if="loading">
            <template v-if="loadingPosition === 'before'">
                <component
                    v-if="getLoadingIcon"
                    :is="getLoadingIcon"
                    :class="['mr-2 animate-spin', size === 'xs' ? 'h-3 w-3' : size === 'xl' || size === '2xl' ? 'h-5 w-5' : 'h-4 w-4']"
                />
                <span>{{ displayLoadingText }}</span>
            </template>
            <template v-else>
                <span>{{ displayLoadingText }}</span>
                <component
                    v-if="getLoadingIcon"
                    :is="getLoadingIcon"
                    :class="['ml-2 animate-spin', size === 'xs' ? 'h-3 w-3' : size === 'xl' || size === '2xl' ? 'h-5 w-5' : 'h-4 w-4']"
                />
            </template>
        </template>

        <!-- Default state -->
        <template v-else>
            <!-- Optional icon slot -->
            <slot name="icon" />
            <slot />
        </template>
    </Button>
</template>
