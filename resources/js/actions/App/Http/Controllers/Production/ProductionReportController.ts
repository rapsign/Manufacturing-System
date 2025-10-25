import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Production\ProductionReportController::exportMethod
 * @see app/Http/Controllers/Production/ProductionReportController.php:95
 * @route '/production/reports/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/production/reports/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Production\ProductionReportController::exportMethod
 * @see app/Http/Controllers/Production/ProductionReportController.php:95
 * @route '/production/reports/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Production\ProductionReportController::exportMethod
 * @see app/Http/Controllers/Production/ProductionReportController.php:95
 * @route '/production/reports/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Production\ProductionReportController::exportMethod
 * @see app/Http/Controllers/Production/ProductionReportController.php:95
 * @route '/production/reports/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Production\ProductionReportController::exportMethod
 * @see app/Http/Controllers/Production/ProductionReportController.php:95
 * @route '/production/reports/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Production\ProductionReportController::exportMethod
 * @see app/Http/Controllers/Production/ProductionReportController.php:95
 * @route '/production/reports/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Production\ProductionReportController::exportMethod
 * @see app/Http/Controllers/Production/ProductionReportController.php:95
 * @route '/production/reports/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\Production\ProductionReportController::index
 * @see app/Http/Controllers/Production/ProductionReportController.php:15
 * @route '/production/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/production/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Production\ProductionReportController::index
 * @see app/Http/Controllers/Production/ProductionReportController.php:15
 * @route '/production/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Production\ProductionReportController::index
 * @see app/Http/Controllers/Production/ProductionReportController.php:15
 * @route '/production/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Production\ProductionReportController::index
 * @see app/Http/Controllers/Production/ProductionReportController.php:15
 * @route '/production/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Production\ProductionReportController::index
 * @see app/Http/Controllers/Production/ProductionReportController.php:15
 * @route '/production/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Production\ProductionReportController::index
 * @see app/Http/Controllers/Production/ProductionReportController.php:15
 * @route '/production/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Production\ProductionReportController::index
 * @see app/Http/Controllers/Production/ProductionReportController.php:15
 * @route '/production/reports'
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
* @see \App\Http\Controllers\Production\ProductionReportController::show
 * @see app/Http/Controllers/Production/ProductionReportController.php:74
 * @route '/production/reports/{order}'
 */
export const show = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/production/reports/{order}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Production\ProductionReportController::show
 * @see app/Http/Controllers/Production/ProductionReportController.php:74
 * @route '/production/reports/{order}'
 */
show.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Production\ProductionReportController::show
 * @see app/Http/Controllers/Production/ProductionReportController.php:74
 * @route '/production/reports/{order}'
 */
show.get = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Production\ProductionReportController::show
 * @see app/Http/Controllers/Production/ProductionReportController.php:74
 * @route '/production/reports/{order}'
 */
show.head = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Production\ProductionReportController::show
 * @see app/Http/Controllers/Production/ProductionReportController.php:74
 * @route '/production/reports/{order}'
 */
    const showForm = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Production\ProductionReportController::show
 * @see app/Http/Controllers/Production/ProductionReportController.php:74
 * @route '/production/reports/{order}'
 */
        showForm.get = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Production\ProductionReportController::show
 * @see app/Http/Controllers/Production/ProductionReportController.php:74
 * @route '/production/reports/{order}'
 */
        showForm.head = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const ProductionReportController = { exportMethod, index, show, export: exportMethod }

export default ProductionReportController