module.exports = (app, repository) => {

    app.get('/', async (req, res) => await res.json({ message: 'Funcionando! - Microsserviço Cliente' })) //apagavel

    app.get('/clientes', async (req, res, next) => {
        await repository.getAllClients((err, clientes) => {
            if (err) res.json({ "success": false, "message": "Deu algo errado!" });
            res.json({ "success": true, "message": "OK", "clientes": clientes });
            //res.json(clientes);
        });
    })

    app.get('/clientes/:id', async (req, res, next) => {
        await repository.getClientsById(req.params.id, (err, cliente) => {
            if (err) return next(err);
            if (cliente) {
                return res.json({ "success": true, "message": "Cliente retornado com sucesso!", "cliente": cliente })
            } else {
                return res.json({ "success": false, "message": "Cliente não encontrado" })
            }

        });
    })

    app.post('/clientes', async (req, res) => {

        if (!req.body.nome || !req.body.endereco || !req.body.cidade || !req.body.estado ||
            !req.body.cep || !req.body.telefone || !req.body.cpf || !req.body.rg ||
            !req.body.email || !req.body.data_nascimento) {
            return res.json({ "success": false, "message": "Dados inválidos" });
        }


        const nome = req.body.nome
        const endereco = req.body.endereco
        const cidade = req.body.cidade
        const estado = req.body.estado
        const cep = req.body.cep
        const telefone = req.body.telefone
        const cpf = req.body.cpf
        const rg = req.body.rg
        const email = req.body.email
        const data_nascimento = req.body.data_nascimento



        await repository.insertCliente({
            'nome': nome, 'endereco': endereco, 'cidade': cidade, 'estado': estado,
            'cep': cep, 'telefone': telefone, 'cpf': cpf, 'rg': rg, 'email': email, 'data_nascimento': data_nascimento
        }, (err, result) => {
            if (err) { res.json({ "success": false, "message": 'Erro ao cadastrar o cliente!' }) }
            else { res.json({ "success": true, "message": 'Cliente cadastrado com sucesso!' }) }
            //res.redirect('/?clientes=true')
        })
    })

    app.delete('/clientes/:id', async (req, res) => {
        await repository.deleteCliente(req.params.id, (err, cliente) => {
            if (err) return next(err);
            if (cliente) {
                return res.json({ "success": true, "message": 'Cliente excluído com sucesso!' })
            } else {
                return res.json({ "success": false, "message": 'Erro ao deletar o cliente!' });
            }

        })
    })

    app.put('/clientes/:id', async (req, res) => {
        const id = req.params.id
        const cliente = req.body
        await repository.updateCliente(id, cliente, (err, result) => {
            res.json({ "success": true, "message": 'Cliente atualizado com sucesso!' })
            if (err) res.json({ "success": false, "message": 'Erro ao atualizar os dados do cliente!' });
        })
    })

    app.patch('/clientes/:id', async (req, res) => {
        const id = req.params.id
        const updates = req.body
        await repository.patchCliente(id, updates, (err, result) => {
            if (err) res.json({ "success": false, "message": 'Erro ao atualizar os dados do cliente!' });
            else res.json({ "success": true, "message": 'Cliente atualizado com sucesso!' })
        })
    })

    require('../eureka-helper').registerWithEureka('cliente-service', 3000);
}
