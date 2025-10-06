<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';

interface Props {
    /**
     * Selected value (v-model)
     */
    modelValue?: string | number | null;

    /**
     * Array of options
     */
    options: any[];

    /**
     * Property name to use as the label
     * @default 'name'
     */
    optionLabel?: string;

    /**
     * Property name to use as the value
     * @default 'code'
     */
    optionValue?: string;

    /**
     * Placeholder text
     */
    placeholder?: string;

    /**
     * Error message (when provided, shows red border)
     */
    error?: string | null;

    /**
     * Disabled state
     */
    disabled?: boolean;

    /**
     * Show clear button
     * @default true
     */
    showClear?: boolean;

    /**
     * Enable filtering/search
     * @default false
     */
    filter?: boolean;

    /**
     * Filter placeholder text
     */
    filterPlaceholder?: string;

    /**
     * Scroll height for dropdown
     * @default '200px'
     */
    scrollHeight?: string;

    /**
     * Input id
     */
    id?: string;

    /**
     * Size variant
     * @default 'small'
     */
    size?: 'small' | 'large';

    /**
     * Fluid (full width)
     * @default true
     */
    fluid?: boolean;

    /**
     * Additional class names
     */
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    optionLabel: 'name',
    optionValue: 'code',
    placeholder: 'Select an option',
    error: null,
    disabled: false,
    showClear: true,
    filter: false,
    filterPlaceholder: 'Search...',
    scrollHeight: '200px',
    id: undefined,
    size: 'small',
    fluid: true,
    class: '',
});

const emit = defineEmits<{
    'update:modelValue': [value: string | number | null];
    change: [event: any];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
}>();

// Computed class with error state
const selectClasses = computed(() => {
    const classes = [props.class];

    if (props.error) {
        classes.push('invalid-select');
    }

    return classes.join(' ');
});

// Handle change event
const handleChange = (event: any) => {
    emit('update:modelValue', event.value);
    emit('change', event);
};

// Handle blur event
const handleBlur = (event: FocusEvent) => {
    emit('blur', event);
};

// Handle focus event
const handleFocus = (event: FocusEvent) => {
    emit('focus', event);
};
</script>

<template>
    <Select
        :id="id"
        :model-value="modelValue"
        :options="options"
        :option-label="optionLabel"
        :option-value="optionValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :show-clear="showClear"
        :filter="filter"
        :filter-placeholder="filterPlaceholder"
        :scroll-height="scrollHeight"
        :size="size"
        :fluid="fluid"
        :class="selectClasses"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
    />
</template>
