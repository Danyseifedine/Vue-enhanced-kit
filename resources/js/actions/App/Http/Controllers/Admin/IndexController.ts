import { queryParams, type QueryParams } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\IndexController::index
 * @see app/Http/Controllers/Admin/IndexController.php:12
 * @route '/admin'
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/admin',
}

/**
* @see \App\Http\Controllers\Admin\IndexController::index
 * @see app/Http/Controllers/Admin/IndexController.php:12
 * @route '/admin'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\IndexController::index
 * @see app/Http/Controllers/Admin/IndexController.php:12
 * @route '/admin'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\IndexController::index
 * @see app/Http/Controllers/Admin/IndexController.php:12
 * @route '/admin'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

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
const IndexController = { index, appearance }

export default IndexController