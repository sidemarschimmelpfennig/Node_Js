const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool

router.get('/', (req,res, next) => {
   mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error : error})}
        conn.query(
            'SELECT * FROM produtos ; ',
            (error, result, field) => {
                if (error) { return res.status(500).send({error : error})}
                const response = {
                    quantidade : result.length,
                    produtos : result.map(prod => {
                        return {
                            id_produto : prod.id_produtos,
                            nome : prod.nome,
                            preco : prod.preco,
                            request : {
                                tipo : 'GET',
                                descricao : 'Retorna todos os Produtos',
                                url: 'http://localhost:3000/products/' + prod.id_produtos,
                            } 

                        }


                    }

                    ) 
                }
                return res.status(200).send({response : response})
            }
        )

    })
})

router.get('/:id_produtos', (req,res, next) => {
    mysql.getConnection((error, conn) => {
         if (error) {return res.status(500).send({ error : error})}
         conn.query(
             'SELECT * FROM produtos WHERE id_produtos = ? ',
             [req.params.id_produtos],
             (error, result, field) => {
                 if (error) { return res.status(500).send({error : error})}
                 return res.status(200).send({response : result})
             }
         )
 
     })
 })

router.post('/' , (req, res, next) => {
   mysql.getConnection((error, conn)=>{
    if (error){return res.status(500).send({error : error})}
    conn.query(
        'INSERT INTO produtos(nome, preco) VALUES (?,?)',
        [req.body.nome, req.body.preco],
        (error, result, field)=>{
            conn.release()
            if (error){return res.status(500).send({error : error})}
            const response = {
                mensagem : 'Produto Inserido com Sucesso!!',
                produtoCriado :{
                        id_produto : result.id_produtos,
                        nome : req.body.nome,
                        preco : req.body.preco,
                        request : {
                            tipo : 'POST',
                            descricao : 'Insere um Produto',
                            url: 'http://localhost:3000/products/',
                        } 

                    }


                }
                
            res.status(201).send({response : response,})
        }
    )
   })

 
} )

router.patch ('/', (req, res,next) => {
   mysql.getConnection((error, conn)=>{
    if (error){return res.status(500).send({error : error})}
    conn.query(
        `UPDATE produtos
            SET nome        = ?,
                preco       = ?
         WHERE  id_produtos = ? 
        `,
        [
            req.body.nome,
            req.body.preco,
            req.body.id_produtos 
        ],
        (error, result, field)=>{
            conn.release()
            if (error){return res.status(500).send({error : error})}

            res.status(202).send(
                 { mensagem  : 'Produto Alterado Com Sucesso !! '
            }
            )

        }
    )
   })
} )

router.delete ('/', (req, res,next) => {
    mysql.getConnection((error, conn)=>{
        if (error){return res.status(500).send({error : error})}
        conn.query(
            'DELETE  FROM produtos WHERE id_produtos = ?', [req.body.id_produtos ],
            (error, result, field)=>{
                conn.release()
                if (error){return res.status(500).send({error : error})}
                res.status(202).send(
                     { mensagem  : 'Produto Removido Com Sucesso !! '
                }
                )
    
            }
        )
       })
}
)

module.exports = router
