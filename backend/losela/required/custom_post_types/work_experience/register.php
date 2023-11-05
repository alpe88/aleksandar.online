<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	 die;
}
# Register Custom Post Type for work_experiences
function custom_work_experience_post_type() {

    $labels = array(
        'name'                  => __( 'Work Experience', 'Post Type General Name', 'ao' ),
        'singular_name'         => __( 'Work Experience', 'Post Type Singular Name', 'ao' ),
        'menu_name'             => __( 'Work Experience', 'ao' ),
        'name_admin_bar'        => __( 'Work Experience', 'ao' ),
        'archives'              => __( 'Work Experience Archives', 'ao' ),
        'attributes'            => __( 'Work Experience Information', 'ao' ),
        'parent_item_colon'     => __( 'Parent Item:', 'ao' ),
        'all_items'             => __( 'All Work Experiences', 'ao' ),
        'add_new_item'          => __( 'Add New Work Experience', 'ao' ),
        'add_new'               => __( 'Add New', 'ao' ),
        'new_item'              => __( 'New Work Experience', 'ao' ),
        'edit_item'             => __( 'Edit Work Experience', 'ao' ),
        'update_item'           => __( 'Update Work Experience', 'ao' ),
        'view_item'             => __( 'View Work Experience', 'ao' ),
        'view_items'            => __( 'View Work Experiences', 'ao' ),
        'search_items'          => __( 'Search Work Experiences', 'ao' ),
        'not_found'             => __( 'Work Experiences Not found', 'ao' ),
        'not_found_in_trash'    => __( 'Work Experiences Not found in Trash', 'ao' ),
        'featured_image'        => __( 'Featured Image', 'ao' ),
        'set_featured_image'    => __( 'Set featured image', 'ao' ),
        'remove_featured_image' => __( 'Remove featured image', 'ao' ),
        'use_featured_image'    => __( 'Use as featured image', 'ao' ),
        'insert_into_item'      => __( 'Insert into Work Experience', 'ao' ),
        'uploaded_to_this_item' => __( 'Uploaded to this Work Experience', 'ao' ),
        'items_list'            => __( 'Work Experiences list', 'ao' ),
        'items_list_navigation' => __( 'Work Experiences list navigation', 'ao' ),
        'filter_items_list'     => __( 'Filter Work Experiences list', 'ao' ),
    );

    $args = array(
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
        'taxonomies'            => array( 'post_tag' ),
        'hierarchical'          => false,
        'has_archive'           => false,
        'public'                => true,
        'publicly_queryable'    => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 20,
        'menu_icon'             => 'dashicons-portfolio',
        'show_in_admin_bar'     => true,
        'can_export'            => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'query_var'             => true,
        'rewrite' => array('slug' => 'work-experience'),
    );

    register_post_type( 'work-experience', $args );
}

add_action( 'init', 'custom_work_experience_post_type', 0 );


function custom_work_experience_taxonomy() {
    $labels = array(
        'name'              => _x('Categories', 'taxonomy general name', 'ao'),
        'singular_name'     => _x('Category', 'taxonomy singular name', 'ao'),
        'search_items'      => __('Search Categories', 'ao'),
        'all_items'         => __('All Categories', 'ao'),
        'edit_item'         => __('Edit Category', 'ao'),
        'update_item'       => __('Update Category', 'ao'),
        'add_new_item'      => __('Add New Category', 'ao'),
        'new_item_name'     => __('New Category Name', 'ao'),
        'menu_name'         => __('Categories', 'ao'),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'work-experience-category'),
    );

    register_taxonomy('work-experience-category', 'work-experience', $args);
}

add_action('init', 'custom_work_experience_taxonomy');
