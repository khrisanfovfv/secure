<?php

/**
 * @package Secure_database
 */
/*
Plugin Name: Secure database
Description: Рабоает с пользовательскими таблицами базы данных
Version: 1.0.0
Requires at least: 5.8
Requires PHP: 5.6.20
Author: Naimova D.A
License: GPLv2 or later
Text Domain: secure_database
*/

if (!function_exists('add_action')) {
    exit;
}



class SecDb
{
    function __construct()
    {
        // Таблица Виды документов 
        register_activation_hook(__FILE__, array($this, 'document_kind_table_install'));
        register_activation_hook(__FILE__, array($this, 'document_kind_table_install_data'));
        //add_action( 'plugins_loaded', array($this, 'myplugin_update_db_check'));
    }

    /**
     * Создание таблицы виды документов
     */
    function document_kind_table_install()
    {
        global $wpdb;
        global $sec_db_version;
        $table_name = $wpdb->prefix . 'document_kind';
        $charset_collate = $wpdb->get_charset_collate();


        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name tinytext NOT NULL,
            state varchar(14) DEFAULT 'Действующая' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        add_option('sec_db_version', $sec_db_version);
    }

    /**
     * Заполнение данными таблицы Виды локументов
     *
     * @return void
     */
    function document_kind_table_install_data()
    {
        global $wpdb;

        $document_kinds = array(
            'технический паспорт ИС',
            'акт классификации ИС',
            'акт категорирования ИС',
            'модель угроз ИС',
            'техническое задание',
            'проектная документация',
            'эксплуатационная документация',
            'организационно-распорядительные документы',
            'результаты анализа уязвимостей',
            'результаты  приемочных испытаний системы',
            'ПМИ аттестационных испытаний',
            'Заключение по аттестации',
            'Протокол по аттестации',
            'Аттестат ИС',
        );

        $table_name = $wpdb->prefix . 'document_kind';
        foreach ($document_kinds as &$value) {
            $wpdb->insert(
                $table_name,
                array(
                    'name' => $value,
                    'state' => 'Действующая',
                )
            );
        }
    }
/*
    function update_db_check() {
        global $wpdb;
        $installed_ver = get_option( "jal_db_version" );
        if ( $installed_ver != $sec_db_version ) {
            $table_name = $wpdb->prefix . 'document_kind';
            $sql = "CREATE TABLE $table_name (
                id mediumint(9) NOT NULL AUTO_INCREMENT,
                name tinytext NOT NULL,
                state varchar(14) DEFAULT 'Действующая' NOT NULL,
                PRIMARY KEY  (id)
            );";    

            require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
            dbDelta( $sql );

            update_option( "jal_db_version", $sec_db_version );
        }
    }*/

}

if (class_exists('SecDb')) {
    new SecDb();
}
