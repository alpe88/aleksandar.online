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

    $pdf_attachment_id = 66;
    $pdf_url = wp_get_attachment_url($pdf_attachment_id);

    return array(
        'tagline' => $tagline,
        'resume_url' => $pdf_url,
    );
}


add_action('rest_api_init', 'site_settings_endpoint');
