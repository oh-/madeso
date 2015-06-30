<?php
/**
 * Front page area 
 *
 * @package _s
 */

if ( ! is_active_sidebar( 'front-page' ) ) {
	return;
}
?>
<p>widget area of front-page</p>
		<?php
		if ( is_front_page() && is_home() ) {
		  // Default homepage
		?>
<div id="secondary" class="widget-area" role="complementary">
	<?php dynamic_sidebar( 'front-page' ); ?>
</div><!-- #secondary -->
		<?php
		
		} elseif ( is_front_page() ) {
		  // static homepage
		} elseif ( is_home() ) {
		  // blog page
		} else {
		  //everything else
		}	
