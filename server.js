{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const axios = require('axios');\
const cors = require('cors');\
\
const app = express();\
app.use(cors());\
app.use(express.json());\
\
app.post('/consultar', async (req, res) => \{\
  try \{\
    const \{ gtin, latitude, longitude, raio, horas \} = req.body;\
    \
    const url = 'https://precodahora.ba.gov.br/produto';\
    \
    const response = await axios(\{\
      method: 'GET',\
      url: url,\
      params: \{\
        gtin: gtin,\
        horas: horas || 72,\
        latitude: latitude,\
        longitude: longitude,\
        raio: raio || 15,\
        precomax: 0,\
        precomin: 0,\
        ordenar: 'preco.asc',\
        pagina: 1,\
        processo: 'carregar',\
        totalRegistros: 0,\
        totalPaginas: 0,\
        pageview: 'lista'\
      \},\
      headers: \{\
        'Accept': 'application/json, text/javascript, */*; q=0.01',\
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',\
        'X-Requested-With': 'XMLHttpRequest',\
        'Referer': 'https://precodahora.ba.gov.br/'\
      \}\
    \});\
    \
    res.json(response.data);\
    \
  \} catch (error) \{\
    console.error('Erro:', error.message);\
    res.status(500).json(\{ \
      erro: error.message,\
      status: error.response?.status,\
      data: error.response?.data\
    \});\
  \}\
\});\
\
app.get('/health', (req, res) => \{\
  res.json(\{ status: 'ok', timestamp: new Date().toISOString() \});\
\});\
\
const PORT = process.env.PORT || 3000;\
app.listen(PORT, () => \{\
  console.log(`Servidor Pre\'e7o da Hora rodando na porta $\{PORT\}`);\
\});}