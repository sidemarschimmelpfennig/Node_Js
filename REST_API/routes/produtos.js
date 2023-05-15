const express = require('express')
const router = express.Router();

//RETORNA OS DADOS DO PRODUTO
router.get('/', (req,res, next) => {
    res.status(200).send(
        {mensagem : 'get da rota de produtos'}
    )
})
// INSERE OS DADOS DO PRODUTO
router.post('/' , (req, res, next) => {
   const product = {
        nome : req.body.nome,
        preco : req.body.preco
   }
    res.status(201).send(
        {mensagem : 'Insere  produtos',
        produtoCriado : product
    }
    )
} )
//ALTERA UM PRODUTO
router.patch ('/', (res, req,next) => {
    res.status(201).send(
        {mensagem : 'patch da rota de produtos'} 
    )
} )
//DELETA OS DADOS DO PRODUTO
router.delete ('/', (res, req,next) => {
    res.status(201).send(
        {mensagem : 'delete da rota de produtos'} 
    )
}
)
//RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_product', (req, res, next)=>{
    const id = req.params.id_product
    if (id === 'especial'){
    res.status(200).send({
        mensagem : 'PARABENS vOCE DESCOBRIU UM ID EXCLUSIVO ' , 
        id : id 
       
    })}
    else{
        res.status(200).send({
            mensagem : 'Usando o id do produto ' , 
    })
    }
})
module.exports = router
