let database= JSON.parse(localStorage.getItem("bd"));

//-----------------------------------------------------------------------------
document.getElementById("btnestado").addEventListener("click",()=>{
    let texto="";
    texto+=`
    <p>Deuda: ${database.datos[0].deudores[0].deuda+database.datos[0].deudores[0].pagado}</p>
    <p>Pagado: ${database.datos[0].deudores[0].pagado}</p>
    <p>Deuda restante: ${database.datos[0].deudores[0].deuda}</p>
    `;
    document.getElementById("estado").innerHTML+=texto;
});

document.getElementById("btnpagos").addEventListener("click",()=>{
    let mostrar= JSON.parse(localStorage.getItem("bd"));
    let texto= "";
    let histo= mostrar.datos[0].deudores[0].historial;
    histo.forEach(element => {
        if(element.tipo=="Pago" || element.tipo=="pago"){
        texto+=`
        <div>
            <p>Tipo: ${element.tipo} </p>
            <p>Fecha: ${element.fecha} </p>
            <p>Cantidad: ${element.cantidad}</p>
        </div>
        `;
        }
    });
    document.getElementById("pagos").innerHTML+=texto;
});

document.getElementById("btncargos").addEventListener("click",()=>{
    let mostrar= JSON.parse(localStorage.getItem("bd"));
    let texto= "";
    let histo= mostrar.datos[0].deudores[0].historial;
    histo.forEach(element => {
        if(element.tipo=="cargo" || element.tipo=="Cargo"){
        texto+=`
        <div>
            <p>Tipo: ${element.tipo} </p>
            <p>Fecha: ${element.fecha} </p>
            <p>Cantidad: ${element.cantidad}</p>
        </div>
        `;
        }
    });
    document.getElementById("cargos").innerHTML+=texto;
}); 