// URL Services
var UrlServiceEmail = BaseUrl + 'registro/user/email';
var UrlServiceUser = BaseUrl + 'registro/user/name';
var ret;

// Services Validation 
function ValidateServiceEmail(email) {
    var resp = true;
    $.ajax({
        async: false,
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        headers: {},
        type: "POST",
        data: JSON.stringify({email: email, idUsr: null, name: null}),
        url: UrlServiceEmail,
        success: function (result) {
            resp = result.success;
        },
        error: function (xhr) {
            GeneratePopUpAmigo("error", "Error la validacion de correo");
            console.log(xhr);
            resp = true;
        }
    });
    return resp;
}
function ValidateServiceUser(user) {
    var resp = '';
    $.ajax({
        async: false,
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        headers: {},
        type: "POST",
        data: JSON.stringify({idUsr: null, name: user, email: null}),
        url: UrlServiceUser,
        beforeSend: function (xhr) {
        },
        success: function (result) {
            resp = result.success;
        },
        error: function (xhr) {
            GeneratePopUpAmigo("error", "Error la validacion de usuario");
            console.log(xhr);
            resp = false;
        },
        complete: function (jqXHR, textStatus) {
        }
    });
    return resp;
}

// Validaciones individuales Comunes
function isEmail(email, existe) {
    email.removeClass("is-valid is-invalid");
    email.next().children().removeClass("bto-error bto-success");
    if (!email.val().match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        email.next().children().addClass("bto-error").html("¡Error en el formato del correo!");
        email.addClass("is-invalid");
        return false;
    } else {
        if (existe == true) {
            if (ValidateServiceEmail(email.val()) === true) {
                email.next().children().addClass("bto-error").html("¡Este correo ya existe!");
                email.addClass("is-invalid");
                return false;
            } else {
                email.next().children().addClass("bto-success").html("¡Este correo es valido y esta disponible!");
                email.addClass("is-valid");
                return true;
            }
        }
        email.next().children().addClass("bto-success").html("¡Formato de correo valido!");
        email.addClass("is-valid");
        return true;
    }

}
function isValidCombo(combo) {
    combo.removeClass("is-valid is-invalid");
    combo.next().next().children().removeClass("bto-error bto-success");
    if (combo.val() < 1) {
        combo.addClass("is-invalid");
        combo.next().next().children().html("¡Debe seleccionar una opción.!");
        combo.next().next().children().addClass("bto-error");
        return false;
    }
    combo.next().next().children().html("¡Este campo es valido!");
    combo.next().next().children().addClass("bto-success");
    combo.addClass("is-valid");
    return true;
}
function isValidString(name) {
    name.removeClass("is-valid is-invalid");
    name.next().children().removeClass("bto-error bto-success");
    if (name.val().length < 1 || name.val() == '') {
        name.addClass("is-invalid");
        name.next().children().addClass("bto-error").html("¡Este campo no puede estar vacio!");
        return false;
    } else {
        name.next().children().addClass("bto-success").html("¡Esta campo es valido!");
        name.addClass("is-valid");
        return true;
    }
}
function isValidUser(name, existe) {
    name.removeClass("is-valid is-invalid");
    name.next().children().removeClass("bto-error bto-success");
    if (name.val().length < 1 || name.val() == '') {
        name.addClass("is-invalid");
        name.next().children().addClass("bto-error").html("¡Este campo no puede estar vacio!");
        return false;
    } else {
        if (existe == true) {
            var valido = ValidateServiceUser(name.val());
            if (valido === true) {
                name.addClass("is-invalid");
                name.next().children().addClass("bto-error").html("¡Este nombre de usuario ya existe!");
                return false;
            }
        }
        name.next().children().addClass("bto-success").html("¡Usuario valido!");
        name.addClass("is-valid");
        return true;
    }

}
function isValidDate(date) {
    date.removeClass("is-valid is-invalid");
    date.next().children().removeClass("bto-error bto-success");
    if (date.val().length < 1 || date.val() == '') {
        date.addClass("is-invalid");
        date.next().children().addClass("bto-error").html("¡La fecha no puede estar vacia y debe tener un formato valido!");
        return false;
    } else {
        date.next().children().addClass("bto-success").html("¡Fecha valida!");
        date.addClass("is-valid");
        return true;
    }

}

