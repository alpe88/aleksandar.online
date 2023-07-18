<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	 die;
}
# Register Custom Post Type for Projects
function custom_post_type() {

	$labels = array(
		'name'                  => __( 'Projects', 'Post Type General Name', 'ao' ),
		'singular_name'         => __( 'Project', 'Post Type Singular Name', 'ao' ),
		'menu_name'             => __( 'Projects', 'ao' ),
		'name_admin_bar'        => __( 'Projects', 'ao' ),
		'archives'              => __( 'Project Archives', 'ao' ),
		'attributes'            => __( 'Project Information', 'ao' ),
		'parent_item_colon'     => __( 'Parent Item:', 'ao' ),
		'all_items'             => __( 'All Projects', 'ao' ),
		'add_new_item'          => __( 'Add New Project', 'ao' ),
		'add_new'               => __( 'Add New', 'ao' ),
		'new_item'              => __( 'New Project', 'ao' ),
		'edit_item'             => __( 'Edit Project', 'ao' ),
		'update_item'           => __( 'Update Project', 'ao' ),
		'view_item'             => __( 'View Project', 'ao' ),
		'view_items'            => __( 'View Projects', 'ao' ),
		'search_items'          => __( 'Search Projects', 'ao' ),
		'not_found'             => __( 'Projects Not found', 'ao' ),
		'not_found_in_trash'    => __( 'Projects Not found in Trash', 'ao' ),
		'featured_image'        => __( 'Featured Image', 'ao' ),
		'set_featured_image'    => __( 'Set featured image', 'ao' ),
		'remove_featured_image' => __( 'Remove featured image', 'ao' ),
		'use_featured_image'    => __( 'Use as featured image', 'ao' ),
		'insert_into_item'      => __( 'Insert into Project', 'ao' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Project', 'ao' ),
		'items_list'            => __( 'Projects list', 'ao' ),
		'items_list_navigation' => __( 'Projects list navigation', 'ao' ),
		'filter_items_list'     => __( 'Filter Projects list', 'ao' ),
	);
	$args = array(
		'label'                 => __( 'Projects', 'ao' ),
		'description'           => __( 'For projects', 'ao' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes', 'custom-fields' ),
		'taxonomies'          => array( 'projects' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'menu_icon'             => 'dashicons-portfolio',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
		'publicly_queryable'    => true,
		'query_var'             => true,
	);

	register_post_type( 'projects', $args );
}
add_action( 'init', 'custom_post_type', 0 );
?>
<?php 

 function add_project_fields_meta_box() {
	add_meta_box(
		'project_fields_meta_box', // $id
		'Project Information', // $title
		'show_project_fields_meta_box', // $callback
		'projects', // $screen
		'normal', // $context
		'high' // $priority
	);
}
add_action( 'add_meta_boxes', 'add_project_fields_meta_box' );

/* Projects Callback Function refrenced above */
function show_project_fields_meta_box() {
	global $post;  
		$meta = get_post_meta( $post->ID, 'project_fields', true ); ?>

		<input type="hidden" name="projects_meta_box_nonce" value="<?php echo wp_create_nonce( basename(__FILE__) ); ?>">

		<!-- All fields will go here -->
		<p>
			<label for="project_fields[url]">Url</label>
			<br>
			<input type="text" name="project_fields[url]" id="project_fields[url]" class="regular-text" value="<?php if (is_array($meta) && isset($meta['url'])) {	echo $meta['url']; } ?>">
		</p>
		<p>
			<label for="project_fields[url]">Github</label>
			<br>
			<input type="text" name="project_fields[github]" id="project_fields[github]" class="regular-text" value="<?php if (is_array($meta) && isset($meta['github'])) {	echo $meta['github']; } ?>">
		</p>
		<p>
			<label for="project_fields[highlight]">Project Highlight</label>
			<br>
			<textarea name="project_fields[highlight]" id="project_fields[highlight]" rows="5" cols="30" style="width:500px;"><?php echo $meta['highlight']; ?></textarea>
		</p>

<?php }

/* Save meta to database */
function save_project_fields_meta( $post_id ) {   
	// verify nonce
	if ( !wp_verify_nonce( $_POST['projects_meta_box_nonce'], basename(__FILE__) ) ) {
		return $post_id; 
	}
	// check autosave
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return $post_id;
	}
// check permissions
	if (isset($_POST['post_type'])) { //Fix 2
        if ( 'page' === $_POST['post_type'] ) {
            if ( !current_user_can( 'edit_page', $post_id ) ) {
                return $post_id;
            } elseif ( !current_user_can( 'edit_post', $post_id ) ) {
                return $post_id;
            }  
        }
    }
	
	$old = get_post_meta( $post_id, 'project_fields', true );
		if (isset($_POST['project_fields'])) { //Fix 3
			$new = $_POST['project_fields'];
			if ( $new && $new !== $old ) {
				update_post_meta( $post_id, 'project_fields', $new );
			} elseif ( '' === $new && $old ) {
				delete_post_meta( $post_id, 'project_fields', $old );
			}
		}
}
add_action( 'save_post', 'save_project_fields_meta' );

add_action( 'rest_api_init', 'add_custom_fields' );

add_action( 'rest_api_init', 'create_api_posts_meta_field_for_projects_featured_image' );

function create_api_posts_meta_field_for_projects_featured_image() {
  register_rest_field( 'projects', 'additional_fields', array(
         'get_callback'    => 'get_post_meta_for_api',
         'schema'          => null,
      )
  );
}

add_action( 'rest_api_init', 'create_api_posts_meta_field_for_pages_featured_image' );

function create_api_posts_meta_field_for_pages_featured_image() {
  register_rest_field( 'page', 'additional_fields', array(
         'get_callback'    => 'get_post_meta_for_api',
         'schema'          => null,
      )
  );
}



//Use the post ID to query the image and add it to your payload
function get_post_meta_for_api( $object ) {
  $post_id = $object['id'];
  $post_meta = get_post_meta( $post_id );
  $post_image = get_post_thumbnail_id( $post_id );      
  $post_meta["featured_image_src"] = wp_get_attachment_image_src($post_image, 'full')[0];
  $post_meta["featured_image_alt"] = $alt = get_post_meta($post_image, '_wp_attachment_image_alt', true);

  return $post_meta;
}