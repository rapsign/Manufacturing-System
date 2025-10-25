import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Manager\WarehouseController::index
 * @see app/Http/Controllers/Manager/WarehouseController.php:13
 * @route '/manager/warehouse'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/manager/warehouse',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Manager\WarehouseController::index
 * @see app/Http/Controllers/Manager/WarehouseController.php:13
 * @route '/manager/warehouse'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\WarehouseController::index
 * @see app/Http/Controllers/Manager/WarehouseController.php:13
 * @route '/manager/warehouse'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Manager\WarehouseController::index
 * @see app/Http/Controllers/Manager/WarehouseController.php:13
 * @route '/manager/warehouse'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Manager\WarehouseController::index
 * @see app/Http/Controllers/Manager/WarehouseController.php:13
 * @route '/manager/warehouse'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Manager\WarehouseController::index
 * @see app/Http/Controllers/Manager/WarehouseController.php:13
 * @route '/manager/warehouse'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Manager\WarehouseController::index
 * @see app/Http/Controllers/Manager/WarehouseController.php:13
 * @route '/manager/warehouse'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const warehouse = {
    index: Object.assign(index, index),
}

export default warehouse