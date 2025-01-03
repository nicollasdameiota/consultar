const aceito = document.getElementById('aceito');
const naoAceito = document.getElementById('nao-aceito');
const conteudo = document.getElementById('conteudo');
const termoConsentimento = document.getElementById('termo-consentimento');

aceito.addEventListener('click', () => {
conteudo.style.display = 'block';
termoConsentimento.style.display = 'none';
});

naoAceito.addEventListener('click', () => {
alert('Acesso negado.');
});

function formatarCPF(campo) {
campo.value = campo.value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatarCartao(campo) {
campo.value = campo.value.replace(/[^0-9]/g, '').replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
}

const form = document.getElementById('form-cartao');
const btnVerificar = document.getElementById('btn-verificar');
const resultado = document.getElementById('resultado');

btnVerificar.addEventListener('click', (e) => {
e.preventDefault();

const nome = document.getElementById('nome').value;
const cpf = document.getElementById('cpf').value;
const numeroCartao = document.getElementById('numero-cartao').value;
const codigoCartao = document.getElementById('codigo-cartao').value;

if (!nome || !cpf || !numeroCartao || !codigoCartao) {
alert('Preencha todos os campos!');
return;
}

if (!nome.match(/^[a-zA-Z\s]+$/)) {
alert('Nome inválido.');
return;
}

if (!validarCPF(cpf)) {
alert('CPF inválido.');
return;
}

if (!numeroCartao.match(/^\d{16}$/)) {
alert('Número do cartão inválido.');
return;
}

if (!codigoCartao.match(/^\d{3}$/)) {
alert('Código de segurança inválido.');
return;
}

const cartaoClonado = verificarClonagem(numeroCartao, codigoCartao);
if (cartaoClonado) {
resultado.textContent = 'Cartão clonado!';
} else {
resultado.textContent = 'Cartão não clonado.';
}
});

function validarCPF(cpf) {
cpf = cpf.replace(/[^\d]+/g,'');
if(cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
let sum = 0;
for(let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
let result = (sum * 10) % 11;
if(result === 10) result = 0;
if(result !== parseInt(cpf.charAt(9))) return false;
sum = 0;
for(let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
result = (sum * 10) % 11;
if(result === 10) result = 0;
return result === parseInt(cpf.charAt(10));
}

function verificarClonagem(numeroCartao, codigoCartao) {
return Math.random() < 0.5;
}
