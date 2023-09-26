<?php 

// Register custom endpoint for site settings
function site_settings_endpoint() {
    register_rest_route('portfolio-api/v1', '/site-settings', array(
        'methods' => 'GET',
        'callback' => 'get_site_settings',
    ));
}

function get_site_settings() {
    $tagline = get_bloginfo('description');

    // Return site settings as needed
    return array(
        'tagline' => $tagline,
        // Add more settings here if needed
    );
}

add_action('rest_api_init', 'site_settings_endpoint');
