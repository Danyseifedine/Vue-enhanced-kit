<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Badge } from '@ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@ui/table';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@ui/collapsible';
import { Label } from '@ui/label';
import Hint from '@common/components/dashboards/typography/Hint.vue';
import DashboardTextInput from '@common/components/dashboards/form/DashboardTextInput.vue';
import DashboardMaskedInput from '@common/components/dashboards/form/DashboardMaskedInput.vue';
import DashboardSelect from '@common/components/dashboards/form/DashboardSelect.vue';
import DashboardButton from '@common/components/dashboards/form/DashboardButton.vue';
import DashboardMultiSelect from '@common/components/dashboards/form/DashboardMultiSelect.vue';
import DashboardDatePicker from '@common/components/dashboards/form/DashboardDatePicker.vue';
import DashboardFileUpload from '@common/components/dashboards/form/DashboardFileUpload.vue';
import { ChevronDown, Eye } from 'lucide-vue-next';

const activeComponent = ref<string | null>('DashboardTextInput');

// Demo form state
const demoForm = ref({
    text: '',
    email: '',
    password: '',
    role: null,
    roles: [] as number[],
    date: null as Date | null,
    dateRange: null as Date[] | null,
    dateTime: null as Date | null,
    files: [] as File[],
    errors: {} as Record<string, string>,
});

const demoRoles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Editor' },
    { id: 3, name: 'Viewer' },
];

const components = [
    { id: 'DashboardTextInput', name: 'Text Input', color: 'default' },
    { id: 'DashboardMaskedInput', name: 'Password Input', color: 'secondary' },
    { id: 'DashboardSelect', name: 'Select', color: 'outline' },
    { id: 'DashboardMultiSelect', name: 'Multi Select', color: 'outline' },
    { id: 'DashboardDatePicker', name: 'Date Picker', color: 'outline' },
    { id: 'DashboardFileUpload', name: 'File Upload', color: 'outline' },
    { id: 'DashboardButton', name: 'Button', color: 'default' },
];

const selectComponent = (id: string) => {
    activeComponent.value = activeComponent.value === id ? null : id;
};
</script>

<template>
    <div class="space-y-6">
        <!-- Component Navigation -->
        <Card>
            <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>Click a component below to view its documentation and live preview</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-wrap gap-3">
                    <Badge
                        v-for="component in components"
                        :key="component.id"
                        :variant="activeComponent === component.id ? 'default' : 'outline'"
                        class="cursor-pointer px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                        @click="selectComponent(component.id)"
                    >
                        {{ component.name }}
                    </Badge>
                </div>
            </CardContent>
        </Card>

        <!-- ==================== DashboardTextInput ==================== -->
        <Card v-if="activeComponent === 'DashboardTextInput'" class="border-2">
            <CardHeader class="bg-primary/5">
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="text-2xl">DashboardTextInput</CardTitle>
                        <CardDescription class="text-base mt-2">
                            Text input with automatic error handling and consistent defaults
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">Form Input</Badge>
                </div>
            </CardHeader>
            <CardContent class="space-y-8 pt-6">
                <!-- Live Preview -->
                <div class="bg-muted/30 border-2 border-dashed rounded-lg p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <Eye class="h-5 w-5 text-primary" />
                        <h3 class="font-bold text-lg">Live Preview</h3>
                    </div>
                    <div class="bg-background rounded-lg p-6 space-y-6">
                        <div>
                            <Label for="demo-text">Text Input</Label>
                            <DashboardTextInput
                                id="demo-text"
                                v-model="demoForm.text"
                                placeholder="Type something..."
                                class="mt-2"
                            />
                            <Hint text="This is a standard text input" class="mt-1" />
                        </div>
                        <div>
                            <Label for="demo-email" required>Email with Error</Label>
                            <DashboardTextInput
                                id="demo-email"
                                v-model="demoForm.email"
                                type="email"
                                placeholder="your@email.com"
                                error="This email is already taken"
                                class="mt-2"
                            />
                            <Hint text="This email is already taken" class="mt-1" />
                        </div>
                    </div>
                </div>

                <!-- Import -->
                <div>
                    <h3 class="font-bold text-lg mb-3">📦 Import</h3>
                    <pre class="bg-muted p-4 rounded-lg text-sm"><code>import DashboardTextInput from '@common/components/dashboards/form/DashboardTextInput.vue';</code></pre>
                </div>

                <!-- Props Table -->
                <div>
                    <h3 class="font-bold text-lg mb-3">⚙️ Props</h3>
                    <div class="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow class="bg-muted/50">
                                    <TableHead class="font-bold">Prop</TableHead>
                                    <TableHead class="font-bold">Type</TableHead>
                                    <TableHead class="font-bold">Default</TableHead>
                                    <TableHead class="font-bold">Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">modelValue</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string | number | null</Badge>
                                    </TableCell>
                                    <TableCell><code>''</code></TableCell>
                                    <TableCell>The v-model binding value</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">type</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'text'</code></TableCell>
                                    <TableCell>
                                        Input type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">placeholder</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>Placeholder text</TableCell>
                                </TableRow>
                                <TableRow class="bg-destructive/5">
                                    <TableCell class="font-mono text-sm font-bold">error</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">string | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>
                                        <strong>⚠️ Automatically shows red border when provided</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">disabled</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Disables the input</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">required</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>HTML required attribute</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">size</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'small'</code></TableCell>
                                    <TableCell>'small' | 'large'</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">fluid</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Makes input full width (100%)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">autofocus</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Auto-focus on mount</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">id</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>HTML id for label association</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">class</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>Additional CSS classes</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <!-- Events -->
                <Collapsible>
                    <CollapsibleTrigger class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
                        <ChevronDown class="h-5 w-5" />
                        🎯 Events
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow class="bg-muted/50">
                                        <TableHead class="font-bold">Event</TableHead>
                                        <TableHead class="font-bold">Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">@update:modelValue</TableCell>
                                        <TableCell>Emitted when value changes (v-model)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">@blur</TableCell>
                                        <TableCell>Emitted when input loses focus</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">@focus</TableCell>
                                        <TableCell>Emitted when input gains focus</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <!-- Usage Example -->
                <Collapsible>
                    <CollapsibleTrigger class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
                        <ChevronDown class="h-5 w-5" />
                        📝 Usage Example
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;template&gt;
    &lt;div&gt;
        &lt;Label for="email" required&gt;Email Address&lt;/Label&gt;
        &lt;DashboardTextInput
            id="email"
            v-model="form.email"
            type="email"
            placeholder="your@email.com"
            :error="form.errors.email"
            required
        /&gt;
        &lt;Hint v-if="form.errors.email" :text="form.errors.email" /&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { useForm } from '@inertiajs/vue3';

