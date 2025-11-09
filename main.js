const http = require('node:http');
const os = require('node:os');

const bytestogb = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2);

const informaciondelsistema = {
    nombreSo: os.type(),
    versionSo: os.release(),
    arquitectura: os.arch(),
    memoriaTotal: `${bytestogb(os.totalmem())} GB`,
    memoriaLibre: `${bytestogb(os.freemem())} GB`,
    procesadores: os.cpus().length,
    modeloDelProcesador: os.cpus()[0].model,
    tiempoActivo: `${(os.uptime() / 3600).toFixed(2)} horas`,
    nombreHost: os.hostname(),
};

const port = 6767;

const generalHTML = (info) => {
    return `
    <html> 
    <head><title>Información del Sistema</title></head>
    <body>
<style>
    * {
        text-align: center;

    }

    h1 {
        color: red;
        font-size: 24px;
        
    }

    ul {
     list-style: none;    
    padding-left: 0;     
    }

    ul li {
        margin-top: 10px;
        font-size: 30px;
        margin-top: 10px;
        font-size: 30px;
    }
</style>
    
        <h1>Información del Sistema</h1>
        <ul>
            <li>Nombre SO: ${info.nombreSo}</li>
            <li>Versión SO: ${info.versionSo}</li>
            <li>Arquitectura: ${info.arquitectura}</li>
            <li>Memoria Total: ${info.memoriaTotal}</li>
            <li>Memoria Libre: ${info.memoriaLibre}</li>
            <li>Procesadores: ${info.procesadores}</li>
            <li>Modelo del Procesador: ${info.modeloDelProcesador}</li>
            <li>Tiempo Activo: ${info.tiempoActivo}</li>
            <li>Nombre del Host: ${info.nombreHost}</li>
        </ul>
    </body>
    </html>
    `;
};


console.log("Información del sistema:");
console.log(informaciondelsistema);

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    const html = generalHTML(informaciondelsistema);
    res.end(html);
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}/`);
});
