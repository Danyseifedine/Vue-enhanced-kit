<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { CheckCircle2, FileIcon, FileText, ImageIcon, Upload, X } from 'lucide-vue-next';
import FileUpload, { type FileUploadSelectEvent, type FileUploadUploaderEvent } from 'primevue/fileupload';
import { ref } from 'vue';

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
const isDeleting = ref(false);
const uploadProgress = ref(0);
const currentError = ref<string | null>(null);
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
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN') {
            return decodeURIComponent(value);
        }
    }

    return '';
};

// Format file size for display
const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Show error with auto-dismiss
const showError = (message: string, duration: number = 5000) => {
    currentError.value = message;
    setTimeout(() => {
        currentError.value = null;
    }, duration);
};

// Get user-friendly error message
const getErrorMessage = (error: any, file?: File): string => {
    if (typeof error === 'string') return error;

    if (error.message) {
        // Handle validation errors
        if (error.message.includes('413') || error.message.includes('file size') || error.message.includes('too large')) {
            const fileName = file?.name || 'File';
            const fileSize = file ? formatSize(file.size) : '';
            const maxSize = formatSize(props.maxFileSize);
            return `${fileName} is too large (${fileSize}). Maximum size allowed is ${maxSize}.`;
        }

        if (error.message.includes('type') || error.message.includes('format') || error.message.includes('mimes')) {
            const fileName = file?.name || 'File';
            return `${fileName} has an invalid format. Allowed formats: ${props.accept}`;
        }

        if (error.message.includes('network') || error.message.includes('fetch')) {
            return 'Network error. Please check your connection and try again.';
        }

        if (error.message.includes('422') || error.message.includes('Validation failed')) {
            return 'File validation failed. Please check file size and format.';
        }

        return error.message;
    }

    // Handle Laravel validation response format
    if (error.errors) {
        const firstError = Object.values(error.errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
            return firstError[0] as string;
        }
    }

    return 'An unexpected error occurred. Please try again.';
};

// Handle file selection - automatically upload to temp only if auto=true
const onSelect = async (event: FileUploadSelectEvent) => {
    selectedFiles.value = event.files;
    emit('select', event);

    // Only auto-upload if auto=true
    if (props.auto) {
        await uploadToTemp(event.files);
    }
};

// Upload files to temporary storage
const uploadToTemp = async (files: File[]) => {
    if (files.length === 0) return;

    // Clear any previous errors
    currentError.value = null;
    isUploading.value = true;
    uploadProgress.value = 0;

    try {
        // Validate files before upload
        for (const file of files) {
            if (file.size > props.maxFileSize) {
                throw new Error(`File size validation failed for ${file.name}`);
            }

            if (props.accept !== '*' && !file.type.match(new RegExp(props.accept.replace('*', '.*')))) {
                throw new Error(`File type validation failed for ${file.name}`);
            }
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files[]', file);
        });
        // Add context for organizing files
        formData.append('context', props.context || 'general');

        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
            if (uploadProgress.value < 90) {
                uploadProgress.value += Math.random() * 20;
            }
        }, 200);

        // Use fetch but with proper CSRF token handling
        const response = await fetch(route('api.upload-temp'), {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
                Accept: 'application/json',
            },
        });

        clearInterval(progressInterval);
        uploadProgress.value = 100;

        if (!response.ok) {
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

            try {
                const errorResult = await response.json();
                if (errorResult.errors) {
                    // Handle Laravel validation errors
                    const firstError = Object.values(errorResult.errors)[0];
                    if (Array.isArray(firstError) && firstError.length > 0) {
                        errorMessage = firstError[0] as string;
                    }
                } else if (errorResult.message) {
                    errorMessage = errorResult.message;
                }
            } catch {
                // If we can't parse JSON, use status-based messages
                if (response.status === 413) {
                    errorMessage = 'File size too large';
                } else if (response.status === 422) {
                    errorMessage = 'File validation failed';
                }
            }

            throw new Error(errorMessage);
        }

        const result = await response.json();

        if (result.success) {
            // If multiple=false, replace existing temp files with new one
            if (props.multiple === false) {
                // Clear existing temp files first
                const filesToDelete = [...tempFiles.value];
                for (const tempFile of filesToDelete) {
                    // Delete from server but don't wait for response
                    removeTempFile(tempFile);
                }
                tempFiles.value = result.files;
            } else {
                // If multiple=true, add to existing temp files
                const newTempFiles = [...tempFiles.value, ...result.files];
                tempFiles.value = newTempFiles;
            }

            emit('update:modelValue', tempFiles.value);
            emit('temp-uploaded', result.files);

            // Clear the file input
            clearFileInput();
        } else {
            throw new Error(result.message || 'Upload failed');
        }
    } catch (error) {
        const errorMessage = getErrorMessage(error, files[0]);
        showError(errorMessage);
        emit('error', { message: errorMessage });
    } finally {
        isUploading.value = false;
        uploadProgress.value = 0;
    }
};

