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
import { ChevronDown, Eye } from 'lucide-vue-next';

const activeComponent = ref<string | null>('DashboardTextInput');

// Demo form state
const demoForm = ref({
    text: '',
    email: '',
    password: '',
    role: null,
    roles: [] as number[],
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
