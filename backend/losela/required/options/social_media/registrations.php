<?php

function register_social_media_settings() {
    register_setting('social_media_options', 'social_media_handles');
    add_settings_section('social_media_section', 'Social Media Links', 'social_media_section_callback', 'social-media-options');
    add_settings_field('linkedin', 'LinkedIn', 'linkedin_callback', 'social-media-options', 'social_media_section');
    add_settings_field('github', 'GitHub', 'github_callback', 'social-media-options', 'social_media_section');
    add_settings_field('email', 'Email', 'email_callback', 'social-media-options', 'social_media_section');
    add_settings_field('instagram', 'Instagram', 'instagram_callback', 'social-media-options', 'social_media_section');
}
add_action('admin_init', 'register_social_media_settings');

function save_social_media_settings() {
    $PRESSED_SUBMIT_BUTTON = isset($_POST['submit_button']);
    $HAS_SOCIAL_MEDIA_HANDLES = isset($_POST['social_media_handles']);
    
    if ($PRESSED_SUBMIT_BUTTON && $HAS_SOCIAL_MEDIA_HANDLES) {
        if (!isset($_POST['social_media_options_nonce_field']) || !wp_verify_nonce($_POST['social_media_options_nonce_field'], 'social_media_options_nonce')) {
            return;
        }        

        $options = get_option('social_media_handles');
        
        // LinkedIn
        $options['linkedin']['handle'] = sanitize_text_field($_POST['linkedin_handle']);
        $options['linkedin']['url'] = sanitize_text_field($_POST['linkedin_url']);
        
        // GitHub
        $options['github']['handle'] = sanitize_text_field($_POST['github_handle']);
        $options['github']['url'] = sanitize_text_field($_POST['github_url']);
        
        // Email
        $options['email']['handle'] = sanitize_text_field($_POST['email_handle']);
        $options['email']['url'] = sanitize_text_field($_POST['email_url']);
        
        // Instagram
        $options['instagram']['handle'] = sanitize_text_field($_POST['instagram_handle']);
        $options['instagram']['url'] = sanitize_text_field($_POST['instagram_url']);
        
        update_option('social_media_handles', $options);
    }
}


add_action('admin_post_save_social_media_settings', 'save_social_media_settings');

function social_media_options_page() {
    ?>
    <div class="wrap">
        <h2>Social Media Links</h2>
        <form method="post" action="options.php">
            <?php
            settings_fields('social_media_options');
            do_settings_sections('social-media-options');
            wp_nonce_field('social_media_options_nonce', 'social_media_options_nonce_field');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

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
