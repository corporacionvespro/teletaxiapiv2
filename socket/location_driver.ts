
module.exports  =  ( io : any) => {
    const namespace = io.of('/location_driver');
    namespace.on('connection', function (socket : any) {
      
        socket.on('position', function (data : any) {
            console.log(data)
            const j = JSON.parse(data)
            namespace.emit(`position/${j.id}`, {id: j.id,lat: j.lat, lng: j.lng, dir: j.dir})
        });


        // socket.on('chat', function (data : any) {
        //     console.log(data)
        //     const j = JSON.parse(data)
        //     namespace.emit(`chat/${j.id}`, {id: j.id, message: j.message, rol: j.rol})
        // });

        socket.on('position_web', function (data : any) {
            console.log(data)
            const j = JSON.parse(data)
            namespace.emit(`position_web`, 
            {unidad: j.unidad, lat: j.lat, lng: j.lng, nombres: j.nombres})

        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
}

  