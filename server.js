const app = require('./src/app');
const porta = 3000;

app.listen(porta, () => {
    console.log(`O servidor esta rodando em http://localhost:${porta}`)
});