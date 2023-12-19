<?php

/**
 * Header template.
 * 
 * package Secure
 */


?>

<!DOCTYPE html>
<html lang="<?php language_attributes() ?>">

<head>
    <meta charset="<?php bloginfo('charset') ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head() ?>
</head>

<body>
    <div class="wrapper">
        <!-- Шапка сайта -->
        <header class="header">
            <div class="logo">    
                <a href="<?php echo home_url() ?>">
                    <img src="<?php echo get_template_directory_uri() . '/images/logo.png' ?>" alt="Логотип" class="logo__img">
                </a>          
                
            </div>
            <!-- Основное меню -->
            <!-- Меню сайта -->
            <div class="main_menu">
                <ul class="main_menu__list">
                    <li class="main_menu__item" id="main_menu__reports">Отчеты</li>
                    <li class="main_menu__item" id="main_menu__settings">Настройки</li>
                    <li class="main_menu__item" id="main_menu__references">Справочники</li>
                    <li class="main_menu__item" id="main_menu__help">Помощь</li>
                </ul>
                <!-- Подменю Справочники -->
                <div class="submenu" id="sm_references">
                    <ul class="submenu__list">
                        <li class="submenu__item"><a class="submenu__link" href="sm_references__information_system" id="information_system_link">Информационные системы</a></li>
                        <li class="submenu__item"><a class="submenu__link" href="sm_references__administrators">Администраторы</a></li>
                        <li class="submenu__item"><a class="submenu__link" href="sm_references__organizations">Организации</a></li>
                        <li class="submenu__item"><a class="submenu__link" href="sm_references__departments">Отделы</a>
                        </li>
                        <li class="submenu__item"><a class="submenu__link" href="sm_references__document_kind">Виды
                                документов</a></li>
                        <li class="submenu__item"><a class="submenu__link" href="sm_references__contract">Контракты</a>
                        </li>
                        <li class="submenu__item"><a class="submenu__link" href="sm_references__employeers">Сотрудники</a>
                        </li>
                        <li class="submenu__item"><a class="submenu__link" href="sm_references__documents">Документы</a>
                        </li>
                    </ul>
                </div>
                <!-- Подменю Помощ -->
                <div class="submenu" id="sm_help">
                    <ul class="submenu__list">
                        <li class="submenu__item"><a class="submenu__link" href="sm_help__help">Справка</a></li>
                        <li class="submenu__item"><a class="submenu__link" href="sm_help__about">О программе</a></li>
                    </ul>
                </div>
            </div> <!-- Main menu -->
            <div class="search">
                <img class="search__img" src="<?php echo get_template_directory_uri() . '/images/search.svg' ?>">
                <input class="search__text" type="text" placeholder="Найти" id="search__text">
                <p class="search__delimiter">|</p>
                <button class="search__button" id="search_button">Расширенный поиск</button>
            </div>
            <!-- Пользователь -->
            <div class="user">
                <img class="user__img" src="<?php echo get_template_directory_uri() . '/images/user.png' ?>" alt="Пользователь">
                <p class="user__text">Иванова И.И.</p>
            </div>
        </header>