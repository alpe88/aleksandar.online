<?php
function custom_resources_post_type()
{
    $labels = array(
        'name'               => __('Resources', 'ao'),
        'singular_name'      => __('Resource', 'ao'),
        'menu_name'          => __('Resources', 'ao'),
        'name_admin_bar'     => __('Resource', 'ao'),
        'add_new'            => __('Add New', 'ao'),
        'add_new_item'       => __('Add New Resource', 'ao'),
        'new_item'           => __('New Resource', 'ao'),
        'edit_item'          => __('Edit Resource', 'ao'),
        'view_item'          => __('View Resource', 'ao'),
        'all_items'          => __('All Resources', 'ao'),
        'search_items'       => __('Search Resources', 'ao'),
        'parent_item_colon'  => __('Parent Resources:', 'ao'),
        'not_found'          => __('No resources found.', 'ao'),
        'not_found_in_trash' => __('No resources found in Trash.', 'ao')
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'resources'),
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'supports'           => array('title', 'editor', 'thumbnail'),
        'rest_base'          => 'resources',
        'menu_icon'          => 'dashicons-book',
        'taxonomies'            => array('post_tag', 'category'),
    );

    register_post_type('resources', $args);
}

add_action('init', 'custom_resources_post_type');
