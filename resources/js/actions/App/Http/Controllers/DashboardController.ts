import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::manager
 * @see app/Http/Controllers/DashboardController.php:15
 * @route '/manager'
 */
export const manager = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manager.url(options),
    method: 'get',
})

manager.definition = {
    methods: ["get","head"],
    url: '/manager',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::manager
 * @see app/Http/Controllers/DashboardController.php:15
 * @route '/manager'
 */
manager.url = (options?: RouteQueryOptions) => {
    return manager.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::manager
 * @see app/Http/Controllers/DashboardController.php:15
 * @route '/manager'
 */
manager.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manager.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::manager
 * @see app/Http/Controllers/DashboardController.php:15
 * @route '/manager'
 */
manager.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manager.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::manager
 * @see app/Http/Controllers/DashboardController.php:15
 * @route '/manager'
 */
    const managerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manager.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::manager
 * @see app/Http/Controllers/DashboardController.php:15
 * @route '/manager'
 */
        managerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manager.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::manager
 * @see app/Http/Controllers/DashboardController.php:15
 * @route '/manager'
 */
        managerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manager.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manager.form = managerForm
/**
* @see \App\Http\Controllers\DashboardController::ppic
 * @see app/Http/Controllers/DashboardController.php:27
 * @route '/ppic'
 */
export const ppic = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ppic.url(options),
    method: 'get',
})

ppic.definition = {
    methods: ["get","head"],
    url: '/ppic',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::ppic
 * @see app/Http/Controllers/DashboardController.php:27
 * @route '/ppic'
 */
ppic.url = (options?: RouteQueryOptions) => {
    return ppic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::ppic
 * @see app/Http/Controllers/DashboardController.php:27
 * @route '/ppic'
 */
ppic.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ppic.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::ppic
 * @see app/Http/Controllers/DashboardController.php:27
 * @route '/ppic'
 */
ppic.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ppic.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::ppic
 * @see app/Http/Controllers/DashboardController.php:27
 * @route '/ppic'
 */
    const ppicForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ppic.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::ppic
 * @see app/Http/Controllers/DashboardController.php:27
 * @route '/ppic'
 */
        ppicForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ppic.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::ppic
 * @see app/Http/Controllers/DashboardController.php:27
 * @route '/ppic'
 */
        ppicForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ppic.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ppic.form = ppicForm
/**
* @see \App\Http\Controllers\DashboardController::production
 * @see app/Http/Controllers/DashboardController.php:50
 * @route '/production'
 */
export const production = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: production.url(options),
    method: 'get',
})

production.definition = {
    methods: ["get","head"],
    url: '/production',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::production
 * @see app/Http/Controllers/DashboardController.php:50
 * @route '/production'
 */
production.url = (options?: RouteQueryOptions) => {
    return production.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::production
 * @see app/Http/Controllers/DashboardController.php:50
 * @route '/production'
 */
production.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: production.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::production
 * @see app/Http/Controllers/DashboardController.php:50
 * @route '/production'
 */
production.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: production.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::production
 * @see app/Http/Controllers/DashboardController.php:50
 * @route '/production'
 */
    const productionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: production.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::production
 * @see app/Http/Controllers/DashboardController.php:50
 * @route '/production'
 */
        productionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: production.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::production
 * @see app/Http/Controllers/DashboardController.php:50
 * @route '/production'
 */
        productionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: production.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    production.form = productionForm
const DashboardController = { manager, ppic, production }

export default DashboardController