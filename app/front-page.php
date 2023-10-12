<?php

/** 
 * Main template file
 * 
 * @package Secure 
 * */

    //get_header();
    wp_redirect(get_site_url() . '/information_system');
    exit;
?>
        
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
        </main> -->


<!--?php get_footer(); ?-->