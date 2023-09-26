<?php 

// Register custom endpoint for fetching all posts of a specific post type
function custom_post_type_endpoint() {
    register_rest_route('portfolio-api/v1', '/post-type/(?P<post_type>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_custom_post_types',
    ));
}

function get_custom_post_types($request) {
    $post_type = $request->get_param('post_type');

    // Check if the post type exists
    if (!post_type_exists($post_type)) {
        return new WP_Error('post_type_not_found', 'Custom post type not found', array('status' => 404));
    }

    // Query posts of the specified post type
    $args = array(
        'post_type' => $post_type,
        'posts_per_page' => -1, // Retrieve all posts of this type
    );

    $posts = get_posts($args);

    // Return the posts as needed
    return $posts;
}

add_action('rest_api_init', 'custom_post_type_endpoint');

