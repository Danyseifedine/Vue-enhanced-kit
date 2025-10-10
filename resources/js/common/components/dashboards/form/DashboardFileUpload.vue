<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { CheckCircle2, FileIcon, FileText, ImageIcon, Upload, X } from 'lucide-vue-next';
import FileUpload, { type FileUploadSelectEvent, type FileUploadUploaderEvent } from 'primevue/fileupload';
import { computed, ref } from 'vue';

export interface TemporaryFile {
    temp_path: string;
    original_name: string;
    size: number;
    mime_type: string;
    url: string;
}

export interface DashboardFileUploadProps {
    modelValue?: TemporaryFile[] | null;
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
    context?: string; // NEW: Context for organizing files (e.g., 'products', 'blogs', 'galleries')
}

const props = withDefaults(defineProps<DashboardFileUploadProps>(), {
    name: 'files[]',
    accept: '*',
    maxFileSize: 5000000, // 5MB default
    maxFiles: 10,
    multiple: true,
    auto: true, // Changed default to true for automatic upload
    disabled: false,
    error: null,
    showUploadButton: true,
    showCancelButton: true,
    customUpload: true, // Always use custom upload for temp files
    fileLimit: undefined,
    chooseLabel: 'Choose Files',
    uploadLabel: 'Upload',
    cancelLabel: 'Cancel',
    invalidFileSizeMessage: '{0}: Invalid file size, file size should be smaller than {1}.',
    invalidFileTypeMessage: '{0}: Invalid file type, allowed file types: {1}.',
    previewWidth: 100,
    context: 'general', // Default context
});

const emit = defineEmits<{
    'update:modelValue': [files: TemporaryFile[]];
    upload: [event: FileUploadUploaderEvent];
    select: [event: FileUploadSelectEvent];
    remove: [event: { file: File; files: File[] }];
    clear: [];
    error: [event: any];
    'before-upload': [event: any];
    progress: [event: any];
    'before-send': [event: any];
    'temp-uploaded': [files: TemporaryFile[]];
    'temp-deleted': [tempPath: string];
}>();

const fileUploadRef = ref<any>(null);
const selectedFiles = ref<File[]>([]);
const tempFiles = ref<TemporaryFile[]>(props.modelValue || []);
const isUploading = ref(false);
const page = usePage();

// Get CSRF token from multiple sources
const getCsrfToken = (): string => {
    // Try to get from Inertia page props first
    if (page.props._token) {
        return page.props._token as string;
    }

    // Fallback to meta tag
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (metaToken) {
        return metaToken;
    }

    // Last resort - try to get from cookie
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN') {
            return decodeURIComponent(value);
        }
    }

    return '';
};

// Computed class binding with error state
const inputClass = computed(() => {
    const baseClass = 'dashboard-file-upload';
    const errorClass = props.error ? 'dashboard-file-upload--error' : '';
    const disabledClass = props.disabled ? 'dashboard-file-upload--disabled' : '';
    return [baseClass, errorClass, disabledClass, props.class].filter(Boolean).join(' ');
});

// Handle file selection - automatically upload to temp
const onSelect = async (event: FileUploadSelectEvent) => {
    selectedFiles.value = event.files;
    emit('select', event);

    if (props.auto) {
        await uploadToTemp(event.files);
    }
};

// Upload files to temporary storage
const uploadToTemp = async (files: File[]) => {
    if (files.length === 0) return;

    isUploading.value = true;

    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files[]', file);
        });
        // Add context for organizing files
        formData.append('context', props.context || 'general');

        // Use fetch but with proper CSRF token handling
        const response = await fetch(route('api.upload-temp'), {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
                Accept: 'application/json',
            },
        });

        const result = await response.json();

        if (result.success) {
            const newTempFiles = [...tempFiles.value, ...result.files];
            tempFiles.value = newTempFiles;
            emit('update:modelValue', newTempFiles);
            emit('temp-uploaded', result.files);

            // Clear the file input
            clearFileInput();
        } else {
            emit('error', { message: result.message || 'Upload failed' });
        }
    } catch (error) {
        emit('error', { message: 'Upload failed: ' + (error as Error).message });
    } finally {
        isUploading.value = false;
    }
};

// Handle file upload (custom uploader)
const customUploader = async (event: FileUploadUploaderEvent) => {
    await uploadToTemp(event.files);
};

