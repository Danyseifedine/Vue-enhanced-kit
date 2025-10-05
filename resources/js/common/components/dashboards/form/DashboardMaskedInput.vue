<script setup lang="ts">
import Password from 'primevue/password';
import { computed } from 'vue';

interface Props {
    /**
     * Input value (v-model)
     */
    modelValue?: string | null;

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
     * Required attribute
     */
    required?: boolean;

    /**
     * Autofocus
     */
    autofocus?: boolean;

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
     * Show/hide password toggle button
     * @default false
     */
    toggleMask?: boolean;

    /**
     * Show strength meter
     * @default false
     */
    showStrength?: boolean;

    /**
     * Additional class names
     */
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
    error: null,
    disabled: false,
    required: false,
    autofocus: false,
    id: undefined,
    size: 'small',
    fluid: true,
    toggleMask: false,
    showStrength: false,
    class: '',
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
}>();

// Computed class with error state - for input element
const inputClass = computed(() => {
    const classes: string[] = [];

    if (props.error) {
        classes.push('invalid-input-text');
    }

    return classes.join(' ');
});

// Computed pt (pass through) object for PrimeVue
const ptOptions = computed(() => ({
    pcInput: {
        class: inputClass.value,
        root: {
            class: props.class,
        },
    },
}));

// Handle input event
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
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
    <Password
        :id="id"
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autofocus="autofocus"
        :toggleMask="toggleMask"
        :feedback="showStrength"
        :fluid="fluid"
        :size="size"
        :inputClass="inputClass"
        :pt="ptOptions"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
    />
</template>
