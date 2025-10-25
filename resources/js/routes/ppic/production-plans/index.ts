import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::index
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:14
 * @route '/ppic/production-plans'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ppic/production-plans',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::index
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:14
 * @route '/ppic/production-plans'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::index
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:14
 * @route '/ppic/production-plans'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::index
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:14
 * @route '/ppic/production-plans'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::index
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:14
 * @route '/ppic/production-plans'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::index
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:14
 * @route '/ppic/production-plans'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::index
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:14
 * @route '/ppic/production-plans'
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
* @see \App\Http\Controllers\PPIC\ProductionPlanController::create
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:42
 * @route '/ppic/production-plans/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/ppic/production-plans/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::create
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:42
 * @route '/ppic/production-plans/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::create
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:42
 * @route '/ppic/production-plans/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::create
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:42
 * @route '/ppic/production-plans/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::create
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:42
 * @route '/ppic/production-plans/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::create
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:42
 * @route '/ppic/production-plans/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::create
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:42
 * @route '/ppic/production-plans/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::store
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:50
 * @route '/ppic/production-plans'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ppic/production-plans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::store
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:50
 * @route '/ppic/production-plans'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::store
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:50
 * @route '/ppic/production-plans'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::store
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:50
 * @route '/ppic/production-plans'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::store
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:50
 * @route '/ppic/production-plans'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::submit
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:63
 * @route '/ppic/production-plans/{plan}/submit'
 */
export const submit = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: submit.url(args, options),
    method: 'put',
})

submit.definition = {
    methods: ["put"],
    url: '/ppic/production-plans/{plan}/submit',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::submit
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:63
 * @route '/ppic/production-plans/{plan}/submit'
 */
submit.url = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return submit.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::submit
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:63
 * @route '/ppic/production-plans/{plan}/submit'
 */
submit.put = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: submit.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::submit
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:63
 * @route '/ppic/production-plans/{plan}/submit'
 */
    const submitForm = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::submit
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:63
 * @route '/ppic/production-plans/{plan}/submit'
 */
        submitForm.put = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::destroy
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:72
 * @route '/ppic/production-plans/{plan}'
 */
export const destroy = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/ppic/production-plans/{plan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::destroy
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:72
 * @route '/ppic/production-plans/{plan}'
 */
destroy.url = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{plan}', parsedArgs.plan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::destroy
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:72
 * @route '/ppic/production-plans/{plan}'
 */
destroy.delete = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::destroy
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:72
 * @route '/ppic/production-plans/{plan}'
 */
    const destroyForm = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PPIC\ProductionPlanController::destroy
 * @see app/Http/Controllers/PPIC/ProductionPlanController.php:72
 * @route '/ppic/production-plans/{plan}'
 */
        destroyForm.delete = (args: { plan: number | { id: number } } | [plan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const productionPlans = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
submit: Object.assign(submit, submit),
destroy: Object.assign(destroy, destroy),
}

export default productionPlans