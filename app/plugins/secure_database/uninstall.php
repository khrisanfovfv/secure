<?php
// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

$option_name = 'wporg_option';

delete_option('sec_db_version');

// for site options in Multisite
//delete_site_option($option_name);

// drop a custom database table
global $wpdb;
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}information_system_administrator");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}administrator");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}department");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}organization");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}document_kind");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}remarks");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}information_system");






