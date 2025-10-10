<script setup lang="ts">
import { CheckCircle2, FileIcon, FileText, ImageIcon, Upload, X } from 'lucide-vue-next';
import FileUpload, { type FileUploadSelectEvent, type FileUploadUploaderEvent } from 'primevue/fileupload';
import { computed, ref } from 'vue';

export interface DashboardFileUploadProps {
    modelValue?: File[] | null;
    name?: string;
    url?: string;
    accept?: string;
    maxFileSize?: number; // in bytes
    maxFiles?: number;
    multiple?: boolean;
    auto?: boolean;
    disabled?: boolean;
    error?: string | null;
    showUploadButton?: boolean;
    showCancelButton?: boolean;
    customUpload?: boolean;
    fileLimit?: number;
    chooseLabel?: string;
    uploadLabel?: string;
    cancelLabel?: string;
    invalidFileSizeMessage?: string;
    invalidFileTypeMessage?: string;
    previewWidth?: number;
    id?: string;
    class?: string;
}

const props = withDefaults(defineProps<DashboardFileUploadProps>(), {
    name: 'files[]',
    accept: '*',
    maxFileSize: 5000000, // 5MB default
    maxFiles: 10,
    multiple: true,
    auto: false,
    disabled: false,
    error: null,
    showUploadButton: true,
    showCancelButton: true,
    customUpload: false,
    fileLimit: undefined,
    chooseLabel: 'Choose Files',
    uploadLabel: 'Upload',
    cancelLabel: 'Cancel',
    invalidFileSizeMessage: '{0}: Invalid file size, file size should be smaller than {1}.',
    invalidFileTypeMessage: '{0}: Invalid file type, allowed file types: {1}.',
    previewWidth: 100,
});

const emit = defineEmits<{
    'update:modelValue': [files: File[]];
    upload: [event: FileUploadUploaderEvent];
    select: [event: FileUploadSelectEvent];
    remove: [event: { file: File; files: File[] }];
    clear: [];
    error: [event: any];
    'before-upload': [event: any];
    progress: [event: any];
    'before-send': [event: any];
}>();

const fileUploadRef = ref<InstanceType<typeof FileUpload> | null>(null);
const selectedFiles = ref<File[]>([]);

// Computed class binding with error state
const inputClass = computed(() => {
    const baseClass = 'dashboard-file-upload';
    const errorClass = props.error ? 'dashboard-file-upload--error' : '';
    const disabledClass = props.disabled ? 'dashboard-file-upload--disabled' : '';
    return [baseClass, errorClass, disabledClass, props.class].filter(Boolean).join(' ');
});

// Handle file selection
const onSelect = (event: FileUploadSelectEvent) => {
    selectedFiles.value = event.files;
    emit('update:modelValue', event.files);
    emit('select', event);
};

// Handle file upload
const onUpload = (event: FileUploadUploaderEvent) => {
    emit('upload', event);
};

// Handle file removal
const onRemove = (event: any) => {
    const remainingFiles = selectedFiles.value.filter((f) => f !== event.file);
    selectedFiles.value = remainingFiles;
    emit('update:modelValue', remainingFiles);
    emit('remove', { file: event.file, files: remainingFiles });
};

// Handle clear all
const onClear = () => {
    selectedFiles.value = [];
    emit('update:modelValue', []);
    emit('clear');
};

// Handle errors
const onError = (event: any) => {
    emit('error', event);
};

// Custom uploader function
const customUploader = async (event: FileUploadUploaderEvent) => {
    emit('upload', event);
};

// Get file icon based on file type
const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return ImageIcon;
    if (type === 'application/pdf') return FileText;
    return FileIcon;
};

// Format file size
const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Check if file is image
const isImage = (file: File) => {
    return file.type.startsWith('image/');
};

// Get object URL for preview
const getObjectURL = (file: File) => {
    return URL.createObjectURL(file);
};

// Expose methods for parent component
defineExpose({
    upload: () => fileUploadRef.value?.upload(),
    clear: () => {
        fileUploadRef.value?.clear();
        onClear();
    },
    choose: () => fileUploadRef.value?.choose(),
});
</script>