const form = useForm({
    email: '',
});
&lt;/script&gt;</code></pre>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>

        <!-- ==================== DashboardMaskedInput ==================== -->
        <Card v-if="activeComponent === 'DashboardMaskedInput'" class="border-2">
            <CardHeader class="bg-primary/5">
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="text-2xl">DashboardMaskedInput</CardTitle>
                        <CardDescription class="text-base mt-2">
                            Password input with toggle visibility and strength meter
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">Password Input</Badge>
                </div>
            </CardHeader>
            <CardContent class="space-y-8 pt-6">
                <!-- Live Preview -->
                <div class="bg-muted/30 border-2 border-dashed rounded-lg p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <Eye class="h-5 w-5 text-primary" />
                        <h3 class="font-bold text-lg">Live Preview</h3>
                    </div>
                    <div class="bg-background rounded-lg p-6 space-y-6">
                        <div>
                            <Label for="demo-password">Password with Toggle</Label>
                            <DashboardMaskedInput
                                id="demo-password"
                                v-model="demoForm.password"
                                placeholder="Enter password"
                                toggle-mask
                                class="mt-2"
                            />
                            <Hint text="Click the eye icon to show/hide password" class="mt-1" />
                        </div>
                        <div>
                            <Label for="demo-password-strength">Password with Strength Meter</Label>
                            <DashboardMaskedInput
                                id="demo-password-strength"
                                v-model="demoForm.password"
                                placeholder="Enter password"
                                toggle-mask
                                show-strength
                                class="mt-2"
                            />
                            <Hint text="Strength meter shows weak/medium/strong" class="mt-1" />
                        </div>
                    </div>
                </div>

                <!-- Import -->
                <div>
                    <h3 class="font-bold text-lg mb-3">📦 Import</h3>
                    <pre class="bg-muted p-4 rounded-lg text-sm"><code>import DashboardMaskedInput from '@common/components/dashboards/form/DashboardMaskedInput.vue';</code></pre>
                </div>

                <!-- Props Table -->
                <div>
                    <h3 class="font-bold text-lg mb-3">⚙️ Props</h3>
                    <div class="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow class="bg-muted/50">
                                    <TableHead class="font-bold">Prop</TableHead>
                                    <TableHead class="font-bold">Type</TableHead>
                                    <TableHead class="font-bold">Default</TableHead>
                                    <TableHead class="font-bold">Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">modelValue</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string | null</Badge>
                                    </TableCell>
                                    <TableCell><code>''</code></TableCell>
                                    <TableCell>The v-model binding value</TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">toggleMask</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>
                                        <strong>👁️ Shows/hides password toggle button (eye icon)</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">showStrength</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>
                                        <strong>💪 Shows password strength meter below input</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">placeholder</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>Placeholder text</TableCell>
                                </TableRow>
                                <TableRow class="bg-destructive/5">
                                    <TableCell class="font-mono text-sm font-bold">error</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">string | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>
                                        <strong>⚠️ Automatically shows red border when provided</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm" colspan="4">
                                        <em class="text-muted-foreground">
                                            + All props from DashboardTextInput (disabled, required, size, fluid, etc.)
                                        </em>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <!-- Usage Example -->
                <Collapsible>
                    <CollapsibleTrigger class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
                        <ChevronDown class="h-5 w-5" />
                        📝 Usage Example
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;template&gt;
    &lt;div&gt;
        &lt;Label for="password" required&gt;Password&lt;/Label&gt;
        &lt;DashboardMaskedInput
            id="password"
            v-model="form.password"
            placeholder="Enter strong password"
            :error="form.errors.password"
            toggle-mask
            show-strength
            required
        /&gt;
        &lt;Hint v-if="form.errors.password" :text="form.errors.password" /&gt;
    &lt;/div&gt;
