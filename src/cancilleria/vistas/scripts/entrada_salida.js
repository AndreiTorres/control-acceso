var tabla;
var flag;
var tipo_asistencia = "";


function init() {
    let url = new URL(window.location.href);
    let cd = url.searchParams.get('codigopersona');
    let fi = url.searchParams.get('fechaini');
    let ff = url.searchParams.get('fechafin');

    if (url.searchParams.get('tipo') != null) {
        tipo_asistencia = url.searchParams.get('tipo');
    }

    if (fi && ff) {
        $("#fecha_inicio").val(fi);
        $("#fecha_fin").val(ff);
    }

    $.post("../ajax/entrada_salida.php?op=selectPersona", function (r) {
        $("#codigo_persona").html(r);
        $('#codigo_persona').val(cd);
        $("#codigo_persona").selectpicker("refresh");
        $("#codigo_persona1").html(r);
        $("#codigo_persona1").selectpicker("refresh");
        listar_asistencia();
    });

    $('#mdp-demo').multiDatesPicker({
        dateFormat: "20y-m-d"
    });

}

function listar_asistencia() {
    var fecha_inicio = $("#fecha_inicio").val();
    var fecha_fin = $("#fecha_fin").val();
    var codigo_persona = $("#codigo_persona").val();
    var e = document.getElementById("codigo_persona");
    var nombre_persona = e.options[e.selectedIndex].text;
    tabla = $("#tbllistado_asistencia")
        .dataTable({
            stateSave: true,
            aProcessing: true, 
            aServerSide: true, 
            dom: 'Blfrtip', 
            buttons: [{
                extend: 'pdfHtml5',
                title: nombre_persona,
                    text: 'PDF',
                    orientation: 'portrait',
                    pageSize: 'letter', 
                    exportOptions: {
                        columns: ':visible',
                        search: 'applied',
                        order: 'applied'
                    },
                    customize: function (doc) {
                        doc.defaultStyle.font = "mon";
                        doc.styles.tableBodyEven.alignment = "center";
                        doc.styles.tableBodyOdd.alignment = "center";
                        let table = doc.content[1].table.body;
                        doc.content[1].table.widths = ['22%', '22%', '16%', '39%', '1%'];
                        var numCols = $('#tbllistado_asistencia').DataTable().columns(':visible').nodes().length;
                        var numRows = doc.content[1].table.body.length;
                        for (i = 0; i < numCols; i++) {
                            table[0][i].fillColor = "#9D2449";
                            for (j = 1; j < numRows; j++) {
                                table[j][i].fillColor = "#D4C19C";
                                j = j + 1;
                            }
                            if (table[0][i].text == "TipoAsistenciaFaltaIncidenciaRetardo") {
                                table[0][i].text = "Tipo";
                            }
                        }
                        table[0][2].text = "Tipo";
                        doc.content.splice(0, 1);
                        doc.pageMargins = [20, 70, 20, 30];
                        doc.defaultStyle.fontSize = 11;
                        doc.styles.tableHeader.fontSize = 12;
                        doc['header'] = (function () {
                            return {
                                columns: [{
                                    alignment: 'left',
                                    text: 'OFICINA DE PASAPORTES YUCATÁN',
                                    color: '#621132',
                                    font: 'gmx',
                                    fontSize: 14,
                                    margin: [0, 0],
                                },
                                {
                                    alignment: 'right',
                                    font: 'mon',
                                    fontSize: 11,
                                    text: 'Asistencias por Fecha. \nInicio: ' + fecha_inicio + ' Fin: ' + fecha_fin + '\n Nombre: ' + nombre_persona
                                },
                                ],
                                margin: 20
                            }
                        });
                        doc['footer'] = (function (page, pages) {
                            return {
                                columns: [
                                    {
                                        alignment: 'center',
                                        font: 'mon',
                                        fontSize: 11,
                                        text: ''

                                    },
                                ],
                                margin: [10, -10]
                            }
                        });
                    }
                },
            ],
            ajax: {
                url: "../ajax/entrada_salida.php?op=listar_asistencia",
                data: {
                    fecha_inicio: fecha_inicio,
                    fecha_fin: fecha_fin,
                    codigo_persona: codigo_persona,
                },
                type: "post",
                dataType: "json",
                error: function (e) {
                },
            },
            bDestroy: true,
            iDisplayLength: 25,
            order: [
                [0, "desc"]
            ],
            initComplete: function () {
                this.api()
                    .columns([2])
                    .every(function () {
                        var column = this;
                        var select = $('<select><option value="">Tipo</option></select>')
                            .appendTo($(column.header()).empty())
                            .on("change", function () {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                column.search(val ? "^" + val + "$" : "", true, false).draw();
                            });
                        var initSort = tipo_asistencia;
                        var val = $.fn.dataTable.util.escapeRegex(initSort);
                        column.search(val ? "^" + val + "$" : "", true, false).draw();
                        column.data().unique().sort().each(function (d, j) {
                            if (column.search() === '^' + d + '$') {
                                select.append('<option value="' + d + '" selected="selected">' + d + '</option>')
                            } else {
                                select.append('<option value="' + d + '">' + d + '</option>')
                            }
                        });
                        $(select).click(function (e) {
                            e.stopPropagation();
                        });
                        var currSearch = column.search();
                        if (currSearch) {
                            select.val(currSearch.substring(1, currSearch.length - 1));
                        }
                    });
                tipo_asistencia = "";
            },
        })
        .DataTable();

}