<template>
    <div :class="inputClass">
        <FileUpload
            ref="fileUploadRef"
            :name="name"
            :url="url"
            :accept="accept"
            :maxFileSize="maxFileSize"
            :multiple="multiple"
            :auto="auto"
            :disabled="disabled"
            :customUpload="customUpload"
            :fileLimit="fileLimit"
            :chooseLabel="chooseLabel"
            :uploadLabel="uploadLabel"
            :cancelLabel="cancelLabel"
            :invalidFileSizeMessage="invalidFileSizeMessage"
            :invalidFileTypeMessage="invalidFileTypeMessage"
            :showUploadButton="showUploadButton"
            :showCancelButton="showCancelButton"
            @select="onSelect"
            @upload="customUpload ? customUploader : onUpload"
            @remove="onRemove"
            @clear="onClear"
            @error="onError"
            @before-upload="emit('before-upload', $event)"
            @progress="emit('progress', $event)"
            @before-send="emit('before-send', $event)"
        >
            <!-- Custom header template -->
            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div class="flex items-center justify-between gap-4 border-b p-4">
                    <div class="flex items-center gap-2">
                        <Upload class="h-5 w-5 text-primary" />
                        <span class="text-sm font-semibold">Upload Files</span>
                        <span v-if="files.length > 0" class="text-xs text-muted-foreground">
                            ({{ files.length }} {{ files.length === 1 ? 'file' : 'files' }})
                        </span>
                    </div>
                    <div class="flex gap-2">
                        <button
                            type="button"
                            @click="chooseCallback()"
                            :disabled="disabled"
                            class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {{ chooseLabel }}
                        </button>
                        <button
                            v-if="showUploadButton && files.length > 0 && !auto"
                            type="button"
                            @click="uploadCallback()"
                            :disabled="disabled"
                            class="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {{ uploadLabel }}
                        </button>
                        <button
                            v-if="showCancelButton && files.length > 0"
                            type="button"
                            @click="clearCallback()"
                            :disabled="disabled"
                            class="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {{ cancelLabel }}
                        </button>
                    </div>
                </div>
            </template>

            <!-- Custom content template for selected files -->
            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                <div v-if="files.length > 0" class="p-4">
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div
                            v-for="(file, index) in files"
                            :key="file.name + index"
                            class="group relative overflow-hidden rounded-lg border transition-colors hover:border-primary"
                        >
                            <!-- Image Preview -->
                            <div v-if="isImage(file)" class="relative flex aspect-video items-center justify-center bg-muted">
                                <img :src="getObjectURL(file)" :alt="file.name" class="h-full w-full object-cover" />
                                <button
                                    type="button"
                                    @click="removeFileCallback(index)"
                                    class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                                >
                                    <X class="h-4 w-4" />
                                </button>
                            </div>

                            <!-- Non-Image Preview -->
                            <div v-else class="relative flex aspect-video items-center justify-center bg-muted">
                                <component :is="getFileIcon(file)" class="h-16 w-16 text-muted-foreground" />
                                <button
                                    type="button"
                                    @click="removeFileCallback(index)"
                                    class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                                >
                                    <X class="h-4 w-4" />
                                </button>
                            </div>

                            <!-- File Info -->
                            <div class="border-t bg-background p-3">
                                <p class="truncate text-sm font-medium" :title="file.name">
                                    {{ file.name }}
                                </p>
                                <p class="mt-1 text-xs text-muted-foreground">
                                    {{ formatSize(file.size) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Uploaded Files -->
                    <div v-if="uploadedFiles && uploadedFiles.length > 0" class="mt-6">
                        <h4 class="mb-3 flex items-center gap-2 text-sm font-semibold">
                            <CheckCircle2 class="h-4 w-4 text-green-600" />
                            Uploaded Files
                        </h4>
                        <div class="space-y-2">
                            <div
                                v-for="(file, index) in uploadedFiles"
                                :key="file.name + index"
                                class="flex items-center justify-between rounded-lg border bg-green-50 p-3 dark:bg-green-950/20"
                            >
                                <div class="flex items-center gap-3">
                                    <CheckCircle2 class="h-5 w-5 text-green-600" />
                                    <div>
                                        <p class="text-sm font-medium">{{ file.name }}</p>
                                        <p class="text-xs text-muted-foreground">{{ formatSize(file.size) }}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    @click="removeUploadedFileCallback(index)"
                                    class="rounded p-1 text-destructive transition-colors hover:bg-destructive/10"
                                >
                                    <X class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Custom empty state -->
            <template #empty>
                <div class="flex flex-col items-center justify-center p-12 text-center">
                    <div class="mb-4 rounded-full bg-muted p-4">
                        <Upload class="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 class="mb-2 text-lg font-semibold">Drop files here</h3>
                    <p class="mb-4 text-sm text-muted-foreground">Drag and drop files here, or click "{{ chooseLabel }}" to select files</p>
                    <div class="flex flex-col gap-1 text-xs text-muted-foreground">
                        <p v-if="accept !== '*'">Accepted formats: {{ accept }}</p>
                        <p>Maximum file size: {{ formatSize(maxFileSize) }}</p>
                        <p v-if="fileLimit">Maximum {{ fileLimit }} {{ fileLimit === 1 ? 'file' : 'files' }}</p>
                    </div>
                </div>
            </template>
        </FileUpload>

        <!-- Error message -->
        <p v-if="error" class="mt-2 text-xs text-destructive">
            {{ error }}
        </p>
    </div>
</template>

<style scoped>
.dashboard-file-upload :deep(.p-fileupload) {
    @apply rounded-lg border-2 border-dashed transition-colors;
}

.dashboard-file-upload :deep(.p-fileupload:hover) {
    border-color: #e4e4e4 !important;
}

.dark .dashboard-file-upload :deep(.p-fileupload:hover) {
    border-color: #262626 !important;
}

.dashboard-file-upload--error :deep(.p-fileupload) {
    @apply border-destructive;
}

.dashboard-file-upload--disabled :deep(.p-fileupload) {
    @apply cursor-not-allowed opacity-50;
}

.dashboard-file-upload :deep(.p-fileupload-content) {
    @apply border-0 p-0;
}

.dashboard-file-upload :deep(.p-fileupload-buttonbar) {
    @apply hidden;
}
</style>
