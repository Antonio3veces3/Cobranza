let database= JSON.parse(localStorage.getItem("bd"));
let indice=0;
function validacionExisteDeudor(telefono,contraseña){
    let existentes= database.datos[0].deudores.length;
    for(let i=0;i<existentes;i++){
        if(database.datos[0].deudores[i].celular==telefono && database.datos[0].deudores[i].password==contraseña){
            indice=i;
            return true; 
        }
    }
}
document.getElementById("btningresar").addEventListener("click",()=>{
    let phone= document.getElementById("tel").value;
    let contraseña=document.getElementById("pass").value;
    if(validacionExisteDeudor(phone,contraseña)==true){
        location.replace("deudor.html");
    }else{
        alert("No estas registrado");
    }
});