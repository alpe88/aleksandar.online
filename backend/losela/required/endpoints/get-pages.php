<?php 

function custom_page_endpoint() {
    register_rest_route('portfolio-api/v1', '/pages', array(
        'methods' => 'GET',
        'callback' => 'get_all_pages_data',
    ));
}

function get_all_pages_data($request) {
    // Query all pages
    $args = array(
        'post_type' => 'page', // Specify 'page' post type
        'posts_per_page' => -1, // Retrieve all pages
    );

    $pages = get_posts($args);

    // Return the pages as needed
    return $pages;
}

add_action('rest_api_init', 'custom_page_endpoint');
