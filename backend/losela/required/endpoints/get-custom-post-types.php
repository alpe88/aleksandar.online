<?php 

// Register custom endpoint for fetching all posts of a specific post type
function custom_post_type_endpoint() {
    register_rest_route('portfolio-api/v1', '/post-type/(?P<post_type>[a-zA-Z0-9_-]+)', array(
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

    // Initialize an array to store the modified posts
    $modified_posts = array();

    foreach ($posts as $post) {
        // Get the custom field data using get_post_meta
        $custom_fields = get_post_meta($post->ID);
    
        // Add custom field data to the post object
        $post->custom_fields = $custom_fields;
    
        // Get the post's tags
        $tags = get_the_tags($post->ID);
    
        // Initialize an empty array for tag names
        $tagNames = [];
    
        // If there are tags, extract their names
        if ($tags) {
            foreach ($tags as $tag) {
                $tagNames[] = $tag->name;
            }
        }
    
        // Add the tag names to the post object
        $post->tags = $tagNames;
    
        // Add the modified post to the array
        $modified_posts[] = $post;
    }
    

    // Wrap the posts in an object with the post type as the key
    $result = array(
        $post_type => $modified_posts,
    );

    // Return the result object
    return $result;
}


add_action('rest_api_init', 'custom_post_type_endpoint');

