const express = require('express')
const router = express.Router();

//RETORNA OS DADOS DO PEDIDO
router.get('/', (req,res, next) => {
    res.status(200).send(
        {mensagem : 'get ou retorno da rota de pedidos'}
    )
})
// INSERE OS DADOS DO PEDIDO
router.post('/' , (req, res, next) => {
    res.status(201).send(
        {mensagem : 'voce  inseriu da rota de pedidos'}
    )
} )
//ALTERA UM PEDIDO
router.patch ('/', (res, req,next) => {
    res.status(201).send(
        {mensagem : 'patch da rota de pedidos'} 
    )
} )
//DELETA OS DADOS DO PEDIDO
router.delete ('/', (res, req,next) => {
    res.status(201).send(
        {mensagem : 'delete da rota de pedidos'} 
    )
}
)
//RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_product', (req, res, next)=>{
    const id = req.params.id_product
    if (id === 'especial'){
    res.status(200).send({
        mensagem : 'PARABENS VOCE DESCOBRIU UM ID EXCLUSIVO ' , 
        id : id 
       
    })}
    else{
        res.status(200).send({
            mensagem : 'Usando o id do produto ' , 
    })
    }
})
module.exports = router