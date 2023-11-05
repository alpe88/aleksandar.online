<?php

/*
Theme Name: Losela
Author: Aleksandar Petrovic
Author URI: https://aleksandar.online
Text Domain: ao
Description: This is a theme meant to showcase my portfolio through the incorporation of WP-API and React.
Version: 1.0
*/

define('LINKEDIN_URL', 'https://www.linkedin.com/in/');
define('GITHUB_URL', 'https://www.github.com/');
define('EMAIL_URL', 'mailto:');
define('INSTAGRAM_URL', 'https://www.instagram.com/');
define('ENDPOINT_DOMAIN', 'portfolio-api/v1');


function require_all_files($dir) {
    foreach( glob( "$dir/*" ) as $path ){
        if ( preg_match( '/\.php$/', $path ) ) {
            require_once $path;  // it's a PHP file so just require it
        } elseif ( is_dir( $path ) ) {
            require_all_files( $path );  // it's a subdir, so call the same function for this subdir
        }
    }
}

require_all_files( get_template_directory() . "/required" );
?>