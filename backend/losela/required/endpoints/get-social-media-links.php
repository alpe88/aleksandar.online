<?php

/**
 * @var array<string, string> $social_media_platforms
 */
$social_media_platforms = array(
    'linkedin' => 'linkedin',
    'github' => 'github',
    'email' => 'email'
);

/**
 * @var array<string, string> $social_media_icons
 */
$social_media_icons = array(
    'linkedin' => 'icon-github.svg',
    'github' => 'icon-github.svg',
    'email' => 'icon-github.svg',
);

function get_social_media_icon(string $name = '') {
    if($name === '') {
        return null;
    }

    return wp_get_attachment_image_url(get_attachment_id_by_name($name), 'full');
}

function get_social_media_links() {
    $social_media_handles = get_option('social_media_handles');

    $social_media_links = array();

    /**
     * @var string $linkedin
     */
    $linkedin = $social_media_platforms['linkedin'];

    /**
     * @var string $github
     */
    $github = $social_media_platforms['github'];

    /**
     * @var string $email
     */
    $email = $social_media_platforms['email'];

    // Add LinkedIn
    $has_linkedin = !empty($social_media_handles[$linkedin]);
    if ($has_linkedin) {
        $url = 'https://linkedin.com/in/' . $social_media_handles[$linkedin];
        $icon = get_social_media_icon($linkedin);

        $social_media_links[] = array(
            'platform' => 'LinkedIn',
            'icon' => $icon,
            'url' => $url,
        );
    }

    // Add GitHub
    $has_github = !empty($social_media_handles[$github]);
    if ($has_github) {
        $url = 'https://github.com/' . $social_media_handles[$github];
        $icon = get_social_media_icon($github);
    
        $social_media_links[] = array(
            'platform' => 'GitHub',
            'icon' => $icon,
            'url' => $url,
        );
    }

    // Add Email
    $has_email = !empty($social_media_handles[$email]);
    if ($has_email) {
        $url = 'mailto:' . $social_media_handles[$email];
        $icon = get_social_media_icon($email);
    
        $social_media_links[] = array(
            'platform' => 'Email',
            'icon' => $icon,
            'url' => $url,
        );
    }

    return $social_media_links;
}

function get_social_media_links_endpoint() {
    return rest_ensure_response(get_social_media_links());
}


add_action('rest_api_init', function () {
    register_rest_route('portfolio-api/v1', '/social-media-links', array(
        'methods' => 'GET',
        'callback' => 'get_social_media_links_endpoint',
    ));
});
