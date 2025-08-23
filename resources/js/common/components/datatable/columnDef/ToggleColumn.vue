<script setup lang="ts">
import { Switch } from '@ui/switch';
import { computed, ref, watch } from 'vue';

interface Props {
    value: any;
    row: any;
    onToggle?: (value: boolean, row: any) => void;
    disabled?: (row: any) => boolean;
    toggledWhen?: (value: any, row: any) => boolean;
    size?: 'sm' | 'default' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
    size: 'default',
});

const isDisabled = computed(() => {
    return props.disabled ? props.disabled(props.row) : false;
});

const isToggled = computed({
    get: () => {
        return props.toggledWhen ? props.toggledWhen(props.value, props.row) : !!props.value;
    },
    set: (newValue: boolean) => {
        if (!isDisabled.value && props.onToggle) {
            props.onToggle(newValue, props.row);
        }
    }
});

const handleToggle = (newValue: boolean) => {
    if (!isDisabled.value && props.onToggle) {
        props.onToggle(newValue, props.row);
    }
};

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'scale-75';
        case 'lg':
            return 'scale-125';
        default:
            return '';
    }
});
</script>

<template>
    <div class="flex items-center justify-center">
        <Switch
            v-model="isToggled"
            :disabled="isDisabled"
            :class="[sizeClasses, isDisabled ? 'cursor-not-allowed opacity-50' : '']"
        />
    </div>
</template>
