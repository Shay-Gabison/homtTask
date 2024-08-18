{\rtf1\ansi\ansicpg1252\cocoartf2757
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const axios = require('axios');\
const rateLimit = require('express-rate-limit');\
const cors = require('cors');\
\
const app = express();\
app.use(cors());\
app.use(express.json());\
\
const fetchMetadata = async (url) => \{\
  try \{\
    const response = await axios.get(url);\
    const html = response.data;\
    const titleMatch = html.match(/<title>(.*?)<\\/title>/);\
    const title = titleMatch ? titleMatch[1] : 'No title found';\
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/);\
    const description = descriptionMatch ? descriptionMatch[1] : 'No description found';\
    const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/);\
    const image = imageMatch ? imageMatch[1] : 'No image found';\
    \
    return \{ title, description, image \};\
  \} catch (err) \{\
    throw new Error('Failed to fetch metadata');\
  \}\
\};\
\
const limiter = rateLimit(\{\
  windowMs: 1000,\
  max: 5,\
  message: 'Too many requests, please try again later.',\
\});\
\
app.post('/fetch-metadata', limiter, async (req, res) => \{\
  const \{ urls \} = req.body;\
  try \{\
    const results = await Promise.all(urls.map(url => fetchMetadata(url)));\
    res.json(results);\
  \} catch (err) \{\
    res.status(500).json(\{ error: err.message \});\
  \}\
\});\
\
app.listen(5000, () => \{\
  console.log('Server running on port 5000');\
\});\
}