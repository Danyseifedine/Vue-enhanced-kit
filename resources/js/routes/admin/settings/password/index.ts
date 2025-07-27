import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\Settings\PasswordController::edit
 * @see app/Http/Controllers/Admin/Settings/PasswordController.php:20
 * @route '/admin/settings/password/edit'
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
    url: '/admin/settings/password/edit',
}

/**
* @see \App\Http\Controllers\Admin\Settings\PasswordController::edit
 * @see app/Http/Controllers/Admin/Settings/PasswordController.php:20
 * @route '/admin/settings/password/edit'
 */
edit.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Settings\PasswordController::edit
 * @see app/Http/Controllers/Admin/Settings/PasswordController.php:20
 * @route '/admin/settings/password/edit'
 */
edit.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\Settings\PasswordController::edit
 * @see app/Http/Controllers/Admin/Settings/PasswordController.php:20
 * @route '/admin/settings/password/edit'
 */
edit.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\Settings\PasswordController::update
 * @see app/Http/Controllers/Admin/Settings/PasswordController.php:31
 * @route '/admin/settings/password/update'
 */
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/admin/settings/password/update',
}

/**
* @see \App\Http\Controllers\Admin\Settings\PasswordController::update
 * @see app/Http/Controllers/Admin/Settings/PasswordController.php:31
 * @route '/admin/settings/password/update'
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\Settings\PasswordController::update
 * @see app/Http/Controllers/Admin/Settings/PasswordController.php:31
 * @route '/admin/settings/password/update'
 */
update.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})
const password = {
    edit,
update,
}

export default password