&lt;/template&gt;</code></pre>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>

        <!-- ==================== DashboardSelect ==================== -->
        <Card v-if="activeComponent === 'DashboardSelect'" class="border-2">
            <CardHeader class="bg-primary/5">
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="text-2xl">DashboardSelect</CardTitle>
                        <CardDescription class="text-base mt-2">
                            Single-value select with search/filter and error handling
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">Dropdown</Badge>
                </div>
            </CardHeader>
            <CardContent class="space-y-8 pt-6">
                <!-- Live Preview -->
                <div class="bg-muted/30 border-2 border-dashed rounded-lg p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <Eye class="h-5 w-5 text-primary" />
                        <h3 class="font-bold text-lg">Live Preview</h3>
                    </div>
                    <div class="bg-background rounded-lg p-6 space-y-6">
                        <div>
                            <Label for="demo-role">Select with Filter</Label>
                            <DashboardSelect
                                id="demo-role"
                                v-model="demoForm.role"
                                :options="demoRoles"
                                option-label="name"
                                option-value="id"
                                placeholder="Select a role"
                                filter
                                class="mt-2"
                            />
                            <Hint text="Try typing to filter options" class="mt-1" />
                        </div>
                    </div>
                </div>

                <!-- Import -->
                <div>
                    <h3 class="font-bold text-lg mb-3">📦 Import</h3>
                    <pre class="bg-muted p-4 rounded-lg text-sm"><code>import DashboardSelect from '@common/components/dashboards/form/DashboardSelect.vue';</code></pre>
                </div>

                <!-- Props Table -->
                <div>
                    <h3 class="font-bold text-lg mb-3">⚙️ Props</h3>
                    <div class="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow class="bg-muted/50">
                                    <TableHead class="font-bold">Prop</TableHead>
                                    <TableHead class="font-bold">Type</TableHead>
                                    <TableHead class="font-bold">Default</TableHead>
                                    <TableHead class="font-bold">Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">modelValue</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string | number | boolean | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>The v-model binding value</TableCell>
                                </TableRow>
                                <TableRow class="bg-yellow-500/10">
                                    <TableCell class="font-mono text-sm font-bold">options</TableCell>
                                    <TableCell>
                                        <Badge variant="default">any[]</Badge>
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>
                                        <strong>⚠️ REQUIRED: Array of options to display</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">optionLabel</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'name'</code></TableCell>
                                    <TableCell>
                                        <strong>Property name for display label (e.g., 'name', 'title')</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">optionValue</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'code'</code></TableCell>
                                    <TableCell>
                                        <strong>Property name for value (e.g., 'id', 'code')</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">placeholder</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'Select an option'</code></TableCell>
                                    <TableCell>Placeholder text</TableCell>
                                </TableRow>
                                <TableRow class="bg-destructive/5">
                                    <TableCell class="font-mono text-sm font-bold">error</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">string | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>
                                        <strong>⚠️ Automatically shows red border when provided</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showClear</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Shows clear button (X icon)</TableCell>
                                </TableRow>
                                <TableRow class="bg-green-500/5">
                                    <TableCell class="font-mono text-sm font-bold">filter</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>
                                        <strong>🔍 Enables search/filter functionality</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">filterPlaceholder</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'Search...'</code></TableCell>
                                    <TableCell>Filter input placeholder</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">scrollHeight</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'200px'</code></TableCell>
                                    <TableCell>Max height of dropdown</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm" colspan="4">
                                        <em class="text-muted-foreground">
                                            + All props from DashboardTextInput (disabled, size, fluid, id, class, etc.)
                                        </em>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <!-- Usage Example -->
                <Collapsible>
                    <CollapsibleTrigger class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
                        <ChevronDown class="h-5 w-5" />
                        📝 Usage Example
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;template&gt;
    &lt;div&gt;
        &lt;Label for="role" required&gt;Role&lt;/Label&gt;
        &lt;DashboardSelect
            id="role"
            v-model="form.role_id"
            :options="roles"
            option-label="name"
            option-value="id"
            placeholder="Select a role"
            :error="form.errors.role_id"
            filter
            required
        /&gt;
        &lt;Hint v-if="form.errors.role_id" :text="form.errors.role_id" /&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Editor' },
    { id: 3, name: 'Viewer' },
];
&lt;/script&gt;</code></pre>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>

        <!-- ==================== DashboardMultiSelect ==================== -->
        <Card v-if="activeComponent === 'DashboardMultiSelect'" class="border-2">
            <CardHeader class="bg-primary/5">
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="text-2xl">DashboardMultiSelect</CardTitle>
                        <CardDescription class="text-base mt-2">
                            Multi-select dropdown with chip display and filtering support
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">Dropdown</Badge>
                </div>
            </CardHeader>
            <CardContent class="space-y-8 pt-6">
                <!-- Live Preview -->
                <div class="bg-muted/30 border-2 border-dashed rounded-lg p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <Eye class="h-5 w-5 text-primary" />
                        <h3 class="font-bold text-lg">Live Preview</h3>
                    </div>
                    <div class="bg-background rounded-lg p-6 space-y-6">
                        <div>
                            <Label for="demo-multiselect">Multi Select</Label>
                            <DashboardMultiSelect
                                id="demo-multiselect"
                                v-model="demoForm.roles"
                                :options="[
                                    { id: 1, name: 'Admin' },
                                    { id: 2, name: 'Editor' },
                                    { id: 3, name: 'Viewer' },
                                    { id: 4, name: 'Manager' },
                                ]"
                                option-label="name"
                                option-value="id"
                                placeholder="Select roles"
                                filter
                                filter-placeholder="Search roles..."
                                display="chip"
                                :show-toggle-all="false"
                                :max-selected-labels="5"
                                selected-items-label="{0} roles selected"
                                class="mt-2"
                            />
                            <Hint text="Select one or more roles" class="mt-1" />
                        </div>
                    </div>
                </div>

                <!-- Import -->
                <div>
                    <h3 class="font-bold text-lg mb-3">📦 Import</h3>
                    <pre class="bg-muted p-4 rounded-lg text-sm"><code>import DashboardMultiSelect from '@common/components/dashboards/form/DashboardMultiSelect.vue';</code></pre>
                </div>

                <!-- Props Table -->
                <div>
                    <h3 class="font-bold text-lg mb-3">⚙️ Props</h3>
                    <div class="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow class="bg-muted/50">
                                    <TableHead class="font-bold">Prop</TableHead>
                                    <TableHead class="font-bold">Type</TableHead>
                                    <TableHead class="font-bold">Default</TableHead>
                                    <TableHead class="font-bold">Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow class="bg-primary/5">
                                    <TableCell class="font-mono text-sm font-bold">modelValue</TableCell>
                                    <TableCell>
                                        <Badge variant="default">any[] | null</Badge>
                                    </TableCell>
                                    <TableCell><code>[]</code></TableCell>
                                    <TableCell>
                                        <strong>✅ Selected values (v-model binding)</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-yellow-500/10">
                                    <TableCell class="font-mono text-sm font-bold">options</TableCell>
                                    <TableCell>
                                        <Badge variant="default">any[]</Badge>
                                    </TableCell>
                                    <TableCell><code>required</code></TableCell>
                                    <TableCell>
                                        <strong>⚠️ REQUIRED: Array of options to select from</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">optionLabel</TableCell>
                                    <TableCell>
                                        <Badge variant="default">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'label'</code></TableCell>
                                    <TableCell>
                                        <strong>Property name to use as the display label</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">optionValue</TableCell>
                                    <TableCell>
                                        <Badge variant="default">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'value'</code></TableCell>
                                    <TableCell>
                                        <strong>Property name to use as the value</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-destructive/5">
                                    <TableCell class="font-mono text-sm font-bold">error</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">string | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>
                                        <strong>⚠️ Automatically shows red border when provided</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-green-500/5">
                                    <TableCell class="font-mono text-sm font-bold">filter</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>
                                        <strong>🔍 Enable filtering/search in dropdown</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">filterPlaceholder</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'Search...'</code></TableCell>
                                    <TableCell>Filter input placeholder text</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">display</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">'comma' | 'chip'</Badge>
                                    </TableCell>
                                    <TableCell><code>'chip'</code></TableCell>
                                    <TableCell>Display mode for selected items</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showClear</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Show clear button</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showToggleAll</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Show toggle all checkbox</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">maxSelectedLabels</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">number</Badge>
                                    </TableCell>
                                    <TableCell><code>3</code></TableCell>
                                    <TableCell>Max number of selected labels to show</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">selectedItemsLabel</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'{0} items selected'</code></TableCell>
                                    <TableCell>Text when more items selected than maxSelectedLabels</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">placeholder</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'Select items'</code></TableCell>
                                    <TableCell>Placeholder text</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">disabled</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Disabled state</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">size</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">'small' | 'large'</Badge>
                                    </TableCell>
                                    <TableCell><code>'small'</code></TableCell>
                                    <TableCell>Size variant</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">fluid</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Full width</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">scrollHeight</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'200px'</code></TableCell>
                                    <TableCell>Scroll height for dropdown</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">optionGroupLabel</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Property name for option group label</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">optionGroupChildren</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Property name for option group children</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">id</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Input id attribute</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">class</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>''</code></TableCell>
                                    <TableCell>Additional CSS classes</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <!-- Events -->
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
                    >
                        <ChevronDown class="h-5 w-5" />
                        🎯 Events
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow class="bg-muted/50">
                                        <TableHead class="font-bold">Event</TableHead>
                                        <TableHead class="font-bold">Payload</TableHead>
                                        <TableHead class="font-bold">Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">update:modelValue</TableCell>
                                        <TableCell>
                                            <Badge>any[]</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when value changes (v-model)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">change</TableCell>
                                        <TableCell>
                                            <Badge>event</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when selection changes</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">blur</TableCell>
                                        <TableCell>
                                            <Badge>Event</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when input loses focus</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">focus</TableCell>
                                        <TableCell>
                                            <Badge>Event</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when input gains focus</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <!-- Usage Example -->
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
                    >
                        <ChevronDown class="h-5 w-5" />
                        📝 Usage Example
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;template&gt;
    &lt;div class="space-y-2"&gt;
        &lt;Label for="roles" required&gt;Roles&lt;/Label&gt;
        &lt;DashboardMultiSelect
            id="roles"
            v-model="form.roles"
            :options="roles"
            option-label="name"
            option-value="id"
            placeholder="Select roles"
            :error="form.errors.roles"
            filter
            filter-placeholder="Search roles..."
            display="chip"
            :show-toggle-all="false"
            :max-selected-labels="5"
            selected-items-label="{0} roles selected"
        /&gt;
        &lt;InputError :message="form.errors.roles" /&gt;
        &lt;Hint text="Assign one or more roles to this user." /&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { useForm } from '@inertiajs/vue3';

