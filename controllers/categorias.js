const { response, request } = require('express');

const Categoria = require('../models/categoria'); 

// Obtener todas las categorias - paginado - populate
const obtenerCategorias = async ( req = request, res = response ) => {
    const { limite = 5, desde = 0 } = req.query; // Obtenemos los "query params". Paginacion
    const query = { estado: true }; // Se buscan los usuarios "activos"

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate('usuario', 'nombre') // Se obtiene el usuario que creo la categoria
            .skip( Number(desde) )
            .limit( Number(limite) ) // Se castea a number, porque en la solicitud viene como string
    ]);

    res.json({
        total, 
        categorias
    });
}

// Obtener una categoria especifica 
const obtenerCategoria = async ( req = request, res = response ) => {
    const { id } = req.params; // Se obtiene el id de los parametros
    const categoria = await Categoria.findById( id ) // Se busca la categoria por id
        .populate('usuario', 'nombre'); 

    res.json( categoria );
}

// Crear categorias
const crearCategoria = async ( req = request, res = response ) => {
    
    try {
        const nombre = req.body.nombre.toUpperCase(); // Se obtiene el nombre que viene del body

        // Se valida si la categoria ya esta creada
        const categoriaDB = await Categoria.findOne({ nombre }); // Se busca la categoria en la base de datos

        if ( categoriaDB ) { // Si ya existe la categoria en la base de datos
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`
            });
        }

        // Generar la data a guadar
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        // Guardar la categoria en la base de datos
        const categoria = new Categoria( data );
        await categoria.save();

        // Respuesta
        res.status(201).json( categoria );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ // Error del servidor
            msg: 'Algo salio mal'
        })
    }

}

// Actualizar categoria
const actualizarCategoria = async ( req = request, res = response ) => {
    const { id } = req.params; // Se extrae el id de la categoria que viene de la solicitud
    const { estado, usuario, ...data } = req.body;

    console.log(req.body);

    data.nombre = data.nombre.toUpperCase(); // Se pasa a mayuscula el nombre de la categoria
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, {new: true} ); // Actualiza los campos de acuerdo al id 

    res.json( categoria );
}

// Eliminar categoria - cambiar el estado: "false"
const eliminarCategoria = async ( req = request, res = response ) => {
    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, {estado:false}, {new:true} );

    res.json( categoriaBorrada );
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}