function iconCorrectPassword() {
    return '<span class="icon-va"><i class="fa fa-check-circle"></i></span>';
}
function SearchOneToOne(string) {
    var out = true;
    for (var i = 0; i < string.length; i++)
        if (!string.charAt(i).match(/[a-z]|[A-Z]|\d|\$|\@|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\./))
            out = false;
    return out;
}
function isCorrectPassword(valor) {
    var entro = true;
    valor.removeClass("is-valid is-invalid");
    valor.next().html("Debe Contener los siguientes caracteres:</br>").addClass("padin");
    if (!SearchOneToOne(valor.val())) {
        valor.next().append('<span class="bto-danger">' + iconCorrectPassword() + 'Posee caracteres invalidos</span> </br>');
        entro = false;
    } else {
        valor.next().append('<span class="bto-success">' + iconCorrectPassword() + 'No posee caracteres invalidos</span> </br>');
    }

    if (valor.val().length < 6) {
        valor.next().append('<span>' + iconCorrectPassword() + 'Mas de 6 caracteres.</span> </br>');
        entro = false;
    } else {
        valor.next().append('<span class="bto-success">' + iconCorrectPassword() + 'Mas de 6 caracteres.</span> </br>');
    }

    if (!valor.val().match(/[a-z]/)) {
        valor.next().append('<span>' + iconCorrectPassword() + 'Al menos una letra minuscula.</span> </br>');
        entro = false;
    } else {
        valor.next().append('<span class="bto-success">' + iconCorrectPassword() + 'Al menos una letra minuscula.</span> </br>');
    }

    if (!valor.val().match(/[A-Z]/)) {
        valor.next().append('<span>' + iconCorrectPassword() + 'Al menos una letra mayuscula.</span> </br>');
        entro = false;
    } else {
        valor.next().append('<span class="bto-success">' + iconCorrectPassword() + 'Al menos una letra mayuscula.</span> </br>');
    }

    if (!valor.val().match(/\d/)) {
        valor.next().append('<span>' + iconCorrectPassword() + 'Al menos un número.</span> </br>');
        entro = false;
    } else {
        valor.next().append('<span class="bto-success">' + iconCorrectPassword() + 'Al menos un número.</span> </br>');
    }

    if (!valor.val().match(/\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\./)) {
        valor.next().append('<span>' + iconCorrectPassword() + 'Al menos un caracter especial (!@#$%^&*()_-.)</span> </br>');
        entro = false;
    } else {
        valor.next().append('<span class="bto-success">' + iconCorrectPassword() + 'Al menos un caracter especial (!@#$%^&*()_-.)</span> </br>');
    }
//    if (!valor.val().match(/$|@|#|-|_|./)) {
//        valor.addClass("is-invalid");
//        valor.next().append("<span>- Debe contener al menos un caracter especial.</span></br>");
//        entro = false;
//    }
    if (entro == true) {
        valor.addClass("is-valid");
    } else {
        valor.addClass("is-invalid");

    }
    return entro;
}
function EqualPassword(valor1, valor2) {
    //condiciones dentro de la función
    valor2.removeClass("is-invalid is-valid");
    valor2.next().children().removeClass("bto-error bto-success");
    if (valor2.val().length == 0 || valor2.val() == "") {
        valor2.addClass("is-invalid");
        valor2.next().children().addClass("bto-error").html("¡Este campo no puede estar vacio!");
        return false;
    }
    if (valor1.val() != valor2.val()) {
        valor2.addClass("is-invalid");
        valor2.next().children().addClass("bto-error").html("¡Las contraseñas deben coincidir!");
        return false;
    }
    valor2.next().children().addClass("bto-success").html("¡Contraseñas iguales!");
    valor2.addClass("is-valid");
    return true;
}

// VALIDACIONES FORMULARIOS
// Register
function ValidateFormStep1Register() {
    // Variables
    var entro = true;

    //Condiciones para activar nuevamente las no validas
    if (!isValidString($("#nombre"))) {
        entro = false;
    }
    if (!isValidString($("#apellido"))) {
        entro = false;
    }
    if (!isValidDate($("#date"))) {
        entro = false;
    }
    if (!isValidCombo($('select[id=pais]'))) {
        entro = false;
    }
    if (!isValidCombo($('select[id=estado]'))) {
        entro = false;
    }
//    if (!isValidCombo($('select[id=tipo-cuenta]'))) {
//        entro = false;
//    }
    return entro;
}
function ValidateFormStep2Register() {
    // Variables
    var entro = true;

    //Condiciones para activar nuevamente las no validas
    if (isEmail($("#email"), true) === false) {
        entro = false;
    }
    if (!EqualPassword($('#password'), $('#password-confirm'))) {
        entro = false;
    }
    if (!isCorrectPassword($('#password'))) {
        entro = false;
    }
    if (isValidUser($("#usuario"), true) === false) {
        entro = false;
    }

    return entro;
}