const form = useForm({
    roles: [] as number[],
});

const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Editor' },
    { id: 3, name: 'Viewer' },
    { id: 4, name: 'Manager' },
];
&lt;/script&gt;</code></pre>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>

        <!-- ==================== DashboardDatePicker ==================== -->
        <Card v-if="activeComponent === 'DashboardDatePicker'" class="border-2">
            <CardHeader class="bg-primary/5">
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="text-2xl">DashboardDatePicker</CardTitle>
                        <CardDescription class="text-base mt-2">
                            Versatile date/time picker with calendar, range selection, and time support
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">Date Input</Badge>
                </div>
            </CardHeader>
            <CardContent class="space-y-8 pt-6">
                <!-- Live Preview -->
                <div class="bg-muted/30 border-2 border-dashed rounded-lg p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <Eye class="h-5 w-5 text-primary" />
                        <h3 class="font-bold text-lg">Live Preview</h3>
                    </div>
                    <div class="bg-background rounded-lg p-6 space-y-6">
                        <div>
                            <Label for="demo-date">Single Date</Label>
                            <DashboardDatePicker
                                id="demo-date"
                                v-model="demoForm.date"
                                placeholder="Select a date"
                                show-icon
                                class="mt-2"
                            />
                            <Hint text="Basic date picker" class="mt-1" />
                        </div>
                        <div>
                            <Label for="demo-date-range">Date Range</Label>
                            <DashboardDatePicker
                                id="demo-date-range"
                                v-model="demoForm.dateRange"
                                selection-mode="range"
                                placeholder="Select date range"
                                show-icon
                                class="mt-2"
                            />
                            <Hint text="Select start and end date" class="mt-1" />
                        </div>
                        <div>
                            <Label for="demo-datetime">Date & Time</Label>
                            <DashboardDatePicker
                                id="demo-datetime"
                                v-model="demoForm.dateTime"
                                show-time
                                placeholder="Select date and time"
                                show-icon
                                class="mt-2"
                            />
                            <Hint text="Date picker with time selection" class="mt-1" />
                        </div>
                    </div>
                </div>

                <!-- Import -->
                <div>
                    <h3 class="font-bold text-lg mb-3">📦 Import</h3>
                    <pre class="bg-muted p-4 rounded-lg text-sm"><code>import DashboardDatePicker from '@common/components/dashboards/form/DashboardDatePicker.vue';</code></pre>
                </div>

                <!-- Props Table -->
                <div>
                    <h3 class="font-bold text-lg mb-3">⚙️ Props</h3>
                    <div class="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow class="bg-muted/50">
                                    <TableHead class="font-bold">Prop</TableHead>
                                    <TableHead class="font-bold">Type</TableHead>
                                    <TableHead class="font-bold">Default</TableHead>
                                    <TableHead class="font-bold">Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow class="bg-primary/5">
                                    <TableCell class="font-mono text-sm font-bold">modelValue</TableCell>
                                    <TableCell>
                                        <Badge variant="default">Date | Date[] | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>
                                        <strong>✅ Selected date(s) (v-model binding)</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">selectionMode</TableCell>
                                    <TableCell>
                                        <Badge variant="default">'single' | 'multiple' | 'range'</Badge>
                                    </TableCell>
                                    <TableCell><code>'single'</code></TableCell>
                                    <TableCell>
                                        <strong>📅 Selection mode: single date, multiple dates, or date range</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">view</TableCell>
                                    <TableCell>
                                        <Badge variant="default">'date' | 'month' | 'year'</Badge>
                                    </TableCell>
                                    <TableCell><code>'date'</code></TableCell>
                                    <TableCell>
                                        <strong>📆 View mode: calendar with days, months only, or years only</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-green-500/5">
                                    <TableCell class="font-mono text-sm font-bold">showTime</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>
                                        <strong>🕐 Enable time picker alongside date</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-green-500/5">
                                    <TableCell class="font-mono text-sm font-bold">timeOnly</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>
                                        <strong>⏰ Show only time picker (no date selection)</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">dateFormat</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'yy-mm-dd'</code></TableCell>
                                    <TableCell>Date format pattern (e.g., 'dd/mm/yy', 'mm/dd/yy')</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">hourFormat</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">'12' | '24'</Badge>
                                    </TableCell>
                                    <TableCell><code>'24'</code></TableCell>
                                    <TableCell>Hour format for time picker</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showSeconds</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Show seconds in time picker</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showIcon</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Show calendar icon</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">iconDisplay</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">'button' | 'input'</Badge>
                                    </TableCell>
                                    <TableCell><code>'button'</code></TableCell>
                                    <TableCell>Icon position: button on right or inside input on left</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">placeholder</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'Select date'</code></TableCell>
                                    <TableCell>Placeholder text</TableCell>
                                </TableRow>
                                <TableRow class="bg-destructive/5">
                                    <TableCell class="font-mono text-sm font-bold">error</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">string | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>
                                        <strong>⚠️ Automatically shows red border when provided</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">minDate</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">Date</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Minimum selectable date</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">maxDate</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">Date</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Maximum selectable date</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">disabledDates</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">Date[]</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Array of dates to disable</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">disabledDays</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">number[]</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Disabled days of week (0-6, Sunday-Saturday)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showWeek</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Show week numbers</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">numberOfMonths</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">number</Badge>
                                    </TableCell>
                                    <TableCell><code>1</code></TableCell>
                                    <TableCell>Number of months to display</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">inline</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Inline display mode (no input, just calendar)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showClear</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Show clear button</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm" colspan="4">
                                        <em class="text-muted-foreground">
                                            + Common props: disabled, required, size, fluid, id, class
                                        </em>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <!-- Events -->
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
                    >
                        <ChevronDown class="h-5 w-5" />
                        🎯 Events
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow class="bg-muted/50">
                                        <TableHead class="font-bold">Event</TableHead>
                                        <TableHead class="font-bold">Payload</TableHead>
                                        <TableHead class="font-bold">Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">update:modelValue</TableCell>
                                        <TableCell>
                                            <Badge>Date | Date[] | null</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when value changes (v-model)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">change</TableCell>
                                        <TableCell>
                                            <Badge>Date | Date[] | null</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when date changes</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">select</TableCell>
                                        <TableCell>
                                            <Badge>Date | Date[]</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when date is selected</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">blur</TableCell>
                                        <TableCell>
                                            <Badge>Event</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when input loses focus</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">focus</TableCell>
                                        <TableCell>
                                            <Badge>Event</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when input gains focus</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">month-change</TableCell>
                                        <TableCell>
                                            <Badge>Event</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when month changes</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">year-change</TableCell>
                                        <TableCell>
                                            <Badge>Event</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when year changes</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <!-- Usage Examples -->
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
                    >
                        <ChevronDown class="h-5 w-5" />
                        📝 Usage Examples
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="space-y-4">
                            <div>
                                <h4 class="font-semibold mb-2 text-sm">1. Basic Date Picker</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;Label for="birth_date" required&gt;Birth Date&lt;/Label&gt;
