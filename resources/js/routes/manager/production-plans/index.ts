import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::index
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:19
 * @route '/manager/production-plans'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/manager/production-plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::index
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:19
 * @route '/manager/production-plans'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::index
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:19
 * @route '/manager/production-plans'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::index
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:19
 * @route '/manager/production-plans'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Manager\ProductionPlanController::index
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:19
 * @route '/manager/production-plans'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Manager\ProductionPlanController::index
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:19
 * @route '/manager/production-plans'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Manager\ProductionPlanController::index
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:19
 * @route '/manager/production-plans'
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
* @see \App\Http\Controllers\Manager\ProductionPlanController::approve
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:45
 * @route '/manager/production-plans/{plan}/approve'
 */
export const approve = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: approve.url(args, options),
    method: 'put',
})

approve.definition = {
    methods: ["put"],
    url: '/manager/production-plans/{plan}/approve',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::approve
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:45
 * @route '/manager/production-plans/{plan}/approve'
 */
approve.url = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { plan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    plan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        plan: typeof args.plan === 'object'
                ? args.plan.id
                : args.plan,
                }

    return approve.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::approve
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:45
 * @route '/manager/production-plans/{plan}/approve'
 */
approve.put = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: approve.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Manager\ProductionPlanController::approve
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:45
 * @route '/manager/production-plans/{plan}/approve'
 */
    const approveForm = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Manager\ProductionPlanController::approve
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:45
 * @route '/manager/production-plans/{plan}/approve'
 */
        approveForm.put = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::reject
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:75
 * @route '/manager/production-plans/{plan}/reject'
 */
export const reject = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: reject.url(args, options),
    method: 'put',
})

reject.definition = {
    methods: ["put"],
    url: '/manager/production-plans/{plan}/reject',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::reject
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:75
 * @route '/manager/production-plans/{plan}/reject'
 */
reject.url = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { plan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { plan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    plan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        plan: typeof args.plan === 'object'
                ? args.plan.id
                : args.plan,
                }

    return reject.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Manager\ProductionPlanController::reject
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:75
 * @route '/manager/production-plans/{plan}/reject'
 */
reject.put = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: reject.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Manager\ProductionPlanController::reject
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:75
 * @route '/manager/production-plans/{plan}/reject'
 */
    const rejectForm = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Manager\ProductionPlanController::reject
 * @see app/Http/Controllers/Manager/ProductionPlanController.php:75
 * @route '/manager/production-plans/{plan}/reject'
 */
        rejectForm.put = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    reject.form = rejectForm
const productionPlans = {
    index: Object.assign(index, index),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default productionPlans