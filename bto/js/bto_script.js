var digiModule1 = {
    main: function () {
        btoFunction.mainPopUp();
        btoFunction.showPassword();

        $("button").on("click", function () {
            btoFunction.callDigiPopUp("Prueba", "Usted ha pulsado el botón ''" + $(this).text() + "'' ");
        });

        $("#miss_pass").on("click", function () {
            btoFunction.callDigiPopUp("Recuperar contraseña", structureHTML.missPassword());
        });

        $(document).on("click", "#recoveryPass", function () {
            window.location = "recovery.html";
        });

        // EVENTOS PARA LA DEMO DEL MODULO 1
        $(document).on("keyup", "#l_email, #l_password, #c_redLocal, #rp_email", function () {
            btoFunction.validateInput($(this), "El campo no es válido");
        });
    },
    register: function () {
        $("button").on("click", function () {
            btoFunction.callDigiPopUp("Contraseña", "Usted ha pulsado el botón ''" + $(this).text() + "'' ");
        });

        btoFunction.showPassword();
        btoFunction.mainPopUp();
        btoFunction.isCorrectPassword($("#r_password"), $("#rc_password"));
        $("#r_password , #rc_password").on("keyup", function () {
            btoFunction.isCorrectPassword($("#r_password"), $("#rc_password"));
        });
    }
};
var digiModule2 = {
    main: function () {
        btoFunction.mainPopUp();
        btoFunction.showPassword();
        btoFunction.LoadFileIMG();
//
//        $("button").on("click", function () {
//            btoFunction.callDigiPopUp("Prueba", "Usted ha pulsado el botón ''" + $(this).text() + "'' ");
//        });
//
//        $("#miss_pass").on("click", function () {
//            btoFunction.callDigiPopUp("Recuperar contraseña", structureHTML.missPassword());
//        });
//
//
//        // EVENTOS PARA LA DEMO DEL MODULO 1
//        $(document).on("keyup", "#l_email, #l_password, #c_redLocal, #rp_email", function () {
//            btoFunction.validateInput($(this), "El campo no es válido");
//        });
        btoFunction.showPassword();
        btoFunction.mainPopUp();
        btoFunction.isCorrectPassword($("#r_password"), $("#rc_password"));
        $("#r_password , #rc_password").on("keyup", function () {
            btoFunction.isCorrectPassword($("#r_password"), $("#rc_password"));
        });
    },
    register: function () {
        btoFunction.showPassword();
        btoFunction.mainPopUp();

        btoFunction.isCorrectPassword($("#r_password"), $("#rc_password"));
        $("#r_password , #rc_password").on("keyup", function () {
            btoFunction.isCorrectPassword($("#r_password"), $("#rc_password"));
        });
    }
};
var digiModule3 = {
    main: function () {
        var that = this;
        btoFunction.mainPopUp();
        btoFunction.showPassword();
        btoFunction.LoadFileIMG();
    },
    register: function () {
        $("button").on("click", function () {
            btoFunction.callDigiPopUp("Contraseña", "Usted ha pulsado el botón ''" + $(this).text() + "'' ");
        });

        btoFunction.showPassword();
        btoFunction.mainPopUp();
        btoFunction.isCorrectPassword($("#r_password"), $("#rc_password"));
        $("#r_password , #rc_password").on("keyup", function () {
            btoFunction.isCorrectPassword($("#r_password"), $("#rc_password"));
        });
    },
};