&lt;DashboardDatePicker
    id="birth_date"
    v-model="form.birth_date"
    placeholder="Select your birth date"
    :error="form.errors.birth_date"
    show-icon
/&gt;
&lt;InputError :message="form.errors.birth_date" /&gt;</code></pre>
                            </div>

                            <div>
                                <h4 class="font-semibold mb-2 text-sm">2. Date Range Picker</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;Label for="date_range"&gt;Date Range&lt;/Label&gt;
&lt;DashboardDatePicker
    id="date_range"
    v-model="form.date_range"
    selection-mode="range"
    placeholder="Select start and end date"
    show-icon
/&gt;
&lt;Hint text="Select a start and end date for the report" /&gt;</code></pre>
                            </div>

                            <div>
                                <h4 class="font-semibold mb-2 text-sm">3. Date & Time Picker</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;Label for="scheduled_at"&gt;Schedule For&lt;/Label&gt;
&lt;DashboardDatePicker
    id="scheduled_at"
    v-model="form.scheduled_at"
    show-time
    hour-format="12"
    placeholder="Select date and time"
    show-icon
    date-format="mm/dd/yy"
/&gt;</code></pre>
                            </div>

                            <div>
                                <h4 class="font-semibold mb-2 text-sm">4. Month Picker</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;Label for="month"&gt;Select Month&lt;/Label&gt;
