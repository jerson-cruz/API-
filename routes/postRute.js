const express = require('express');
const Post = require("../models/Post_model");
const router = express.Router();

router.post('/', async (req,res) => {
    const post =  new Post({ 
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(error){
        res.json({message:error});

    }
});

router.get('/:postId', async (req,res) => {
    
    try {
        const post= await Post.findById(req.params.postId);
        res.json(post);
    }catch(error){
        res.json({message:error});

    }
});



router.delete('/:postId', async (req, res) => {    
    try {
        // Usa remove, pero asegúrate de que se maneje correctamente
        const removedPost = await Post.deleteOne({ _id: req.params.postId });

        // Verifica si se eliminó algún documento
        if (removedPost.deletedCount > 0) {
            res.json({ message: 'Post eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Post no encontrado' });
        }
    } catch (error) {
        // Envía el mensaje de error como cadena para una mejor legibilidad
        res.status(500).json({ message: error.message || 'Error desconocido' });    
    }
});

router.patch('/:postId', async (req,res) => {
    
    try {
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
        {$set: {title: req.body.title, description: req.body.description}});
        res.json(updatePost);
    }catch(error){
        res.json({message:error});

    }
});

module.exports = router