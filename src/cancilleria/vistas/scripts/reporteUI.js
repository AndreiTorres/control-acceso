var tabla;
var flag;

function init() {
    listar_mes();
}

function listar() {
    flag = false;
    var fecha_inicio = $("#fecha_inicio").val();
    var fecha_fin = $("#fecha_fin").val();
    tabla = $("#tbllistado")
        .dataTable({
            stateSave: true,
            aProcessing: true,
            aServerSide: true,
            dom: "Blfrtlip",
            columnDefs: [{
                searchable: false,
                orderable: false,
                targets: 0,
            },            
        ],
            buttons: [
            {
                extend: 'pdfHtml5',
                title: "Reporte Cancilleria",
                    text: 'PDF',
                    orientation: 'portrait',
                    pageSize: 'letter',
                    exportOptions: {
                        columns: ':visible',
                        search: 'applied',
                        order: 'applied'
                    },
                    customize: function(doc) {
                        doc.defaultStyle.font = "mon";
                        let table = doc.content[1].table.body;
                        doc.content[1].table.widths = ['4%', '38%', '25%', '9%', '10%', '14%','1%'];
                        var rowCount = doc.content[1].table.body.length;
                        doc.styles.tableBodyEven.alignment = "center";
                        doc.styles.tableBodyOdd.alignment = "center";
                        var numCols = $('#tbllistado').DataTable().columns(':visible').nodes().length;
                        for (i = 0; i < numCols; i++) {
                            table[0][i].fillColor = "#9D2449";
                            for (j = 1; j < rowCount; j++) {
                                table[j][i].fillColor = "#D4C19C";
                                j = j + 1;
                            }
                        }
                        table[0][2].text = "Puesto";
                        doc.content.splice(0, 1);
                        doc.pageMargins = [20, 80, 20, 20];
                        doc.defaultStyle.fontSize = 11;
                        doc.styles.tableHeader.fontSize = 12;
                        doc['header'] = (function() {
                            return {
                                columns: [
                                    {
                                        alignment: 'left',
                                        text: 'OFICINA DE PASAPORTES YUCATÁN',
                                        color: '#621132',
                                        font: 'gmx',
                                        fontSize: 14,
                                        margin: [0, 0]
                                    },
                                    {
                                        alignment: 'right',
                                        fontSize: 11,
                                        font: "mon",
                                        text: 'Reporte del periodo. \nInicio: ' + fecha_inicio + ' Fin: ' + fecha_fin + "\nEntradas: " + (rowCount - 1),
                                    }
                                ],
                                margin: 20
                            }
                        });
                    }
                }

            ],
            ajax: {
                url: "../ajax/reporteController.php?op=listar",
                data: { fecha_inicio: fecha_inicio, fecha_fin: fecha_fin },
                type: "post",
                dataType: "json",
                error: function(e) {
                },
            },
            bDestroy: true,
            iDisplayLength: 25,
            order: [
                [0, "asc"]
            ],
            initComplete: function() {
                this.api()
                    .columns([2])
                    .every(function() {
                        var column = this;
                        var select = $('<select><option value="">Puesto</option></select>') 
                            .appendTo($(column.header()).empty())
                            .on("change", function() {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                                column.search(val ? "^" + val + "$" : "", true, false).draw();
                            });

                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function(d, j) {
                                select.append('<option value="' + d + '">' + d + "</option>");
                            });

                        $(select).click(function(e) {
                            e.stopPropagation();
                        });

                        var currSearch = column.search();
                            if ( currSearch ) {
                            select.val( currSearch.substring(1, currSearch.length-1) );



                    }
                    });
            },
        })
        .DataTable();
    tabla.on('order.dt search.dt', function() {
        let i = 1;
        tabla.cells(null, 0, { search: 'applied', order: 'applied' }).every(function(cell) {
            this.data(i++);
        });
    }).draw();
    
}

