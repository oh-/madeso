<?php
/**
 * _s Theme Customizer
 *
 * @package _s
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function _s_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
        /*
	 * header
         */
	$wp_customize->add_section('_s_header', array(
		'title' => __('Header Options', '_s'),
		'description' => __('Text for Theme Call to Action, or main heading', '_s')
	));
	// defautlt header background image
	$_s_header_bg_img_uri = get_stylesheet_directory_uri() . '/img/bgheader.jpg';
	$wp_customize->add_setting('_s_header_bg_image', array(
		'default' => $_s_header_bg_img_uri,
	));
	$wp_customize->add_control(
	       new WP_Customize_Image_Control(
	                  $wp_customize,
	              'logo',
               array(
		       'label'      => __( 'Upload a background image for the header', '_s' ),
               'section'    => '_s_header',
               'settings'   => '_s_header_bg_image',
		   )
		)
	);       

        /*
	 * set various properties of the background image:
	 * 	fit content to width / static size content
	 *	static / fixed
         */
	$wp_customize->add_setting('_s_header_bg_image_settings', array(
		'default' => $_s_header_bg_img_uri,
	));
}
add_action( 'customize_register', '_s_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function _s_customize_preview_js() {
	wp_enqueue_script( '_s_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20130508', true );
}
add_action( 'customize_preview_init', '_s_customize_preview_js' );
