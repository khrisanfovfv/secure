<?php

/** 
 * Main template file
 * 
 * @package Secure 
 * */

    get_header();
?>
        <main class="main">
            <div class="content">
                <div class="reference">
                    <p class="reference__title">Справочник Информационные системы</p>
                    <div class="reference__buttons">
                        <button class="reference__button" id="IS_create">
                            <img src="<?php echo get_template_directory_uri() . '/images/create-record.svg' ?>" alt="Создать">
                            <p>Создать</p>
                        </button>
                        <button class="reference__button" id="IS_edit">
                            <img src="<?php echo get_template_directory_uri() .'/images/edit.svg' ?>" alt="Редактировать">
                            <p>Редактировать</p>
                        </button>
                        <button class="reference__button" id="IS_copy">
                            <img src="<?php echo get_template_directory_uri() .'/images/copy.svg'?>" alt="Копировать">
                            <p>Копировать</p>
                        </button>
                        <button class="reference__button" id="IS_delete">
                            <img src="<?php echo get_template_directory_uri() . '/images/delete.svg' ?>" alt="Удалить">
                            <p>Удалить</p>
                        </button>
                        <button class="reference__button" id="IS_excel">
                            <img src="<?php echo get_template_directory_uri() .'/images/excel.svg'?>" alt="Excel">
                            <p>Эл. таб</p>
                        </button>
                    </div>
                    <table class="reference__table" id="IS_table">
                        <thead>
                            <tr>
                                <th style="width: 35px;">№</th>
                                <th style="width: 200px;">Краткое наименование</th>
                                <th>Полн. наименование</th>
                                <th style="width: 130px;">Аттестована</th>
                                <th style="width: 130px;">Дата посл. аттестации</th>
                                <th style="width: 130px;">Срок след. аттестации</th>
                                <th style="width: 130px;">Проблемы ИБ</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="is_table_row">
                            <td>1</td>
                            <td>АСЭД</td>
                            <td style="text-align: left;">Автоматизированная система электронного документооборота
                                органов исполнительной
                                государственной власти области</td>
                            <td>Нет</td>
                            <td>01.01.2021</td>
                            <td>01.01.2023</td>
                            <td>Да</td>
                        </tr>
                        <tr class="is_table_row">
                            <td>2</td>
                            <td>Корпоративный портал</td>
                            <td style="text-align: left;">Корпоративный портал Правительства Вологодской области</td>
                            <td>Да</td>
                            <td>30.04.2022</td>
                            <td>30.04.2024</td>
                            <td>Нет</td>
                        </tr>
                        </tbody>
                        
                    </table>
                </div>

            </div>
        </main>


<?php get_footer(); ?>