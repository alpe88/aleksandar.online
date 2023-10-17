<?php
// Add the custom metabox for Work Experience
function add_work_experience_metabox() {
    add_meta_box(
        'work_experience_metabox',
        'Work Experience Details',
        'render_work_experience_metabox',
        'work_experience',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_work_experience_metabox');

// Render the content of the custom metabox
function render_work_experience_metabox($post) {
    // Retrieve existing values from the database
    $job_title = get_post_meta($post->ID, 'job_title', true);
    $company_name = get_post_meta($post->ID, 'company_name', true);
    $start_date = get_post_meta($post->ID, 'start_date', true);
    $end_date = get_post_meta($post->ID, 'end_date', true);
    $current_job = get_post_meta($post->ID, 'current_job', true);
    $location = get_post_meta($post->ID, 'location', true);
    $work_type = get_post_meta($post->ID, 'work_type', true);
    $project_highlight = get_post_meta($post->ID, 'project_highlight', true);
    $web_address = get_post_meta($post->ID, 'web_address', true);
    $code_repository_url = get_post_meta($post->ID, 'code_repository_url', true);
	$private_repo = get_post_meta($post->ID, 'private_repo', true);
	$is_hidden = get_post_meta($post->ID, 'is_hidden', true);
    
    // Use nonce for verification
    wp_nonce_field(basename(__FILE__), 'work_experience_metabox_nonce');
    
    // Output the HTML fields for the metabox
    ?>
    <label for="job_title">Job Title:</label>
    <input type="text" name="job_title" id="job_title" value="<?php echo esc_attr($job_title); ?>"><br><br>
    
    <label for="company_name">Company Name:</label>
    <input type="text" name="company_name" id="company_name" value="<?php echo esc_attr($company_name); ?>"><br><br>
    
    <label for="start_date">Start Date:</label>
    <input type="text" name="start_date" id="start_date" value="<?php echo esc_attr($start_date); ?>"><br><br>
    
    <label for="end_date">End Date:</label>
    <input type="text" name="end_date" id="end_date" value="<?php echo esc_attr($end_date); ?>"><br><br>
    
    <label for="current_job">Is Current Job:</label>
    <input type="checkbox" name="current_job" id="current_job" value="1" <?php checked($current_job, 1); ?>><br><br>
    
    <label for="location">Location:</label>
    <input type="text" name="location" id="location" value="<?php echo esc_attr($location); ?>"><br><br>
    
    <label for="work_type">Work Type:</label>
    <select name="work_type" id="work_type">
        <option value="Remote" <?php selected($work_type, 'Remote'); ?>>Remote</option>
        <option value="Hybrid" <?php selected($work_type, 'Hybrid'); ?>>Hybrid</option>
        <option value="In-Office" <?php selected($work_type, 'In-Office'); ?>>In-Office</option>
    </select><br><br>
    
    <label for="project_highlight">Project Highlight:</label>
    <textarea name="project_highlight" id="project_highlight" rows="4"><?php echo esc_textarea($project_highlight); ?></textarea><br><br>
    
    <label for="web_address">Web Address:</label>
    <input type="text" name="web_address" id="web_address" value="<?php echo esc_url($web_address); ?>"><br><br>
    
    <label for="code_repository_url">Code Repository URL:</label>
    <input type="text" name="code_repository_url" id="code_repository_url" value="<?php echo esc_url($code_repository_url); ?>"><br><br>
    
	<label for="private_repo">Private Repo:</label>
    <input type="checkbox" name="private_repo" id="private_repo" value="1" <?php checked($private_repo, 1); ?>><br><br>

	<label for="is_hidden">Hidden:</label>
    <input type="checkbox" name="is_hidden" id="is_hidden" value="1" <?php checked($is_hidden, 1); ?>><br><br>
    
    <?php
}

// Save data when the post is saved
function save_work_experience_metabox($post_id) {
    // Verify nonce to ensure request authenticity
    if (!isset($_POST['work_experience_metabox_nonce']) || !wp_verify_nonce($_POST['work_experience_metabox_nonce'], basename(__FILE__))) {
        return $post_id;
    }

    // Check if it's an autosave to avoid unnecessary updates
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $post_id;
    }

    // Verify user permissions to ensure access control
    if (!current_user_can('edit_post', $post_id)) {
        return $post_id;
    }

    // Sanitize and update or delete work experience fields
    $fields = array(
        'job_title',
        'company_name',
        'start_date',
        'end_date',
        'current_job',
        'location',
        'work_type',
        'project_highlight',
        'web_address',
        'code_repository_url',
        'private_repo',
    );

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            $sanitizedValue = sanitize_text_field($_POST[$field]);
            try {
                update_post_meta($post_id, $field, $sanitizedValue);
            } catch (Exception $e) {
                // Handle any errors during update
                error_log($e->getMessage());
            }
        } else {
            delete_post_meta($post_id, $field);
        }
    }
}

add_action('save_post', 'save_work_experience_metabox');
