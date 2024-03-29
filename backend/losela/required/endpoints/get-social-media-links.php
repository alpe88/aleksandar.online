<?php

function get_social_media_links() {
    $social_media_handles = get_option('social_media_handles');
    if (empty($social_media_handles)) {
        return array();
    }

    return array_filter($social_media_handles, function ($item) {
        return !empty($item['handle']);
    });
}

function get_social_media_links_endpoint() {
    try {
        $social_media_links = get_social_media_links();
        return rest_ensure_response($social_media_links);
    } catch (Exception $e) {
        $error_message = $e->getMessage();
        return new WP_Error('social_media_error', $error_message, array('status' => 500));
    }
}



add_action('rest_api_init', function () {
    register_rest_route(ENDPOINT_DOMAIN, '/social-media-links', array(
        'methods' => 'GET',
        'callback' => 'get_social_media_links_endpoint',
    ));
});