// Handle file upload (custom uploader)
const customUploader = async (event: FileUploadUploaderEvent) => {
    const files = Array.isArray(event.files) ? event.files : [event.files];
    await uploadToTemp(files);
};

// Handle manual upload when auto=false
const handleManualUpload = async (files: File[]) => {
    await uploadToTemp(files);
};

// Handle file removal from temp storage
const removeTempFile = async (tempFile: TemporaryFile) => {
    isDeleting.value = true;

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

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.success) {
            const updatedFiles = tempFiles.value.filter((f) => f.temp_path !== tempFile.temp_path);
            tempFiles.value = updatedFiles;
            emit('update:modelValue', updatedFiles);
            emit('temp-deleted', tempFile.temp_path);
        } else {
            throw new Error(result.message || 'Delete failed');
        }
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        showError(errorMessage);
        emit('error', { message: errorMessage });
    } finally {
        isDeleting.value = false;
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
    isDeleting.value = true;

    try {
        // Clear selected files
        selectedFiles.value = [];

        // Delete all temp files
        const deletePromises = tempFiles.value.map((tempFile) => removeTempFile(tempFile));
        await Promise.all(deletePromises);

        emit('clear');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        showError(errorMessage);
    } finally {
        isDeleting.value = false;
    }
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
    clear: onClear,
    getTempFiles: () => tempFiles.value,
});
</script>

