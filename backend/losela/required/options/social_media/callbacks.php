<?php

function social_media_section_callback() {
    $options = get_option('social_media_handles'); var_dump( $options );
    echo 'Enter your social media handles below:';
}

function linkedin_callback() {
    $options = get_option('social_media_handles');
    $linkedin_url = LINKEDIN_URL;
    $linkedin_handle = isset($options['linkedin']['handle']) ? esc_attr($options['linkedin']['handle']) : '';
    
    echo '<p>' . $linkedin_url . '</p>';
    echo '<input style="width:200px;" type="text" id="linkedin" name="social_media_handles[linkedin][handle]" value="' . $linkedin_handle . '" />';

    echo '<input type="hidden" id="linkedin_url" name="social_media_handles[linkedin][url]" value="' . LINKEDIN_URL . '" />';
}

function github_callback() {
    $options = get_option('social_media_handles');
    $github_url = GITHUB_URL;
    $github_handle = isset($options['github']['handle']) ? esc_attr($options['github']['handle']) : '';
    
    echo '<p>' . $github_url . '</p>';
    echo '<input style="width:200px;" type="text" id="github" name="social_media_handles[github][handle]" value="' . $github_handle . '" />';

    echo '<input type="hidden" id="github_url" name="social_media_handles[github][url]" value="' . GITHUB_URL . '" />';
}

function email_callback() {
    $options = get_option('social_media_handles');
    $email_url = EMAIL_URL;
    $email_handle = isset($options['email']['handle']) ? esc_attr($options['email']['handle']) : '';
    
    echo '<p>' . $email_url . '</p>';
    echo '<input style="width:200px;" type="text" id="email" name="social_media_handles[email][handle]" value="' . $email_handle . '" />';

    echo '<input type="hidden" id="email_url" name="social_media_handles[email][url]" value="' . EMAIL_URL . '" />';
}

function instagram_callback() {
    $options = get_option('social_media_handles');
    $instagram_url = INSTAGRAM_URL;
    $instagram_handle = isset($options['instagram']['handle']) ? esc_attr($options['instagram']['handle']) : '';
    
    echo '<p>' . $instagram_url . '</p>';
    echo '<input style="width:200px;" type="text" id="instagram" name="social_media_handles[instagram][handle]" value="' . $instagram_handle . '" />';

    echo '<input type="hidden" id="instagram_url" name="social_media_handles[instagram][url]" value="' . INSTAGRAM_URL . '" />';
}
