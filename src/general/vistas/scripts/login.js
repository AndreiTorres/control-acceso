$("#frmAcceso").on('submit', function (e) {
    e.preventDefault();
    logina = $("#logina").val();
    clavea = $("#clavea").val();
    if ($("#logina").val() == "" || $("#clavea").val() == "") {
        bootbox.alert("Asegúrate de llenar todo los campos");
    } else {
        $.post("../ajax/sesion.php?op=verificar",
            { "logina": logina, "clavea": clavea },
            function (data) {
                if (data != "null") {
                    $(location).attr("href", "../../index.php");
                }
                else {
                    bootbox.alert("Usuario y/o Password incorrectos");
                }
            });
    }
})