<template>
    <div :class="props.class">
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
            <template #header="{ chooseCallback, clearCallback, files }">
                <div class="flex items-center justify-between gap-4 border-b p-4">
                    <div class="flex items-center gap-2">
                        <Upload class="h-5 w-5 text-primary" />
                        <span class="text-sm font-semibold">Upload Files</span>
                        <span v-if="files.length > 0" class="text-xs text-muted-foreground">
                            ({{ files.length }} {{ files.length === 1 ? 'file' : 'files' }})
                        </span>

                        <!-- Upload Progress Indicator -->
                        <div v-if="isUploading" class="ml-2 flex items-center gap-2">
                            <div class="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                                <div
                                    class="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
                                    :style="{ width: uploadProgress + '%' }"
                                ></div>
                            </div>
                            <span class="text-xs font-medium text-blue-600">{{ Math.round(uploadProgress) }}%</span>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <!-- Choose button - hide if multiple=false and we already have temp files -->
                        <button
                            v-if="!(multiple === false && tempFiles.length > 0)"
                            type="button"
                            @click="chooseCallback()"
                            :disabled="disabled || isUploading || isDeleting"
                            class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {{ chooseLabel }}
                        </button>

                        <!-- Upload button - show when auto=false and files are selected, but hide if multiple=false and we have temp files -->
                        <button
                            v-if="showUploadButton && files.length > 0 && !auto && !(multiple === false && tempFiles.length > 0)"
                            type="button"
                            @click="handleManualUpload(files)"
                            :disabled="disabled || isUploading || isDeleting"
                            class="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            <span v-if="!isUploading" class="flex items-center gap-2">
                                <Upload class="h-4 w-4" />
                                {{ uploadLabel }}
                            </span>
                            <span v-else class="flex items-center gap-2">
                                <div class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Uploading...
                            </span>
                        </button>

                        <!-- Cancel button - show when we have files or temp files -->
                        <button
                            v-if="showCancelButton && (files.length > 0 || tempFiles.length > 0)"
                            type="button"
                            @click="clearCallback()"
                            :disabled="disabled || isUploading"
                            class="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            <span v-if="!isDeleting" class="flex items-center gap-2">
                                <X class="h-4 w-4" />
                                {{ cancelLabel }}
                            </span>
                            <span v-else class="flex items-center gap-2">
                                <div class="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent"></div>
                                Deleting...
                            </span>
                        </button>
                    </div>
                </div>

                <!-- Error Display -->
                <div v-if="currentError" class="border-b bg-red-50 p-4 duration-300 animate-in slide-in-from-top-2 dark:bg-red-950/20">
                    <div class="flex items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                                <X class="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-red-800 dark:text-red-200">Upload Error</p>
                            <p class="mt-1 text-sm text-red-700 dark:text-red-300">{{ currentError }}</p>
                        </div>
                        <button
                            @click="currentError = null"
                            class="flex-shrink-0 rounded-md p-1 transition-colors hover:bg-red-100 dark:hover:bg-red-900/50"
                        >
                            <X class="h-4 w-4 text-red-600 dark:text-red-400" />
                        </button>
                    </div>
                </div>
            </template>

            <!-- Custom content template for selected files -->
            <template #content="{ files, removeFileCallback }">
                <div v-if="files.length > 0 || tempFiles.length > 0" class="p-4">
                    <!-- Selected Files (being uploaded) -->
                    <div v-if="files.length > 0" class="mb-6">
                        <h4 class="mb-3 flex items-center gap-2 text-sm font-semibold">
                            <Upload class="h-4 w-4 text-blue-600" />
                            <span v-if="!isUploading">Selected Files</span>
                            <span v-else>Uploading Files</span>
                            <div v-if="isUploading" class="ml-2">
                                <div class="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                            </div>
                        </h4>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div
                                v-for="(file, index) in files"
                                :key="file.name + index"
                                class="group relative overflow-hidden rounded-lg border transition-all duration-200"
                                :class="{
                                    'opacity-75': isUploading,
                                    'hover:border-primary': !isUploading,
                                }"
                            >
                                <!-- Image Preview -->
                                <div v-if="isImage(file)" class="relative flex aspect-video items-center justify-center bg-muted">
                                    <img
                                        :src="getObjectURL(file)"
                                        :alt="file.name"
                                        class="h-full w-full object-cover transition-all duration-300"
                                        :class="{ 'opacity-90': isUploading }"
                                    />

                                    <!-- Upload Progress Overlay -->
                                    <div v-if="isUploading" class="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                                        <div class="border-3 mb-2 h-8 w-8 animate-spin rounded-full border-white border-t-transparent"></div>
                                        <div class="h-1.5 w-20 overflow-hidden rounded-full bg-white/40">
                                            <div
                                                class="h-full bg-white transition-all duration-300 ease-out"
                                                :style="{ width: uploadProgress + '%' }"
                                            ></div>
                                        </div>
                                        <span class="mt-1 text-xs font-medium text-white">{{ Math.round(uploadProgress) }}%</span>
                                    </div>

                                    <button
                                        v-if="!isUploading"
                                        type="button"
                                        @click="removeFileCallback(index)"
                                        class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                                    >
                                        <X class="h-4 w-4" />
                                    </button>
                                </div>

                                <!-- Non-Image Preview -->
                                <div v-else class="relative flex aspect-video items-center justify-center bg-muted">
                                    <component
                                        :is="getFileIcon(file)"
                                        class="h-16 w-16 text-muted-foreground transition-all duration-300"
                                        :class="{ 'opacity-90': isUploading }"
                                    />

                                    <!-- Upload Progress Overlay -->
                                    <div v-if="isUploading" class="absolute inset-0 flex flex-col items-center justify-center bg-black/15">
                                        <div class="border-3 mb-2 h-8 w-8 animate-spin rounded-full border-blue-600 border-t-transparent"></div>
                                        <div class="h-1.5 w-20 overflow-hidden rounded-full bg-blue-100">
                                            <div
                                                class="h-full bg-blue-600 transition-all duration-300 ease-out"
                                                :style="{ width: uploadProgress + '%' }"
                                            ></div>
                                        </div>
                                        <span class="mt-1 text-xs font-medium text-blue-600">{{ Math.round(uploadProgress) }}%</span>
                                    </div>

                                    <button
                                        v-if="!isUploading"
                                        type="button"
                                        @click="removeFileCallback(index)"
                                        class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 group-hover:opacity-100"
                                    >
                                        <X class="h-4 w-4" />
                                    </button>
                                </div>

                                <!-- File Info -->
                                <div class="border-t bg-background p-3">
                                    <p class="truncate text-sm font-medium" :title="file.name" :class="{ 'text-muted-foreground/70': isUploading }">
                                        {{ file.name }}
                                    </p>
                                    <p class="mt-1 text-xs text-muted-foreground">
                                        {{ formatSize(file.size) }}
                                    </p>
                                    <div v-if="isUploading" class="mt-2 flex items-center gap-2 text-xs text-blue-600">
                                        <div class="h-2 w-2 animate-pulse rounded-full bg-blue-600"></div>
                                        Uploading...
                                    </div>
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
                                v-for="tempFile in tempFiles"
                                :key="tempFile.temp_path"
                                class="group relative overflow-hidden rounded-lg border border-green-200 bg-green-50/50 transition-colors hover:border-green-300 dark:border-green-800 dark:bg-green-950/20"
                            >
                                <!-- Image Preview -->
                                <div v-if="isImage(tempFile)" class="relative flex aspect-video items-center justify-center bg-muted">
                                    <img :src="getPreviewURL(tempFile)" :alt="tempFile.original_name" class="h-full w-full object-cover" />
                                    <button
                                        type="button"
                                        @click="removeTempFile(tempFile)"
                                        :disabled="isDeleting"
                                        class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 disabled:opacity-50 group-hover:opacity-100"
                                    >
                                        <div
                                            v-if="isDeleting"
                                            class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                                        ></div>
                                        <X v-else class="h-4 w-4" />
                                    </button>
                                </div>

                                <!-- Non-Image Preview -->
                                <div v-else class="relative flex aspect-video items-center justify-center bg-muted">
                                    <component :is="getFileIcon(tempFile)" class="h-16 w-16 text-green-600" />
                                    <button
                                        type="button"
                                        @click="removeTempFile(tempFile)"
                                        :disabled="isDeleting"
                                        class="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive/90 disabled:opacity-50 group-hover:opacity-100"
                                    >
                                        <div
                                            v-if="isDeleting"
                                            class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                                        ></div>
                                        <X v-else class="h-4 w-4" />
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