// Handle file removal from temp storage
const removeTempFile = async (tempFile: TemporaryFile) => {
    try {
        const response = await fetch(route('api.delete-temp'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
                Accept: 'application/json',
            },
            body: JSON.stringify({ temp_path: tempFile.temp_path }),
        });

        const result = await response.json();

        if (result.success) {
            const updatedFiles = tempFiles.value.filter((f) => f.temp_path !== tempFile.temp_path);
            tempFiles.value = updatedFiles;
            emit('update:modelValue', updatedFiles);
            emit('temp-deleted', tempFile.temp_path);
        } else {
            emit('error', { message: result.message || 'Delete failed' });
        }
    } catch (error) {
        emit('error', { message: 'Delete failed: ' + (error as Error).message });
    }
};

// Handle file removal (for selected files before upload)
const onRemove = (event: any) => {
    const remainingFiles = selectedFiles.value.filter((f) => f !== event.file);
    selectedFiles.value = remainingFiles;
    emit('remove', { file: event.file, files: remainingFiles });
};

// Handle clear all (only when user explicitly clears)
const onClear = async () => {
    // Clear selected files
    selectedFiles.value = [];

    // Delete all temp files
    for (const tempFile of tempFiles.value) {
        await removeTempFile(tempFile);
    }

    emit('clear');
};

// Clear just the file input without deleting temp files
const clearFileInput = () => {
    selectedFiles.value = [];
    if (fileUploadRef.value) {
        fileUploadRef.value.files = [];
    }
};

// Handle errors
const onError = (event: any) => {
    emit('error', event);
};

// Get file icon based on file type
const getFileIcon = (file: File | TemporaryFile) => {
    const type = 'type' in file ? file.type : file.mime_type;
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
const isImage = (file: File | TemporaryFile) => {
    const type = 'type' in file ? file.type : file.mime_type;
    return type.startsWith('image/');
};

// Get object URL for preview
const getObjectURL = (file: File) => {
    return URL.createObjectURL(file);
};

// Get preview URL for temp file
const getPreviewURL = (tempFile: TemporaryFile) => {
    return tempFile.url;
};

// Expose methods for parent component
defineExpose({
    upload: () => fileUploadRef.value?.upload(),
    clear: onClear,
    choose: () => fileUploadRef.value?.choose(),
    getTempFiles: () => tempFiles.value,
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
                <div v-if="files.length > 0 || tempFiles.length > 0" class="p-4">
                    <!-- Selected Files (being uploaded) -->
                    <div v-if="files.length > 0" class="mb-6">
                        <h4 class="mb-3 flex items-center gap-2 text-sm font-semibold">
                            <Upload class="h-4 w-4 text-blue-600" />
                            Uploading Files
                            <div v-if="isUploading" class="ml-2">
                                <div class="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                            </div>
                        </h4>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div
                                v-for="(file, index) in files"
                                :key="file.name + index"
                                class="group relative overflow-hidden rounded-lg border opacity-60 transition-colors hover:border-primary"
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
                    </div>

                    <!-- Temporary Files (uploaded successfully) -->
                    <div v-if="tempFiles.length > 0">
                        <h4 class="mb-3 flex items-center gap-2 text-sm font-semibold">
                            <CheckCircle2 class="h-4 w-4 text-green-600" />
                            Uploaded Files
                        </h4>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div
                                v-for="(tempFile, index) in tempFiles"
                                :key="tempFile.temp_path"
                                class="group relative overflow-hidden rounded-lg border border-green-200 bg-green-50/50 transition-colors hover:border-green-300 dark:border-green-800 dark:bg-green-950/20"
                            >
                                <!-- Image Preview -->
                                <div v-if="isImage(tempFile)" class="relative flex aspect-video items-center justify-center bg-muted">
                                    <img :src="getPreviewURL(tempFile)" :alt="tempFile.original_name" class="h-full w-full object-cover" />
                                    <button
                                        type="button"
                                        @click="removeTempFile(tempFile)"
                                        class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                                    >
                                        <X class="h-4 w-4" />
                                    </button>
                                </div>

                                <!-- Non-Image Preview -->
                                <div v-else class="relative flex aspect-video items-center justify-center bg-muted">
                                    <component :is="getFileIcon(tempFile)" class="h-16 w-16 text-green-600" />
                                    <button
                                        type="button"
                                        @click="removeTempFile(tempFile)"
                                        class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                                    >
                                        <X class="h-4 w-4" />
                                    </button>
                                </div>

                                <!-- File Info -->
                                <div class="border-t bg-background p-3">
                                    <div class="flex items-center gap-2">
                                        <CheckCircle2 class="h-4 w-4 flex-shrink-0 text-green-600" />
                                        <p class="truncate text-sm font-medium text-green-800 dark:text-green-200" :title="tempFile.original_name">
                                            {{ tempFile.original_name }}
                                        </p>
                                    </div>
                                    <p class="mt-1 text-xs text-green-600/80">
                                        {{ formatSize(tempFile.size) }}
                                    </p>
                                </div>
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
