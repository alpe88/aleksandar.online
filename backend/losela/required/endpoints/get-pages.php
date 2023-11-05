<?php 

function custom_page_endpoints() {
    // Route to get all pages
    register_rest_route(ENDPOINT_DOMAIN, '/pages', array(
        'methods' => 'GET',
        'callback' => 'get_all_pages_data',
    ));

    // Route to get a single page by slug
    register_rest_route(ENDPOINT_DOMAIN, '/page/(?P<slug>[\w-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_single_page_data',
    ));
}

function get_all_pages_data($request) {
    // Query all pages
    $args = array(
        'post_type' => 'page', // Specify 'page' post type
        'posts_per_page' => -1, // Retrieve all pages
    );

    $pages = get_posts($args);

    // Wrap the pages in an object with the post type as the key
    $result = array(
        'pages' => $pages,
    );

    // Return the result object
    return $result;
}

function get_single_page_data($request) {
    // Get the slug from the request
    $slug = $request->get_param('slug');

    // Query the page by slug
    $args = array(
        'name' => $slug,
        'post_type' => 'page',
        'posts_per_page' => 1, // Retrieve a single page
    );

    $page = get_posts($args);

    if (empty($page)) {
        return new WP_Error('page_not_found', 'Page not found', array('status' => 404));
    }

    // Wrap the page data in an object
    $result = array(
        'page' => $page[0], // Use the first (and only) item in the array
    );

    // Return the result object
    return $result;
}



add_action('rest_api_init', 'custom_page_endpoints');