function editartipo(idasistencia) {
    bootbox.dialog({
        title: "<h2>Editar Tipo</h2>",
        message: "<form><label>Tipo:</label><br><select name='selecttipo' id='selecttipo1'><option value='Asistencia'>Asistencia</option><option value='Falta'>Falta</option><option value='Retardo'>Retardo</option><option value='Incidencia'>Incidencia</option></select>" +
            "<br><br><label>Anotacion:</label><textarea class='form-control' id='anotacion1' rows='4' placeholder='Escriba aqui...' style='resize: none'></textarea></form>",
        size: 'small',
        buttons: {
            ok: {
                label: "Aceptar",
                className: 'btn-success btn-md col-md-4  pull-left',
                callback: function () {
                    var tipoAsistencia = $("#selecttipo1").val();
                    var anotacion = $("#anotacion1").val();
                    $.ajax({
                        url: "../ajax/entrada_salida.php?op=nuevo_tipo",
                        type: "POST",
                        data: { idasistencia: idasistencia, tipoAsistencia: tipoAsistencia, anotacion: anotacion },
                        processData: JSON,
                        success: function (data) {
                            listar_asistencia();
                        }
                    })

                }
            },
            cancel: {
                label: "Cancelar",
                className: 'btn-warning btn-md col-md-4 pull-right',
                callback: function () {}
            },
        }
    })
}

function borrar_asistencia(id_asistencia) {
    bootbox.confirm({
        message: "¿Desea eliminar la asistencia?",
        buttons: {
            confirm: {
                label: 'Si',
                className: 'btn-primary'
            },
            cancel: {
                label: 'No',
                className: 'btn-secondary'
            }
        },
        callback: function (result) {
            if (result){
                $.ajax({
                    url: "../ajax/entrada_salida.php?op=borrar_asistencia",
                    type: "POST",
                    data: { id_asistencia: id_asistencia},
                    processData: JSON,
                    success: function (datos) {
                        listar_asistencia();
                    },
            
                })
            }
        }
    });
}

function obtenerNombreParaSelect() {
    nombreSeleccionado = $("#codigo_persona").val();
    $('#codigo_persona1').val(nombreSeleccionado);
    $("#codigo_persona1").selectpicker("refresh");
}

function crear_asistencia() {
    var codigo_persona = $("#codigo_persona1").val();
    var dates = $('#mdp-demo').multiDatesPicker('value');
    var anotacion = $('#anotacion').val();
    var tipoAsistencia = $('#selecttipo').val();
    let arrFechas = dates.split(', ');
    numFechas = arrFechas.length;
    limpiar(numFechas);

    $.ajax({
        url: "../ajax/entrada_salida.php?op=nueva_asistencia",
        type: "POST",
        data: { codigo_persona: codigo_persona, arrFechas: arrFechas, anotacion: anotacion, tipoAsistencia: tipoAsistencia },
        processData: JSON,
        success: function (datos) {
            var arrDates = JSON.parse(datos);
            for (let i = 0; i < arrDates[0].length; i++) {
                alertify.success("Registro <p>" + arrDates[0][i] + ",</p> agregado correctamente")
            }

            for (let i = 0; i < arrDates[1].length; i++) {
                alertify.error("Ya existe registro en <p>" + arrDates[1][i] + ",</p> seleccione otro dia.");
            }
        },
    })
}

function limpiar(numFechas) {
    for (let index = numFechas; index >= 0; index--) {
        $('#mdp-demo').multiDatesPicker('removeIndexes', 0);
    }
    $("#anotacion").val("");
}

function dateFormat(inputDate, format) {
    const date = new Date(inputDate); 
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    format = format.replace("MM", month.toString().padStart(2, "0"));

    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
}

function editar_entrada(entrada, id_asistencia) {
    dia = entrada.slice(0,-8);
    bootbox.prompt({
    title: "Elige la nueva hora de entrada del " + dia,
        inputType: 'time',
        buttons: {
            cancel: {
                label: "Cancelar",
                className: 'btn-secondary',
            },
            confirm: {
                label: "Aceptar",
                className: 'btn-primary',
            }
        },
        callback: function (result) {
            if (result){
                $.ajax({
                    url: "../ajax/entrada_salida.php?op=editar_entrada",
                    type: "POST",
                    data: { id_asistencia: id_asistencia, hora:result, dia:dia },
                    processData: JSON,
                    success: function (datos) {
                        listar_asistencia();
                    },
                })
            }
        }
    });
}

function editar_salida(salida, id_asistencia) {
    dia = salida.slice(0,-8);
    bootbox.prompt({
    title: "Elige la nueva hora de salida del " + dia,
        inputType: 'time',
        buttons: {
            cancel: {
                label: "Cancelar",
                className: 'btn-secondary',
            },
            confirm: {
                label: "Aceptar",
                className: 'btn-primary',
            }
        },
        callback: function (result) {
            if (result){
                $.ajax({
                    url: "../ajax/entrada_salida.php?op=editar_salida",
                    type: "POST",
                    data: { id_asistencia: id_asistencia, hora:result, dia:dia },
                    processData: JSON,
                    success: function (datos) {
                        listar_asistencia();
                    },
                })
            }
        }
    });
}

init();