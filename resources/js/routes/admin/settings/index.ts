import { queryParams, type QueryParams } from './../../../wayfinder'
import profile from './profile'
import password from './password'
/**
* @see \App\Http\Controllers\Admin\IndexController::appearance
 * @see app/Http/Controllers/Admin/IndexController.php:17
 * @route '/admin/settings/appearance'
 */
export const appearance = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: appearance.url(options),
    method: 'get',
})

appearance.definition = {
    methods: ['get','head'],
    url: '/admin/settings/appearance',
}

/**
* @see \App\Http\Controllers\Admin\IndexController::appearance
 * @see app/Http/Controllers/Admin/IndexController.php:17
 * @route '/admin/settings/appearance'
 */
appearance.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return appearance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\IndexController::appearance
 * @see app/Http/Controllers/Admin/IndexController.php:17
 * @route '/admin/settings/appearance'
 */
appearance.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: appearance.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\IndexController::appearance
 * @see app/Http/Controllers/Admin/IndexController.php:17
 * @route '/admin/settings/appearance'
 */
appearance.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: appearance.url(options),
    method: 'head',
})
const settings = {
    profile,
password,
appearance,
}

export default settings