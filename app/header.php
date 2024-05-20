<?php

/**
 * Header template.
 * 
 * package Secure
 */

$user = wp_get_current_user();
$last_name = $user->last_name;
$firstname = $user->first_name;

if (($last_name == '') && $firstname == ''){
    $display_name = $user->display_name;
} else{
    $nameParts = explode(' ', $firstname);
    $firstLetters = '';
    foreach($nameParts as $part){
        $firstLetters .= mb_substr($part, 0, 1) . '.';
    }
    $display_name = $last_name . ' ' . $firstLetters;
}

// Получаем аватар пользователя
$file_name = get_user_meta($user->ID,'avatar_path',true);
if ($file_name != ''){
    $avatar_path = get_template_directory_uri().'/storage/avatars/' . $file_name; 
} else{
    $avatar_path = get_template_directory_uri().'/images/avatar-default.svg';
}

// Определяем является ли пользователь администратором
$is_admin = false;
foreach($user->roles as $role){
    if($role == 'administrator'){
        $is_admin = true;
        break;
    }
}

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
                    <!-- Отображаем пункт меню только если пользователь имеет права администратора -->
                    <?php if ($is_admin){ ?>
                        <li class="main_menu__item" id="main_menu__settings">Настройки</li>
                    <?php } ?>
                    <li class="main_menu__item" id="main_menu__references">Справочники</li>
                    <li class="main_menu__item" id="main_menu__help">Помощь</li>
                </ul>
                <!-- Подменю Справочники -->
                <div class="submenu" id="sm_reports">
                    <ul class="submenu__list">
                        <li class="submenu__item"><a class="submenu__link" href="sm_reports__expiring_is">Системы с истекающим аттестатом</a></li>
                    </ul>
                </div>
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
                        <!-- Отображаем пункт меню только если пользователь имеет права администратора -->
                        <?php if ($is_admin){ ?>
                            <li class="submenu__item"><a class="submenu__link" href="sm_references__employees">Сотрудники</a>
                        </li>
                        <?php
                            }
                        ?>
                        
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
                <img class="user__img" src="<?php echo $avatar_path ?>" alt="Пользователь">
                <p class="user__text"><?php echo  $display_name ?></p>
            </div>
        </header>