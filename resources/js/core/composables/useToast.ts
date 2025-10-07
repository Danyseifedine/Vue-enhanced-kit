import { toast } from 'vue-sonner';
import { watch } from 'vue';
import type { SharedData } from '@/core/types';
import { usePage } from '@inertiajs/vue3';

export const useToast = () => {
    const page = usePage<SharedData>();

    const showSuccess = (message: string, description?: string) => {
        toast.success(message, {
            description,
        });
    };

    const showError = (message: string, description?: string) => {
        toast.error(message, {
            description,
        });
    };

    const showInfo = (message: string, description?: string) => {
        toast.info(message, {
            description,
        });
    };

    const showWarning = (message: string, description?: string) => {
        toast.warning(message, {
            description,
        });
    };

    const showPromise = <T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: any) => string);
        }
    ) => {
        return toast.promise(promise, messages);
    };

    const showToast = (type: 'success' | 'error' | 'info' | 'warning', message: string, description?: string) => {
        toast[type](message, {
            description,
        });
    };

    // Auto-watch for Laravel flash messages
    const initFlashToasts = () => {
        watch(
            () => page.props.flash?.toast,
            (toastData: any) => {
                if (!toastData) return;

                const { type, title, message } = toastData;

                switch (type) {
                    case 'success':
                        showSuccess(title, message);
                        break;
                    case 'error':
                        showError(title, message);
                        break;
                    case 'info':
                        showInfo(title, message);
                        break;
                    case 'warning':
                        showWarning(title, message);
                        break;
                    default:
                        showInfo(title, message);
                }
            },
            { immediate: true, deep: true }
        );
    };

    return {
        showSuccess,
        showError,
        showInfo,
        showWarning,
        showPromise,
        showToast,
        initFlashToasts, // Call this to enable Laravel flash message watching
        toast, // Export the raw toast for advanced usage
    };
};
