const socket = io();

let barcos = 3;
let barcosIniciales = barcos;
let vidas = barcos;
let posiciones =[];
let posicionesEnemigas=[];
let turno = new Boolean(null);


function ObtenerCoordenada(boton)
{
    let coordenada = boton.getAttribute("id");
    PonerBarco(coordenada);
}

function PonerBarco(coordenada)
{
    
    if(barcos > 0)
    {
        if(posiciones.indexOf(coordenada) > -1)
        {
            alert('Ya hay un barco en esa casilla');
        }
        else
        {
            document.getElementById(coordenada + 'img').src = 'pato.png';
            posiciones.push(coordenada);
            socket.emit('juego:posiciones',posiciones);
            barcos =barcos-1;
        }
    
    }
    else
    {
        alert('Ya no puedes poner más barcos');
    }
    
}

function Tirar(boton)
{
    if(ValidarInicio() == true)
    {
            let coordenada = boton.getAttribute("id");
            let aux = coordenada.replace('Z','');
            if(posicionesEnemigas.indexOf(aux) > -1)
            {
                document.getElementById(coordenada + 'img').src = 'calavera.png';
            }
            else
            {
                document.getElementById(coordenada + 'img').src = 'olas.png';
            }
            socket.emit('juego:tiro',aux);
            turno = false;
            }
    else
    {
        alert('Espera a que todos los barcos estén colocados');
    }
    
}

function ValidarInicio()
{

    if(posiciones.length < barcosIniciales  || posicionesEnemigas.length < barcosIniciales)
    {
        return false;
    }
    else
    {
        return true;
    }
}
socket.on('juego:posiciones',function(posiciones)
{
    posicionesEnemigas = posiciones;
    console.log('Posiciones Enemigas:',posicionesEnemigas);
})

socket.on('juego:tiro',function(coordenada)
{
    if(posiciones.indexOf(coordenada) > -1)
    {
        document.getElementById(coordenada + 'img').src = 'calavera.png';
        vidas=vidas-1;
        if(vidas <= 0)
        {
            alert('Perdiste');
        }
    }
    else
    {
        document.getElementById(coordenada + 'img').src = 'equis.png';
    }
    
    
})
socket.on('tuTurno',function()
    {
        console.log('Tu turno');
        turno = true;
    })