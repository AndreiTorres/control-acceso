var tabla;

async function main() {
    await new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });
    init();
  }
function init() {
    $("#formulario").on("submit", function(e) {
        registrar_asistencia(e);
    })
    
}



function limpiar() {
    $("#codigo_persona").val("");
    setTimeout(function() { $('#codigo_persona').focus(); }, 500);
    document.getElementById("codigo_persona").disabled = false;
}

function registrar_asistencia(e) {
    e.preventDefault();
    $("#btnGuardar").prop("disabled", true);
    var formData = new FormData($("#formulario")[0]);
    var codigo_persona = $("#codigo_persona").val();
    document.getElementById("codigo_persona").disabled = true
    const d = new Date();
    let hora = d.getHours();
    if (hora >= 19 && hora <21) {
        $.ajax({
            url: "../ajax/asistenciaController.php?op=falta_automatica",
            type: "POST",
            data: '',
            contentType: false,
            processData: false,
            success: function(data) {
            }
        })
    }
    $.ajax({
        url: "../ajax/asistenciaController.php?op=verificar_usuario",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        success: function(datos) {

            if (datos == 0) {
                bootbox.dialog({
                    title: '<h2>Usuario no encontrado</h2>',
                    message: '<div class="alert alert-danger text-center"> <i class = "icon fa fa-warning" > </i> &#161;No hay usuario registrado con ese c&oacute;digo, o se encuentra desactivado! </div > ',
                    size: 'large',
                    buttons: {
                        ok: {
                            label: "Continuar",
                            className: 'btn-info btn-lg',
                            callback: function() {
                                limpiar();
                            }
                        },

                    }
                });
            } else {
                bootbox.dialog({
                        title: "<div align='center'><h3><strong>Verificar Usuario</strong></h3></div>",                        
                        message: datos,
                        size: 'medium',
                        buttons: {
                            ok: {
                                label: "Confirmar",
                                className: 'btn-primary btn-lg col-md-3  pull-left',
                                callback: function() {
                                    $.ajax({
                                        url: "../ajax/asistenciaController.php?op=registrar_asistencia",
                                        type: "POST",
                                        data: formData,
                                        contentType: false,
                                        processData: false,
                                        success: function(data) {}
                                    })
                                    
                                    limpiar();
                                }
                            },
                            cancel: {
                                label: "Rechazar",
                                className: 'btn-default btn-lg col-md-3 pull-right',
                                callback: function() {
                                    limpiar();
                                }
                            },
                        }
                    }

                );
            }

        },

    });
}


main();

