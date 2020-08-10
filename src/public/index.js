function init() {
    let mouse = {
        click: false,
        move: false,
        pos: {x: 0, y: 0},
        pos_prev: false
    };

    //canvas
    const canvas = document.getElementById('drawing'); // El elemendo de mi html con id 'drawing'
    const context = canvas.getContext('2d');
    const width = window.innerWidth; // Obtenemos el ancho de la ventana de cualquier dispositivo
    const height = window.innerHeight - 50; // Altura de cualquier dispositivo

    canvas.width = width;
    canvas.height = height;

    const socket = io();

    canvas.addEventListener('mousedown', (e) => {
        mouse.click = true;
    });

    canvas.addEventListener('mouseup', (e) => {
        mouse.click = false;
    });

    canvas.addEventListener('mousemove', (e) => {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
    });

    socket.on('draw_line', data => {
        const line = data.line;
        context.beginPath();
        context.lineWith = 2;
        context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height);
        context.stroke();
    });

    function mainLoop(){
        if(mouse.click && mouse.move && mouse.pos_prev){
            socket.emit('draw_line', {line: [mouse.pos, mouse.pos_prev]}); // pos de donde comenso a dibijar y pos_prev donde termino
            mouse.move = false;
        }
        mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
        setTimeout(mainLoop, 25);
    }

    mainLoop();
    
    

}

document.addEventListener('DOMContentLoaded', init)