function listar_mes() {
    flag = false;
    var fecha = $("#mes").val();
    var month = fecha.slice(5)
    var year = fecha.slice(0,4)
    tabla = $("#tbllistado")
        .dataTable({
            stateSave: true,
            aProcessing: true,
            aServerSide: true,
            dom: "Blfrtlip",
            columnDefs: [{
                searchable: false,
                orderable: false,
                targets:0,
            }, 
            ],
            buttons: [{
                extend: 'pdfHtml5',
                title: "Reporte Cancilleria",
                    text: 'PDF',
                    orientation: 'portrait',
                    pageSize: 'letter',
                    exportOptions: {
                        columns: ':visible',
                        search: 'applied',
                        order: 'applied'
                    },
                    customize: function(doc) {
                        doc.defaultStyle.font = "mon";
                        let table = doc.content[1].table.body;
                        doc.content[1].table.widths = ['4%', '38%', '25%', '9%', '10%', '14%', "1%"];
                        doc.styles.tableBodyEven.alignment = "center";
                        doc.styles.tableBodyOdd.alignment = "center";
                        var numCols = $('#tbllistado').DataTable().columns(':visible').nodes().length;
                        var numFilas = table.length;
                        for (i = 0; i < numCols; i++) {
                            table[0][i].fillColor = "#9D2449";
                            for (j = 1; j < numFilas; j++) {
                                table[j][i].fillColor = "#D4C19C";
                                j = j + 1;
                            }
                        }
                        table[0][2].text = "Puesto";
                        doc.content.splice(0, 1);
                        doc.pageMargins = [20, 80, 20, 20];
                        doc.defaultStyle.fontSize = 11;
                        doc.styles.tableHeader.fontSize = 12;
                        doc['header'] = (function() {
                            return {
                                columns: [
                                    {
                                        alignment: 'left',
                                        text: 'OFICINA DE PASAPORTES YUCATÁN',
                                        color: '#621132',
                                        font: 'gmx',
                                        fontSize: 14,
                                        margin: [0, 0]
                                    },
                                    {
                                        alignment: 'right',
                                        fontSize: 11,
                                        font: "mon",
                                        text: 'Reporte mensual. \nFecha: ' + month + "/" +  year + "\nEntradas: " + (numFilas - 1),
                                    }
                                ],
                                margin: 20
                            }
                        });
                    }
                }
            ],
            ajax: {
                url: "../ajax/reporteController.php?op=listar_mes",
                data: { month: month, year: year },
                type: "post",
                dataType: "json",
                error: function(e) {
                },
            },
            bDestroy: true,
            iDisplayLength: 25,
            order: [
                [0, "asc"]
            ],
            initComplete: function() {
                this.api()
                    .columns([2])
                    .every(function() {
                        var column = this;
                        var select = $('<select><option value="">Puesto</option></select>')
                            .appendTo($(column.header()).empty())
                            .on("change", function() {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());

                                column.search(val ? "^" + val + "$" : "", true, false).draw();
                            });

                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function(d, j) {
                                select.append('<option value="' + d + '">' + d + "</option>");
                            });

                            $(select).click(function(e) {
                                e.stopPropagation();
                            });

                            var currSearch = column.search();
                            if ( currSearch ) {
                            select.val( currSearch.substring(1, currSearch.length-1) );



                    }
                });
            },
        })
        .DataTable();
    tabla.on('order.dt search.dt', function() {
        let i = 1;
        tabla.cells(null, 0, { search: 'applied', order: 'applied' }).every(function(cell) {
            this.data(i++);
        });
    }).draw();
}

function mostrarES(codigopersona,fecha_inicio,fecha_fin,tipo) {
    if(flag){
        fecha_inicio = dateFormat(fecha_inicio, 'yyyy-MM-dd');
        fecha_fin = dateFormat(fecha_fin, 'yyyy-MM-dd');
    }
    location.href = ``;
}

function mostrarUsuario(idusuario){
    location.href = ``;
}

init();