&lt;DashboardDatePicker
    id="month"
    v-model="form.month"
    view="month"
    date-format="mm/yy"
    placeholder="Select month"
    show-icon
/&gt;</code></pre>
                            </div>

                            <div>
                                <h4 class="font-semibold mb-2 text-sm">5. Time Only Picker</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;Label for="time"&gt;Select Time&lt;/Label&gt;
&lt;DashboardDatePicker
    id="time"
    v-model="form.time"
    time-only
    hour-format="12"
    show-seconds
    placeholder="Select time"
/&gt;</code></pre>
                            </div>

                            <div>
                                <h4 class="font-semibold mb-2 text-sm">6. With Date Restrictions</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;Label for="appointment"&gt;Appointment Date&lt;/Label&gt;
&lt;DashboardDatePicker
    id="appointment"
    v-model="form.appointment_date"
    :min-date="new Date()"
    :max-date="maxDate"
    :disabled-days="[0, 6]"
    placeholder="Select appointment date"
    show-icon
/&gt;
&lt;Hint text="Weekends are not available" /&gt;</code></pre>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>

        <!-- ==================== DashboardFileUpload ==================== -->
        <Card v-if="activeComponent === 'DashboardFileUpload'" class="border-2">
            <CardHeader class="bg-primary/5">
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="text-2xl">DashboardFileUpload</CardTitle>
                        <CardDescription class="text-base mt-2">
                            Advanced file upload with drag & drop, image previews, and file type validation
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">File Input</Badge>
                </div>
            </CardHeader>
            <CardContent class="space-y-8 pt-6">
                <!-- Live Preview -->
                <div class="bg-muted/30 border-2 border-dashed rounded-lg p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <Eye class="h-5 w-5 text-primary" />
                        <h3 class="font-bold text-lg">Live Preview</h3>
                    </div>
                    <div class="bg-background rounded-lg p-6 space-y-6">
                        <div>
                            <Label for="demo-files">File Upload</Label>
                            <DashboardFileUpload
                                id="demo-files"
                                v-model="demoForm.files"
                                :multiple="true"
                                accept="image/*"
                                :max-file-size="5000000"
                                choose-label="Choose Images"
                                class="mt-2"
                            />
                            <Hint text="Upload images (max 5MB each)" class="mt-1" />
                        </div>
                    </div>
                </div>

                <!-- Import -->
                <div>
                    <h3 class="font-bold text-lg mb-3">📦 Import</h3>
                    <pre class="bg-muted p-4 rounded-lg text-sm"><code>import DashboardFileUpload from '@common/components/dashboards/form/DashboardFileUpload.vue';</code></pre>
                </div>

                <!-- Props Table -->
                <div>
                    <h3 class="font-bold text-lg mb-3">⚙️ Props</h3>
                    <div class="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow class="bg-muted/50">
                                    <TableHead class="font-bold">Prop</TableHead>
                                    <TableHead class="font-bold">Type</TableHead>
                                    <TableHead class="font-bold">Default</TableHead>
                                    <TableHead class="font-bold">Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow class="bg-primary/5">
                                    <TableCell class="font-mono text-sm font-bold">modelValue</TableCell>
                                    <TableCell>
                                        <Badge variant="default">File[] | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>
                                        <strong>✅ Selected files (v-model binding)</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">name</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'files[]'</code></TableCell>
                                    <TableCell>Form field name for submission</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">url</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Upload endpoint URL (required for auto upload)</TableCell>
                                </TableRow>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">accept</TableCell>
                                    <TableCell>
                                        <Badge variant="default">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'*'</code></TableCell>
                                    <TableCell>
                                        <strong>📄 Accepted file types (e.g., 'image/*', '.pdf', 'image/png,image/jpeg')</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow class="bg-yellow-500/10">
                                    <TableCell class="font-mono text-sm font-bold">maxFileSize</TableCell>
                                    <TableCell>
                                        <Badge variant="default">number</Badge>
                                    </TableCell>
                                    <TableCell><code>5000000</code></TableCell>
                                    <TableCell>
                                        <strong>⚠️ Max file size in bytes (default: 5MB)</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">maxFiles</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">number</Badge>
                                    </TableCell>
                                    <TableCell><code>10</code></TableCell>
                                    <TableCell>Maximum number of files allowed</TableCell>
                                </TableRow>
                                <TableRow class="bg-green-500/5">
                                    <TableCell class="font-mono text-sm font-bold">multiple</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>
                                        <strong>📁 Allow multiple file selection</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">auto</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Automatically upload files on selection</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">customUpload</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Use custom upload handler via @upload event</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">fileLimit</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">number</Badge>
                                    </TableCell>
                                    <TableCell><code>undefined</code></TableCell>
                                    <TableCell>Limit total number of files</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">chooseLabel</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'Choose Files'</code></TableCell>
                                    <TableCell>Choose button label</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">uploadLabel</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'Upload'</code></TableCell>
                                    <TableCell>Upload button label</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">cancelLabel</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'Cancel'</code></TableCell>
                                    <TableCell>Cancel button label</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showUploadButton</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Show upload button</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">showCancelButton</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>true</code></TableCell>
                                    <TableCell>Show cancel/clear button</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">invalidFileSizeMessage</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'{0}: Invalid file size...'</code></TableCell>
                                    <TableCell>Error message for file size validation</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">invalidFileTypeMessage</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'{0}: Invalid file type...'</code></TableCell>
                                    <TableCell>Error message for file type validation</TableCell>
                                </TableRow>
                                <TableRow class="bg-destructive/5">
                                    <TableCell class="font-mono text-sm font-bold">error</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive">string | null</Badge>
                                    </TableCell>
                                    <TableCell><code>null</code></TableCell>
                                    <TableCell>
                                        <strong>⚠️ Automatically shows red border when provided</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">disabled</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Disable the uploader</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">previewWidth</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">number</Badge>
                                    </TableCell>
                                    <TableCell><code>100</code></TableCell>
                                    <TableCell>Image preview width in pixels</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <!-- Events -->
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
                    >
                        <ChevronDown class="h-5 w-5" />
                        🎯 Events
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow class="bg-muted/50">
                                        <TableHead class="font-bold">Event</TableHead>
                                        <TableHead class="font-bold">Payload</TableHead>
                                        <TableHead class="font-bold">Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">update:modelValue</TableCell>
                                        <TableCell>
                                            <Badge>File[]</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when files change (v-model)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">select</TableCell>
                                        <TableCell>
                                            <Badge>FileUploadSelectEvent</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when files are selected</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">upload</TableCell>
                                        <TableCell>
                                            <Badge>FileUploadUploaderEvent</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when upload button is clicked</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">remove</TableCell>
                                        <TableCell>
                                            <Badge>{'{ file, files }'}</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when a file is removed</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">clear</TableCell>
                                        <TableCell>
                                            <Badge>void</Badge>
                                        </TableCell>
                                        <TableCell>Emitted when all files are cleared</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">error</TableCell>
                                        <TableCell>
                                            <Badge>any</Badge>
                                        </TableCell>
                                        <TableCell>Emitted on upload error</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">before-upload</TableCell>
                                        <TableCell>
                                            <Badge>any</Badge>
                                        </TableCell>
                                        <TableCell>Emitted before upload starts</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">progress</TableCell>
                                        <TableCell>
                                            <Badge>ProgressEvent</Badge>
                                        </TableCell>
                                        <TableCell>Emitted during upload progress</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <!-- Features -->
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
                    >
                        <ChevronDown class="h-5 w-5" />
                        ✨ Features
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="border rounded-lg p-4">
                            <ul class="space-y-2 text-sm">
                                <li class="flex items-start gap-2">
                                    <span class="text-primary">•</span>
                                    <span><strong>Drag & Drop:</strong> Drag files directly into the upload area</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary">•</span>
                                    <span><strong>Image Previews:</strong> Automatic thumbnail generation for images</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary">•</span>
                                    <span><strong>File Type Icons:</strong> Different icons for images, PDFs, and other files</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary">•</span>
                                    <span><strong>File Size Display:</strong> Auto-formatted file sizes (B, KB, MB, GB)</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary">•</span>
                                    <span><strong>Validation:</strong> File type and size validation with custom error messages</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary">•</span>
                                    <span><strong>Grid Layout:</strong> Responsive grid display for multiple files</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary">•</span>
                                    <span><strong>Remove Files:</strong> Individual file removal with hover buttons</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-primary">•</span>
                                    <span><strong>Uploaded Files Section:</strong> Separate display for successfully uploaded files</span>
                                </li>
                            </ul>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <!-- Usage Examples -->
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
                    >
                        <ChevronDown class="h-5 w-5" />
                        📝 Usage Examples
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="space-y-4">
                            <div>
                                <h4 class="font-semibold mb-2 text-sm">1. Basic Image Upload</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;Label for="avatar"&gt;Profile Picture&lt;/Label&gt;
