<?php 
// In your theme's functions.php or plugin file
function register_social_media_options_page() {
    add_menu_page(
        'Social Media Links',
        'Social Media',
        'manage_options',
        'social-media-options',
        'social_media_options_page'
    );
}
add_action('admin_menu', 'register_social_media_options_page');

function social_media_options_page() {
    ?>
    <div class="wrap">
        <h2>Social Media Links</h2>
        <form method="post" action="options.php">
            <?php
            settings_fields('social_media_options');
            do_settings_sections('social-media-options');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

function register_social_media_settings() {
    register_setting('social_media_options', 'social_media_handles');
    add_settings_section('social_media_section', 'Social Media Links', 'social_media_section_callback', 'social-media-options');
    add_settings_field('linkedin', 'LinkedIn', 'linkedin_callback', 'social-media-options', 'social_media_section');
    add_settings_field('github', 'GitHub', 'github_callback', 'social-media-options', 'social_media_section');
    add_settings_field('email', 'Email', 'email_callback', 'social-media-options', 'social_media_section');
}

function social_media_section_callback() {
    echo 'Enter your social media handles below:';
}

function instagram_callback() {
    $options = get_option('social_media_handles');
    echo '<input type="text" id="linkedin" name="social_media_handles[linkedin]" value="' . esc_attr($options['linkedin']) . '"/>';
}

function github_callback() {
    $options = get_option('social_media_handles');
    echo '<input type="text" id="github" name="social_media_handles[github]" value="' . esc_attr($options['github']) . '"/>';
}

function email_callback() {
    $options = get_option('social_media_handles');
    echo '<input type="text" id="email" name="social_media_handles[email]" value="' . esc_attr($options['email']) . '"/>';
}

add_action('admin_init', 'register_social_media_settings');
