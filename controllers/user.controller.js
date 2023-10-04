const {response,request} = require('express')

const usersGet= (req=request, res=response) => {
    const query = req.query;
    res.json({
        msg:'get api - controlador',
        query
    })
}
const usersPut =(req, res=response) => {
    const {id} = req.params;
    res.json({
        msg:'put World! controlador',
        id
    })
}
const usersPost =(req, res=response) => {

    const body = req.body;

    res.status(201).json({
        msg:'post controlador',
        body
    })
}

const usersDelete =(req, res=response) => {
    const {id} = req.params;
    res.json({
        msg:'delete World!',
        id
    })
}
module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}