&lt;DashboardFileUpload
    id="avatar"
    v-model="form.avatar"
    accept="image/*"
    :multiple="false"
    :max-file-size="2000000"
    choose-label="Choose Image"
    :error="form.errors.avatar"
/&gt;
&lt;InputError :message="form.errors.avatar" /&gt;
&lt;Hint text="Maximum 2MB. JPG, PNG, or GIF" /&gt;</code></pre>
                            </div>

                            <div>
                                <h4 class="font-semibold mb-2 text-sm">2. Multiple Files with Custom Upload</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;script setup&gt;
const handleUpload = async (event) => {
    const formData = new FormData();
    event.files.forEach((file) => {
        formData.append('files[]', file);
    });

    await axios.post('/api/upload', formData);
};
&lt;/script&gt;

&lt;template&gt;
    &lt;DashboardFileUpload
        v-model="files"
        :multiple="true"
        custom-upload
        @upload="handleUpload"
        accept="image/*,.pdf"
        :max-file-size="10000000"
    /&gt;
&lt;/template&gt;</code></pre>
                            </div>

                            <div>
                                <h4 class="font-semibold mb-2 text-sm">3. PDF Documents Only</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;Label for="documents" required&gt;Upload Documents&lt;/Label&gt;
&lt;DashboardFileUpload
    id="documents"
    v-model="form.documents"
    accept=".pdf"
    :multiple="true"
    :file-limit="5"
    choose-label="Choose PDFs"
    :error="form.errors.documents"
/&gt;
&lt;Hint text="Upload up to 5 PDF files, max 10MB each" /&gt;</code></pre>
                            </div>

                            <div>
                                <h4 class="font-semibold mb-2 text-sm">4. Auto Upload to Server</h4>
                                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;DashboardFileUpload
    v-model="files"
    url="/api/upload"
    :auto="true"
    :multiple="true"
    accept="image/*"
    @upload="onUploadComplete"
    @error="onUploadError"
