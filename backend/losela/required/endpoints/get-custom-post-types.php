<?php

// Register custom endpoint for fetching all posts of a specific post type
function custom_post_type_endpoint()
{
    register_rest_route(ENDPOINT_DOMAIN, '/post-type/(?P<post_type>[a-zA-Z0-9_-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_custom_post_types',
    ));
}

function get_custom_post_types($request)
{
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
    $modified_posts = array();

    foreach ($posts as $post) {
        // Get custom field data
        $custom_fields = get_post_meta($post->ID);
        $post->custom_fields = $custom_fields;

        // Get tags
        $tags = get_the_tags($post->ID);
        $tagNames = array();
        if ($tags) {
            foreach ($tags as $tag) {
                $tagNames[] = $tag->name;
            }
        }
        $post->tags = $tagNames;

        // Get the post's categories
        $categories = get_the_category($post->ID);

        // Collect their nicenames (slugs)
        $categorySlugs = array();
        if ($categories && !is_wp_error($categories)) {
            foreach ($categories as $category) {
                $categorySlugs[] = $category->category_nicename;
            }
        }

        // Also store an array of just the category nicenames (slugs)
        $post->category_nicenames = $categorySlugs;

        $modified_posts[] = $post;
    }

    // Wrap the posts in an object with the post type as the key
    $result = array(
        $post_type => $modified_posts,
    );

    return $result;
}

add_action('rest_api_init', 'custom_post_type_endpoint');
