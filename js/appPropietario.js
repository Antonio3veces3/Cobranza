let database= JSON.parse(localStorage.getItem("bd"));
function buscar(nombres){
    let total= database.datos[0].deudores.length;
    for(let i=0;i<total;i++){
        let name= database.datos[0].deudores[i].nombres+" "+database.datos[0].deudores[i].apellidos;
        if(name==nombres)
        return i; 
    }
}

function seleccionDeudoresPago(){
    var deudores=database.datos[0].deudores;
    var select=document.getElementById("registrarpago");
    for(let i=0; i<deudores.length;i++){
        var option= document.createElement('option');
        option.innerHTML=deudores[i].nombres+" "+deudores[i].apellidos;
        select.appendChild(option); 
    }
}
seleccionDeudoresPago();

function seleccionDeudoresCargo(){
    var deudores=database.datos[0].deudores;
    var select=document.getElementById("registrarcargo");
    for(let i=0; i<deudores.length;i++){
        var option= document.createElement('option');
        option.innerHTML=deudores[i].nombres+" "+deudores[i].apellidos;
        select.appendChild(option); 
    }
}
seleccionDeudoresCargo();

function validacionExisteDeudores(nombres,apellidos){
    let existentes= database.datos[0].deudores.length;
    for(let i=0;i<existentes;i++){
        if(database.datos[0].deudores[i].nombres==nombres && database.datos[0].deudores[i].apellidos==apellidos)
        return true;
    }
};


document.getElementById("btnagregar").addEventListener("click",()=>{
    let nombres= document.getElementById("nombres").value;
    let apellidos=document.getElementById("apellidos").value;
    let celular= document.getElementById("celular").value;
    let correo= document.getElementById("correo").value;
    let password= document.getElementById("password").value;
    if(validacionExisteDeudores(nombres,apellidos)==true){
        alert("El deudor ya existe");
        location.reload(); 
    }else{
        let usuario= new Deudor(nombres,apellidos,celular,correo,password,[],0,0,0,"deudor");
        database.datos[0].deudores.push(usuario);
        console.log("Registrado: " + usuario);
        localStorage.setItem("bd",JSON.stringify(database));
        location.reload();
    }
});

//MODIFICAR CON VALOR DE SELECT
document.getElementById("btncargo").addEventListener("click",()=>{
    let deudor= document.getElementById("registrarcargo").value;
    let cargo= parseInt(document.getElementById("cargo").value);
    let position= buscar(deudor);
    let fecha= document.getElementById("fechacargo").value;
    let hist= new historial("Cargo",fecha,cargo); 
    database.datos[0].deudores[position].cobros=cargo;
    database.datos[0].deudores[position].deuda+=cargo;
    database.datos[0].deudores[position].historial.push(hist); 
    localStorage.clear();
    localStorage.setItem("bd",JSON.stringify(database));
    console.log("Cargo aplicado");
});


//MODIFICAR CON VALOR SELECT
document.getElementById("btnpago").addEventListener("click",()=>{
    let deudor= document.getElementById("registrarpago").value;
    let cantidad= parseInt(document.getElementById("cantidadpago").value);
    let fecha= document.getElementById("fechapago").value;
    let position= buscar(deudor);
    let his= new historial("Pago",fecha,cantidad);
    database.datos[0].deudores[position].pagado+=cantidad;
    database.datos[0].deudores[position].deuda-=cantidad;
    database.datos[0].deudores[position].historial.push(his);
    database.datos[0].deudores[position].cobros=0;
    if(database.datos[0].deudores[position].deuda==0)
    database.datos[0].deudores[position].pagado=0;
    localStorage.clear();
    localStorage.setItem("bd",JSON.stringify(database));
    console.log("Pago realizado");
});

document.getElementById("btncargoTodos").addEventListener("click",()=>{
    let cantidad= parseInt(document.getElementById("cargotodos").value);
    let total= database.datos[0].deudores.length;
    let fecha= document.getElementById("fechatodos").value; 
    let his= new historial("cargo",fecha,cantidad)
    for(let i=0; i<total;i++){
        database.datos[0].deudores[i].cobros=cantidad;
        database.datos[0].deudores[i].deuda+=cantidad;
        database.datos[0].deudores[i].historial.push(his);
    }
    localStorage.clear();
    localStorage.setItem("bd",JSON.stringify(database)); 
    console.log("Cargo aplicado");
});