/&gt;</code></pre>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <!-- Exposed Methods -->
                <Collapsible>
                    <CollapsibleTrigger
                        class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
                    >
                        <ChevronDown class="h-5 w-5" />
                        🔧 Exposed Methods
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow class="bg-muted/50">
                                        <TableHead class="font-bold">Method</TableHead>
                                        <TableHead class="font-bold">Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">upload()</TableCell>
                                        <TableCell>Programmatically trigger file upload</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">clear()</TableCell>
                                        <TableCell>Clear all selected files</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">choose()</TableCell>
                                        <TableCell>Open file browser dialog</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div class="mt-3">
                            <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>&lt;script setup&gt;
const fileUploadRef = ref();

const triggerUpload = () => {
    fileUploadRef.value.upload();
};

const clearAll = () => {
    fileUploadRef.value.clear();
};
&lt;/script&gt;

&lt;template&gt;
    &lt;DashboardFileUpload ref="fileUploadRef" /&gt;
&lt;/template&gt;</code></pre>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>

        <!-- ==================== DashboardButton ==================== -->
        <Card v-if="activeComponent === 'DashboardButton'" class="border-2">
            <CardHeader class="bg-primary/5">
                <div class="flex items-center justify-between">
                    <div>
                        <CardTitle class="text-2xl">DashboardButton</CardTitle>
                        <CardDescription class="text-base mt-2">
                            Button with loading states, variants, and custom icons
                        </CardDescription>
                    </div>
                    <Badge variant="secondary">Action</Badge>
                </div>
            </CardHeader>
            <CardContent class="space-y-8 pt-6">
                <!-- Live Preview -->
                <div class="bg-muted/30 border-2 border-dashed rounded-lg p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <Eye class="h-5 w-5 text-primary" />
                        <h3 class="font-bold text-lg">Live Preview</h3>
                    </div>
                    <div class="bg-background rounded-lg p-6">
                        <div class="flex flex-wrap gap-3">
                            <DashboardButton variant="default">Default</DashboardButton>
                            <DashboardButton variant="destructive">Destructive</DashboardButton>
                            <DashboardButton variant="outline">Outline</DashboardButton>
                            <DashboardButton variant="secondary">Secondary</DashboardButton>
                            <DashboardButton variant="ghost">Ghost</DashboardButton>
                            <DashboardButton :loading="true">Loading</DashboardButton>
                        </div>
                    </div>
                </div>

                <!-- Import -->
                <div>
                    <h3 class="font-bold text-lg mb-3">📦 Import</h3>
                    <pre class="bg-muted p-4 rounded-lg text-sm"><code>import DashboardButton from '@common/components/dashboards/form/DashboardButton.vue';</code></pre>
                </div>

                <!-- Props Table -->
                <div>
                    <h3 class="font-bold text-lg mb-3">⚙️ Props</h3>
                    <div class="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow class="bg-muted/50">
                                    <TableHead class="font-bold">Prop</TableHead>
                                    <TableHead class="font-bold">Type</TableHead>
                                    <TableHead class="font-bold">Default</TableHead>
                                    <TableHead class="font-bold">Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow class="bg-blue-500/5">
                                    <TableCell class="font-mono text-sm font-bold">variant</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'default'</code></TableCell>
                                    <TableCell>
                                        <strong>
                                            'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' |
                                            'success' | 'warning' | 'gradient' | 'glass'
                                        </strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">size</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'default'</code></TableCell>
                                    <TableCell>'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon'</TableCell>
                                </TableRow>
                                <TableRow class="bg-yellow-500/10">
                                    <TableCell class="font-mono text-sm font-bold">loading</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>
                                        <strong>⏳ Shows loading spinner and disables button</strong>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">loadingText</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>Custom text during loading</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">loadingPosition</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'after'</code></TableCell>
                                    <TableCell>'before' | 'after'</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">loadingIcon</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'circle'</code></TableCell>
                                    <TableCell>
                                        'circle' | 'spinner' | 'rotate' | 'refresh' | 'gear' | 'dot' | 'disc' | 'none'
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">disabled</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">boolean</Badge>
                                    </TableCell>
                                    <TableCell><code>false</code></TableCell>
                                    <TableCell>Disables button</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class="font-mono text-sm">type</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">string</Badge>
                                    </TableCell>
                                    <TableCell><code>'button'</code></TableCell>
                                    <TableCell>'button' | 'submit' | 'reset'</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <!-- Slots -->
                <Collapsible>
                    <CollapsibleTrigger class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
                        <ChevronDown class="h-5 w-5" />
                        🎯 Slots
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <div class="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow class="bg-muted/50">
                                        <TableHead class="font-bold">Slot</TableHead>
                                        <TableHead class="font-bold">Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">default</TableCell>
                                        <TableCell>Button content (text, elements)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell class="font-mono text-sm">icon</TableCell>
                                        <TableCell>Icon slot (hidden when loading)</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <!-- Usage Example -->
                <Collapsible>
                    <CollapsibleTrigger class="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
                        <ChevronDown class="h-5 w-5" />
                        📝 Usage Examples
                    </CollapsibleTrigger>
                    <CollapsibleContent class="mt-3">
                        <pre class="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;!-- Submit button with loading --&gt;
&lt;DashboardButton
    type="submit"
    :loading="form.processing"
&gt;
    Create User
&lt;/DashboardButton&gt;

&lt;!-- Delete button --&gt;
&lt;DashboardButton
    variant="destructive"
    @click="deleteItem"
&gt;
    Delete
&lt;/DashboardButton&gt;

&lt;!-- Button with custom loading --&gt;
&lt;DashboardButton
    :loading="saving"
    loading-text="Saving..."
    loading-icon="refresh"
&gt;
    Save Changes
&lt;/DashboardButton&gt;</code></pre>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    </div>
</template>
