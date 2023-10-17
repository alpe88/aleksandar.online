<?php

// Add Metabox for Resource URL
function add_resource_url_metabox() {
    add_meta_box(
        'resource_url_metabox',
        'Resource URL',
        'render_resource_url_metabox',
        'resources',
        'normal',
        'high'
    );
}

add_action( 'add_meta_boxes', 'add_resource_url_metabox' );

// Render Metabox Content
function render_resource_url_metabox( $post ) {
    // Retrieve existing URL from the database
    $resource_url = get_post_meta( $post->ID, 'resource_url', true );

    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'resource_url_metabox_nonce');

    // Output the URL field
    ?>
    <label for="resource_url">Resource URL:</label>
    <input type="text" name="resource_url" id="resource_url" value="<?php echo esc_url( $resource_url ); ?>" style="width: 100%;">
    <?php
}

// Save Metabox Data
function save_resource_url_metabox( $post_id ) {
    // Verify nonce to ensure request authenticity
    if (!isset($_POST['resource_url_metabox_nonce']) || !wp_verify_nonce($_POST['resource_url_metabox_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's an autosave to avoid unnecessary updates
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return $post_id;
    }

    // Verify user permissions to ensure access control
    if (!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }

    // Sanitize and update the resource URL
    if ( isset( $_POST['resource_url'] ) ) {
        $sanitizedResourceURL = esc_url( $_POST['resource_url'] );

        try {
            update_post_meta( $post_id, 'resource_url', $sanitizedResourceURL );
        } catch (Exception $e) {
            // Handle any errors that might occur during saving
            error_log($e->getMessage());
        }
    }
}

add_action( 'save_post', 'save_resource_url_metabox' );