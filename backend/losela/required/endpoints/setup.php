<?php

// Disable some endpoints for unauthenticated users
add_filter( 'rest_endpoints', 'disable_default_endpoints' );
function disable_default_endpoints( $endpoints ) {
    $endpoints_to_remove = array(
        '/oembed/1.0',
        '/wp/v2',
        '/wp/v2/media',
        '/wp/v2/types',
        '/wp/v2/statuses',
        '/wp/v2/taxonomies',
        '/wp/v2/tags',
        '/wp/v2/users',
        '/wp/v2/comments',
        '/wp/v2/settings',
        '/wp/v2/themes',
        '/wp/v2/blocks',
        '/wp/v2/oembed',
        '/wp/v2/posts',
        '/wp/v2/pages',
        '/wp/v2/block-renderer',
        '/wp/v2/search',
        '/wp/v2/categories'
    );

    if ( ! is_user_logged_in() ) {
        foreach ( $endpoints_to_remove as $rem_endpoint ) {
            // $base_endpoint = "/wp/v2/{$rem_endpoint}";
            foreach ( $endpoints as $maybe_endpoint => $object ) {
                if ( stripos( $maybe_endpoint, $rem_endpoint ) !== false ) {
                    unset( $endpoints[ $maybe_endpoint ] );
                }
            }
        }
    }
    return $endpoints;
}

/**
 * Register custom endpoints so it will be cached.
 */
function register_custom_endpoints_for_cache( $allowed_endpoints ) {
    $custom_endpoints = [
      'post-type','pages', 'page', 'site-settings', 'social-media-links'
    ];
  
    foreach ( $custom_endpoints as $endpoint ) {
      if ( ! isset( $allowed_endpoints[ ENDPOINT_DOMAIN ] ) || ! in_array( $endpoint, $allowed_endpoints[ ENDPOINT_DOMAIN ] ) ) {
        $allowed_endpoints[ ENDPOINT_DOMAIN ][] = $endpoint;
      }
    }
  
    return $allowed_endpoints;
  }
  add_filter( 'wp_rest_cache/allowed_endpoints', 'register_custom_endpoints_for_cache', 10, 1);