import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AuthController::login
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:53
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:53
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:53
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:53
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AuthController::logout
 * @see app/Http/Controllers/AuthController.php:53
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \App\Http\Controllers\AuthController::showLogin
 * @see app/Http/Controllers/AuthController.php:15
 * @route '/'
 */
export const showLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})

showLogin.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::showLogin
 * @see app/Http/Controllers/AuthController.php:15
 * @route '/'
 */
showLogin.url = (options?: RouteQueryOptions) => {
    return showLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::showLogin
 * @see app/Http/Controllers/AuthController.php:15
 * @route '/'
 */
showLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AuthController::showLogin
 * @see app/Http/Controllers/AuthController.php:15
 * @route '/'
 */
showLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AuthController::showLogin
 * @see app/Http/Controllers/AuthController.php:15
 * @route '/'
 */
    const showLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showLogin.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AuthController::showLogin
 * @see app/Http/Controllers/AuthController.php:15
 * @route '/'
 */
        showLoginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLogin.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AuthController::showLogin
 * @see app/Http/Controllers/AuthController.php:15
 * @route '/'
 */
        showLoginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLogin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showLogin.form = showLoginForm
const AuthController = { login, logout, showLogin }

export default AuthController