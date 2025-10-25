import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::post
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
export const post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

post.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::post
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
post.url = (options?: RouteQueryOptions) => {
    return post.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::post
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
post.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AuthController::post
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
    const postForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: post.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AuthController::post
 * @see app/Http/Controllers/AuthController.php:29
 * @route '/login'
 */
        postForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: post.url(options),
            method: 'post',
        })
    
    post.form = postForm
const login = {
    post: Object.assign(post, post),
}

export default login