// Funciones
var btoFunction = {
    mainPopUp: function () {
        // Evento para cerrar el DigiPopUp y otros 
        $(document).on("click", ".section-profile.closet, #div-oculto, .action-close-pop", function () {
            $("body").removeClass("no-scroller");
            $("#div-oculto").removeClass("body-oscurecer");
            $(".digi-modal").addClass("ocultar-pop");
            $("#MyModalDigi").remove();
        });
        // Evento para cerrar Conexiones 
        $(document).on("click", "#btn-conex", function () {
            $("body").addClass("no-scroller");
            $("#div-oculto").addClass("body-oscurecer");
            $(".body-section-conexion").removeClass("ocultar-pop");
        });
        // Evento para cerrar Conexiones 
        $(document).on("click", ".section-notification", function () {
            $("body").addClass("no-scroller");
            $("#div-oculto").addClass("body-oscurecer");
            $(".body-section-notification").removeClass("ocultar-pop");
        });
        // Evento para cerrar el Menu Desplegable 
        $(document).on("click", ".section-menu", function () {
            $("body").addClass("no-scroller");
            $("#div-oculto").addClass("body-oscurecer");
            $(".digi-menu").removeClass("ocultar-pop");
        });
        // Evento para cerrar el Menu Desplegable Profile
        $(document).on("click", ".section-profile.open", function () {
            $("body").addClass("no-scroller");
            $("#div-oculto").addClass("body-oscurecer");
            $(".digi-menu-prof").removeClass("ocultar-pop");
        });
        $(document).on("click", ".digi-menu-item", function () {
            if ($(this).find(".digi-menu-sub").hasClass("digi-menu-hide")) {
                $(".digi-menu-sub").addClass("digi-menu-hide");
                $(this).find(".digi-menu-sub").removeClass("digi-menu-hide");
                $(this).find(".digi-menu-item-label").children("img").attr("src", "/digisalud/bto/images/icon/Icon_arrow_pressed.png");
            } else {
                $(".digi-menu-sub").addClass("digi-menu-hide");
                $(this).find(".digi-menu-item-label").children("img").attr("src", "/digisalud/bto/images/icon/Icon_arrow_normal.png");
            }
        });
    },
    callDigiPopUp: function (title, content) {
        $("#div-oculto").addClass("body-oscurecer");
        $("body").prepend(structureHTML.popUp(title, content));
    },
    showPassword: function () {
        $(".campo-pass .view-pass").on("click", function () {
            var campo = $(this).parent().find("input");
            if (campo.attr("type") == "text") {
                campo.attr("type", "password");
            } else {
                campo.attr("type", "text");
            }
        });
    },
    validateInput: function (campo, title) {
        if (campo.val() == '') {
            campo.next(".div-validador").children().html(title + '<span class="pull-right fas fa-exclamation-triangle"></span>').addClass("bto-error");
            campo.addClass("bto-error-line");
        } else {
            campo.removeClass("bto-error-line");
            campo.next(".div-validador").children().html("").removeClass("bto-error");
        }
    },
    isCorrectPassword: function (valor, confirm) {
        var entro = true;
        var html = "";

//        if (!SearchOneToOne(valor.val())) {
//            valor.next().append('<span class="bto-danger">' + iconCorrectPassword() + 'Posee caracteres invalidos</span> </br>');
//            entro = false;
//        } else {
//            valor.next().append('<span class="bto-success">' + iconCorrectPassword() + 'No posee caracteres invalidos</span> </br>');
//        }

        if (valor.val().length < 10) {
            html += '<div data-type="long"><span class="icon-va"></span>Minimo 10 caracteres</div>';
            entro = false;
        } else {
            html += '<div data-type="long"><span class="icon-va valid"></span>Minimo 10 caracteres</div>';
        }

//        if (!valor.val().match(/[a-z]/)) {
//            html += '<div data-type="mayus"><span class="icon-va"></span>Al menos 1 letra</div>';
//            entro = false;
//        } else {
//            html += '<div data-type="mayus"><span class="icon-va valid"></span>Al menos 1 letra</div>';
//        }

        if (!valor.val().match(/[A-Z]/)) {
            html += '<div data-type="mayus"><span class="icon-va"></span>Al menos 1 mayúscula</div>';
            entro = false;
        } else {
            html += '<div data-type="mayus"><span class="icon-va valid"></span>Al menos 1 mayúscula</div>';
        }

        if (!valor.val().match(/\d/)) {
            html += '<div data-type="number"><span class="icon-va"></span>Al menos 1 número</div>';
            entro = false;
        } else {
            html += '<div data-type="number"><span class="icon-va valid"></span>Al menos 1 número</div>';
        }

        if (!valor.val().match(/\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\./)) {
            html += '<div data-type="esp"><span class="icon-va"></span>Al menos 1 caracter especial</div>';
            entro = false;
        } else {
            html += '<div data-type="esp"><span class="icon-va valid"></span>Al menos 1 caracter especial</div>';
        }

        html += '<div data-type="old"><span class="icon-va valid"></span>Diferente a las anteriores</div>';

        if (entro == false) {
            $("#r_entrar").attr("disabled", true);
            valor.next(".div-validador").children().html("Contraseña no válida" + '<span class="pull-right fas fa-exclamation-triangle"></span>').addClass("bto-error");
            valor.addClass("bto-error-line");
        } else {
            $("#r_entrar").removeAttr("disabled");
            valor.removeClass("bto-error-line");
            valor.next(".div-validador").children().html("").removeClass("bto-error");
        }

        if (confirm.val() != valor.val()) {

            confirm.next(".div-validador").children().html("Las contraseñas no son iguales" + '<span class="pull-right fas fa-exclamation-triangle"></span>').addClass("bto-error");
            confirm.addClass("bto-error-line");
        } else {

            confirm.removeClass("bto-error-line");
            confirm.next(".div-validador").children().html("").removeClass("bto-error");
        }

        $("#validate").empty();
        $("#validate").html(html);
        return entro;
    },
    LoadFileIMG: function () {
        $(function () {
            $('#file-input').change(function (e) {
                var archivo = $(this).val();
                var extensiones = archivo.substring(archivo.lastIndexOf("."));
                if (extensiones != ".jpg" && extensiones != ".jpeg") {
                    alert("¡Formato de la imagen no valido!", "El archivo de tipo " + extensiones + " no es válido, unicamente son permitidos formatos .jpg y .jpeg");
                } else if ($('#file-input')[0].files[0].size > (1024 * 1024)) {
                    alert("¡Tamaño de la imagen no valido!", "El tamaño del archivo es: " + ((($('#file-input')[0].files[0].size) / 1024) / 1024).toFixed(2) + "MB y lo maximo permitido es 1 MB");
                } else {
                    addImage(e);
                }
            });
            function addImage(e) {
                var file = e.target.files[0],
                        imageType = /image.*/;
                if (!file.type.match(imageType))
                    return;
                var reader = new FileReader();
                reader.onload = fileOnload;
                reader.readAsDataURL(file);
            }
            function fileOnload(e) {
                var result = e.target.result;
                $('#edit-img-profile').attr("src", result);
                $("#update_photo").val('1');
            }
        });
    },
};
var structureHTML = {
    popUp: function (title, content) {
        var html = '' +
                '<div id="MyModalDigi" class="digi-modal digi-popup principal-pop" >' +
                '    <div class="container-fluid">' +
                '        <div class="row text-center">' +
                '            <div class="action-close-pop">' +
                '                <i class="fas fa-times"></i>' +
                '            </div>' +
                '            <div class="col-md-12 title-digi-popup font-weight-bold">' +
                '                <h5>' + title + '</h5>' +
                '            </div>' +
                '            <div class="col-md-12 body-digi-popup">' + content + '</div>' +
                '        </div>' +
                '    </div>' +
                '</div>';
        return html;
    },
    missPassword: function () {
        var html = '' +
                '<p>Escribe aquí el correo electrónico que usaste para registrarte en la plataforma.' +
                '<br>Luego revisa tu bandeja de entrada</p>' +
                '<div class="container-fluid">' +
                '    <div class="row ">' +
                '        <div class="col-md-12 pt-2">' +
                '            <div class="md-form">' +
                '                <label for="rp_email">Correo electrónico</label>' +
                '                <input type="text" id="rp_email" class="form-control form-control-sm " autocomplete="off">' +
                '                <div class="div-validador text-left">' +
                '                    <div class="bto-validator">&nbsp;</div>' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>' +
                '<div class="col-md-12 pb-2 text-center">' +
                '    <button class="btn btn-dig-blue" id="recoveryPass">Enviar</button>' +
                '</div>';
        return html;
    }
};