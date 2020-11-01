// *This scripts only for pricing table
$(document).ready(function () {
    // hover effects for columns
    hover_over();
    function hover_over() {
        $('.over_').hover(function () {
            if ($(this).hasClass('col-1')) {
                $('.col-1').children('ul').addClass('columns_hover');
            }
            if ($(this).hasClass('col-2')) {
                $('.col-2').children('ul').addClass('columns_hover');
            }
            if ($(this).hasClass('col-3')) {
                $('.col-3').children('ul').addClass('columns_hover');
            }
            if ($(this).hasClass('col-4')) {
                $('.col-4').children('ul').addClass('columns_hover');
            }
            $(this).children('ul').find('.top-header').addClass('header_hover');
        }, function () {
            if ($(this).hasClass('col-1')) {
                $('.col-1').children('ul').removeClass('columns_hover');
                //hide menus slide
                $(this).children().find('.open_menu').parent().children('.menu_slot').hide();
                $(this).find("ul li .arrow").removeClass('up_arrow');
            }
            if ($(this).hasClass('col-2')) {
                $('.col-2').children('ul').removeClass('columns_hover');
                //hide menus slide
                $(this).children().find('.open_menu').parent().children('.menu_slot').hide();
                $(this).find("ul li .arrow").removeClass('up_arrow');
            }
            if ($(this).hasClass('col-3')) {
                $('.col-3').children('ul').removeClass('columns_hover');
                //hide menus slide
                $(this).children().find('.open_menu').parent().children('.menu_slot').hide();
                $(this).find("ul li .arrow").removeClass('up_arrow');
            }
            if ($(this).hasClass('col-4')) {
                $('.col-4').children('ul').removeClass('columns_hover');
                //hide menus slide
                $(this).children().find('.open_menu').parent().children('.menu_slot').hide();
                $(this).find("ul li .arrow").removeClass('up_arrow');
            }
            $(this).children('ul').find('.top-header').removeClass('header_hover');
        });
    }//Hover end

    menu_select();//make menus functionality
    function menu_select() {
        $(document).on("click", ".open_menu", function (e) {

            $(this).parent().siblings().children('.menu_slot').hide();
            $(this).parent().siblings().children(".arrow").removeClass('up_arrow');
            $(this).next(".arrow").addClass('up_arrow');

            $(this).parent().children('.menu_slot').fadeToggle(100, "swing", function () {
                if ($(this).css("display") == "none") {
                    $(this).prev(".arrow").removeClass('up_arrow');
                }
            });
            // $(this).children('.menu_slot').css("display", "block");
            $('.hiden_price').children('.over_').children('.columns_hover').removeClass('columns_hover');
        });
    }
    // Getting menu's cost
    get_menu_value();
    function get_menu_value() {
        $(document).on("click", ".menu", function () {
            // Get actual column for price updating
            let column = $(this).attr("col-value");
            // Get data what type data in this item
            let data = $(this).attr("data");
            // Getting menu value whatever has
            let menu_value = $(this).attr("cost-value");
            // Define where will be update this price
            let top_price = $('#static-area').children("." + column + "").find(".price");
            let bottom_price = $('#bottom_items').find("." + column + "").find(".price");
            // Push class for checking data insert or not
            $(top_price).toggleClass("updated-" + data + "");
            $(bottom_price).toggleClass("updated-" + data + "");

            // convert price text to number (TOP + BOTTOM)
            let top_present_price = parseInt(top_price.text());
            let bottom_present_price = parseInt(bottom_price.text());
            let new_price = parseInt(menu_value);

            if ($(top_price).hasClass("updated-" + data + "") && $(bottom_price).hasClass("updated-" + data + "")) {
                // Update price
                $(this).addClass("select");
                top_price.text(top_present_price + new_price);
                bottom_price.text(bottom_present_price + new_price);
                // work when button is clicked
                let btn = document.querySelector(".switch_btn");
                if (btn.checked == true) {
                    discount();//calling discount function
                }
            } else {
                // removing price
                $(this).removeClass("select");
                top_price.text(top_present_price - new_price);
                bottom_price.text(bottom_present_price - new_price);
                // work when button is clicked
                let btn = document.querySelector(".switch_btn");
                if (btn.checked == true) {
                    discount();//calling discount function
                }
            }
        });
    }
    default_val();
    function default_val() {
        for (let i = 0; i <= 4; i++) {
            let top_price = $('#static-area').children(".col-" + i + "").find(".price");
            let bottom_price = $('#bottom_items').find(".col-" + i + "").find(".price");
            bottom_price.text(top_price.text());
        }
    }

    function discount() {
        // Getting menu value whatever has
        let discounts = $('.discount-commisions').attr('discount-value');
        // Insert discount price by for loop
        for (let i = 0; i <= 4; i++) {
            let main = $('.main-' + i + '');
            let bottom = $('.bottom-' + i + '');

            // convert price text to number (TOP + BOTTOM)
            let top_present_price = parseInt(main.text());
            let discount_price = parseInt(discounts);

            let disc_ = (discount_price / 100).toFixed(2); //its convert 10 into 0.10
            let mult = top_present_price * disc_; // gives the value for subtract from main value
            let discounted_p = top_present_price - mult;
            bottom.text(discounted_p);//push data into bottom pricing table
        }
    }


    // discount button
    $('.switch_btn').change(function () {
        let btn = document.querySelector(".switch_btn");
        if (btn.checked == true) {
            discount();//calling discount function
        } else {
            default_val();//calling as default
        }
    });

    responsive()
    function responsive() {
        if ($(window).width() <= 768 && $(window).width() >= 480) {
            // For button visibility only table in viewport
            $(window).scroll(function () {
                let table = $("#pricing_table").offset().top;
                let remove = $(".removes_btn").offset().top;

                if ($(document).scrollTop() > table) {
                    if (!$('.col-3, .col-4').is(":visible")) {
                        $(".next_price").show();
                    }
                } else {
                    $(".next_price").hide();
                }
                if ($(document).scrollTop() > remove) {
                    $(".next_price").hide();
                }
            });
            /* Changes when we reach the min-width  */
            $(".previews").click(function () {
                let btn = document.querySelector(".switch_btn");
                if (btn.checked == true) {
                    btn.checked = false;
                    default_val();//calling as default
                }

                $('.col-1, .col-2').fadeIn(500).css("display", "flex");
                $('.col-3, .col-4').css("display", "none");

                if ($('.col-3, .col-4').is(":visible")) {
                    $(".previews").show();
                } else {
                    $(".previews").hide();
                    $(".next_price").show();
                }
            });
            // Next column
            $('.next_price').click(function () {
                let btn = document.querySelector(".switch_btn");
                if (btn.checked == true) {
                    btn.checked = false;
                    default_val();//calling as default
                }
                $('.col-1, .col-2').css("display", "none");
                $('.col-3, .col-4').fadeIn(500).css("display", "flex");

                if ($('.col-1, .col-2').is(":visible")) {
                    $(".next_price").show();
                } else {
                    $(".next_price").hide();
                    $(".previews").show();
                }
            });
        }



        if ($(window).width() <= 480 && $(window).width() >= 320) {
            // For button visibility only table in viewport
            $(window).scroll(function () {
                let table = $("#pricing_table").offset().top;
                let remove = $(".removes_btn").offset().top;

                if ($(document).scrollTop() > table) {
                    if (!$('.col-4,.col-3,.col-2').is(":visible")) {
                        $(".next_price").show();
                    }
                } else {
                    $(".next_price").hide();
                }
                if ($(document).scrollTop() > remove) {
                    $(".next_price").hide();
                }
            });

            // for next bttn
            $('.next_price').click(function () {
                for (i = 1; i < 2; i++) {
                    if ($('.col-1').is(":visible")) {
                        $('.col-1').css("display", "none");
                        $('.col-2').fadeIn(500).css("display", "flex");
                    } else if ($('.col-2').is(":visible")) {
                        $('.col-2').css("display", "none");
                        $('.col-3').fadeIn(500).css("display", "flex");
                    } else if ($('.col-3').is(":visible")) {
                        $('.col-3').css("display", "none");
                        $('.col-4').fadeIn(500).css("display", "flex");
                        $(".next_price").hide();
                        $(".previews").show();
                    }
                }
            });

            // for previews bttn
            $('.previews').click(function () {
                for (i = 1; i < 2; i++) {
                    if ($('.col-4').is(":visible")) {
                        $('.col-4').css("display", "none");
                        $('.col-3').fadeIn(500).css("display", "flex");
                    } else if ($('.col-3').is(":visible")) {
                        $('.col-3').css("display", "none");
                        $('.col-2').fadeIn(500).css("display", "flex");
                    } else if ($('.col-2').is(":visible")) {
                        $('.col-2').css("display", "none");
                        $('.col-1').fadeIn(500).css("display", "flex");
                        $(".previews").hide();
                        $(".next_price").show();
                    }
                }
            });
        }
    }

});