<?php

function social_media_section_callback() {
  echo 'Enter your social media handles below:';
}

function renderSocialMediaHandle($platform, $platformUrl) {
  $options = get_option('social_media_handles');
  $platformHandle = isset($options[$platform]['handle']) ? esc_attr($options[$platform]['handle']) : '';
  $platformIconUrl = isset($options[$platform]['icon_url']) ? esc_attr($options[$platform]['icon_url']) : '';

  echo '<p>' . $platformUrl . '</p>';

  echo '<input style="width:200px;" type="text" id="' . $platform . '" name="social_media_handles[' . $platform . '][handle]" value="' . $platformHandle . '" />';
  echo '<input type="hidden" id="' . $platform . '_url" name="social_media_handles[' . $platform . '][url]" value="' . $platformUrl . '" />';

  //echo '<input type="button" id="upload-' . $platform . '-icon" class="upload-social-media-icon-button" data-platform="' . $platform . '" value="Upload Icon">';
  echo '<input type="text" id="' . $platform . '_icon_url" name="social_media_handles[' . $platform . '][icon_url]" value="' . $platformIconUrl . '" />';


}

function linkedin_callback() {
  renderSocialMediaHandle('linkedin', LINKEDIN_URL);
}

function github_callback() {
  renderSocialMediaHandle('github', GITHUB_URL);
}

function email_callback() {
  renderSocialMediaHandle('email', EMAIL_URL);
}

function instagram_callback() {
  renderSocialMediaHandle('instagram', INSTAGRAM_URL);
}