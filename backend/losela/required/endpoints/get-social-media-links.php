<?php

function get_social_media_icon(string $name = '') {
    if ($name === '') {
        return null;
    }

    $social_media_icons = array(
        'linkedin' => 'icon-linkedin-outline.svg',
        'github' => 'icon-github-outline.svg',
        'email' => 'icon-email-outline.svg',
        'instagram' => 'icon-instagram-outline.svg',
    );
    $icon_file_name = $social_media_icons[$name];
    return wp_get_attachment_image_url(get_attachment_id_by_name($icon_file_name), 'full');
}

function process_social_media_handles($social_media_handles) {
    $social_media_links = array();

    // foreach ($social_media_handles as $platform => $url) {
    //     // $icon = get_social_media_icon($platform);

    //     array_push($social_media_links, array(
    //         'platform' => $platform,
    //         'url' => $url,
    //         'handle' => $social_media_handles[$platform],
    //     ));
    // }

    return $social_media_handles;
}

function get_social_media_links() {
    $social_media_handles = get_option('social_media_handles');
    if (empty($social_media_handles)) {
        return array();
    }

    return process_social_media_handles($social_media_handles);
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
    register_rest_route('portfolio-api/v1', '/social-media-links', array(
        'methods' => 'GET',
        'callback' => 'get_social_media_links_endpoint',
    ));
});
