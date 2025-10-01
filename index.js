const express = require('express');
const PrecoDaHora = require('precodahora-api');

const app = express();
const port = 3000; 
const client = new PrecoDaHora();

// Middleware para permitir requisições de qualquer origem (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoint principal para sugestão de produtos
// Uso: GET /sugestao?item=PRODUTO
app.get('/sugestao', async (req, res) => {
    const { item } = req.query;

    if (!item) {
        return res.status(400).json({ 
            error: "Parâmetro 'item' é obrigatório.",
            exemplo: "/sugestao?item=LEITE"
        });
    }

    try {
        const resultado = await client.sugestao({ item });
        // A API do Preço da Hora geralmente retorna em "data"
        res.json(resultado.data); 
    } catch (error) {
        console.error("Erro na consulta à API:", error);
        res.status(500).json({ error: "Erro ao consultar a API do Preço da Hora." });
    }
});

app.get('/', (req, res) => {
    res.send('API Proxy Preço da Hora Bahia está rodando. Use o endpoint /sugestao?item=...');
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
