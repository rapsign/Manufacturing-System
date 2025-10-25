import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Production\ProductionOrderController::index
 * @see app/Http/Controllers/Production/ProductionOrderController.php:16
 * @route '/production/production-orders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/production/production-orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Production\ProductionOrderController::index
 * @see app/Http/Controllers/Production/ProductionOrderController.php:16
 * @route '/production/production-orders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Production\ProductionOrderController::index
 * @see app/Http/Controllers/Production/ProductionOrderController.php:16
 * @route '/production/production-orders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Production\ProductionOrderController::index
 * @see app/Http/Controllers/Production/ProductionOrderController.php:16
 * @route '/production/production-orders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Production\ProductionOrderController::index
 * @see app/Http/Controllers/Production/ProductionOrderController.php:16
 * @route '/production/production-orders'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Production\ProductionOrderController::index
 * @see app/Http/Controllers/Production/ProductionOrderController.php:16
 * @route '/production/production-orders'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Production\ProductionOrderController::index
 * @see app/Http/Controllers/Production/ProductionOrderController.php:16
 * @route '/production/production-orders'
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
/**
* @see \App\Http\Controllers\Production\ProductionOrderController::process
 * @see app/Http/Controllers/Production/ProductionOrderController.php:62
 * @route '/production/production-orders/{order}/process'
 */
export const process = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: process.url(args, options),
    method: 'put',
})

process.definition = {
    methods: ["put"],
    url: '/production/production-orders/{order}/process',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Production\ProductionOrderController::process
 * @see app/Http/Controllers/Production/ProductionOrderController.php:62
 * @route '/production/production-orders/{order}/process'
 */
process.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return process.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Production\ProductionOrderController::process
 * @see app/Http/Controllers/Production/ProductionOrderController.php:62
 * @route '/production/production-orders/{order}/process'
 */
process.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: process.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Production\ProductionOrderController::process
 * @see app/Http/Controllers/Production/ProductionOrderController.php:62
 * @route '/production/production-orders/{order}/process'
 */
    const processForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: process.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Production\ProductionOrderController::process
 * @see app/Http/Controllers/Production/ProductionOrderController.php:62
 * @route '/production/production-orders/{order}/process'
 */
        processForm.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: process.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    process.form = processForm
/**
* @see \App\Http\Controllers\Production\ProductionOrderController::complete
 * @see app/Http/Controllers/Production/ProductionOrderController.php:79
 * @route '/production/production-orders/{order}/complete'
 */
export const complete = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: complete.url(args, options),
    method: 'put',
})

complete.definition = {
    methods: ["put"],
    url: '/production/production-orders/{order}/complete',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Production\ProductionOrderController::complete
 * @see app/Http/Controllers/Production/ProductionOrderController.php:79
 * @route '/production/production-orders/{order}/complete'
 */
complete.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return complete.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Production\ProductionOrderController::complete
 * @see app/Http/Controllers/Production/ProductionOrderController.php:79
 * @route '/production/production-orders/{order}/complete'
 */
complete.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: complete.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Production\ProductionOrderController::complete
 * @see app/Http/Controllers/Production/ProductionOrderController.php:79
 * @route '/production/production-orders/{order}/complete'
 */
    const completeForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Production\ProductionOrderController::complete
 * @see app/Http/Controllers/Production/ProductionOrderController.php:79
 * @route '/production/production-orders/{order}/complete'
 */
        completeForm.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\Production\ProductionOrderController::ship
 * @see app/Http/Controllers/Production/ProductionOrderController.php:105
 * @route '/production/production-orders/{order}/ship'
 */
export const ship = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: ship.url(args, options),
    method: 'put',
})

ship.definition = {
    methods: ["put"],
    url: '/production/production-orders/{order}/ship',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Production\ProductionOrderController::ship
 * @see app/Http/Controllers/Production/ProductionOrderController.php:105
 * @route '/production/production-orders/{order}/ship'
 */
ship.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return ship.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Production\ProductionOrderController::ship
 * @see app/Http/Controllers/Production/ProductionOrderController.php:105
 * @route '/production/production-orders/{order}/ship'
 */
ship.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: ship.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Production\ProductionOrderController::ship
 * @see app/Http/Controllers/Production/ProductionOrderController.php:105
 * @route '/production/production-orders/{order}/ship'
 */
    const shipForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ship.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Production\ProductionOrderController::ship
 * @see app/Http/Controllers/Production/ProductionOrderController.php:105
 * @route '/production/production-orders/{order}/ship'
 */
        shipForm.put = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ship.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    ship.form = shipForm
const ProductionOrderController = { index, process, complete, ship }

export default ProductionOrderController