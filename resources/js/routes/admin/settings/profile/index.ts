import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::edit
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:20
 * @route '/admin/settings/profile/edit'
 */
export const edit = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/admin/settings/profile/edit',
}

/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::edit
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:20
 * @route '/admin/settings/profile/edit'
 */
edit.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::edit
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:20
 * @route '/admin/settings/profile/edit'
 */
edit.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::edit
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:20
 * @route '/admin/settings/profile/edit'
 */
edit.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::update
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:31
 * @route '/admin/settings/profile/update'
 */
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ['patch'],
    url: '/admin/settings/profile/update',
}

/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::update
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:31
 * @route '/admin/settings/profile/update'
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::update
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:31
 * @route '/admin/settings/profile/update'
 */
update.patch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:47
 * @route '/admin/settings/profile/destroy'
 */
export const destroy = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/admin/settings/profile/destroy',
}

/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:47
 * @route '/admin/settings/profile/destroy'
 */
destroy.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Admin/Settings/ProfileController.php:47
 * @route '/admin/settings/profile/destroy'
 */
destroy.delete = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(options),
    method: 'delete',
})
const profile = {
    edit,
update,
destroy,
}

export default profile