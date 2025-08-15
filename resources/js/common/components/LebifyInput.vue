<script setup lang="ts">
import Label from '@/shared/ui/label/Label.vue';
import { cn } from '@core/utils/utils';
import { useVModel } from '@vueuse/core';
import type { HTMLAttributes } from 'vue';

const props = withDefaults(defineProps<{
    label?: string;
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes['class'];
    error?: string;
    disableError?: boolean;
    errorBorder?: boolean;
    required?: boolean;
}>(), {
    errorBorder: true,
});

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>

<template>
    <div class="relative">
        <Label v-if="label" class="text-sm font-medium">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </Label>
        <div :class="label ? 'mt-1' : ''">
            <input
                v-model="modelValue"
                v-bind="$attrs"
                :class="
                    cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        error && props.errorBorder ? 'border-red-500 focus-visible:ring-red-500' : '',
                        props.class,
                    )
                "
            />
        </div>
        <div v-if="error && !disableError" class="mt-1">
            <p class="text-sm text-red-600 dark:text-red-500">
                {{ error }}
            </p>
        </div>
    </div>
</template>
