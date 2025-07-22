import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenidos a mi API de productos'
    });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));