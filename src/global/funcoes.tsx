import api from "../services/api";
import axios from 'axios';
import { setCookie } from 'nookies';
import Router from 'next/router';
import { CepProps } from "./types";

const URL_BING = 'https://dev.virtualearth.net'

function formatarCpf(value:any){
    if(!value || value == undefined) return '';

    const cnpjCpf = value.replace(/\D/g, '');
    if (cnpjCpf.length === 11) {
        return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
    } 
    return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
}


function formatarValor(v:any, casasDecimais = 2) {
    v = v == '' ? '0,00' : v;

    let isOldNumber = false;
    if (typeof v !== 'string') {
        v = v.toString();
        isOldNumber = true;
    }

    v = v.replace(/\D/g, '');

    if (!isOldNumber) {
        v = (parseFloat(v) / Math.pow(10, casasDecimais)).toFixed(casasDecimais);
    }

    const [integerPart, decimalPart] = v.split('.');
    let formattedValue = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (decimalPart) {
        formattedValue += ',' + decimalPart;
    } else {
        formattedValue += `,${'0'.repeat(casasDecimais)}`;
    }

    return formattedValue;
}


function formatarCep(cep:string){
    return cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1');
}

function somenteNumero(str:any){
    if (!str) return '';
    if (!isNaN(str)) return str;

    return str.replace(/[^0-9]/g,'');
}
 
async function buscaCep(cep:string):Promise<CepProps | null>{
    if(somenteNumero(cep).length < 8) return null;

    const data = await api.get(`https://viacep.com.br/ws/${cep}/json`)
    
    return data.data;
}


function setLogoutToken() {    
    try {                
        setCookie(undefined, '@gsfin-token','',{
            maxAge:-1,
            path:'/' 
        });  

        Router.push('/entrar');
    } catch (error) {
        console.log('logout ',error)
    }
}

function formataCelular(numero:string) {
    if(!numero) return '';
    
    const numeroLimpo = numero.replace(/\D/g, '');
  
    if (numeroLimpo.length < 11) {
        return numeroLimpo;
    }
  
    const codigoArea = numeroLimpo.slice(0, 2);
    const parte1 = numeroLimpo.slice(2, 7);
    const parte2 = numeroLimpo.slice(7, 11);
  
    return `(${codigoArea}) ${parte1}-${parte2}`;
}

function formataTelefone(telefone:string) {
    const phoneNumberInput = telefone
  
    const cleanedPhoneNumber = telefone.replace(/\D/g, '');
    const formattedPhoneNumber = `(${cleanedPhoneNumber.slice(0, 2)})${cleanedPhoneNumber.slice(2, 6)}-${cleanedPhoneNumber.slice(6, 10)}`;
    
    return formattedPhoneNumber;    
}

function numeroInicio(string:any):string | any {    
    if(!string) return '';
    
    string = string.trim(); 
    
    let numero:any = '';
    for (let i = 0; i < string.length; i++) {
        if (isNaN(string[i])) {
            break;
        }
        numero += string[i];
    }
      
    if(numero != '')
        numero = parseFloat(numero);
      
    return numero;
}

function formatarNumero(numero:string, decimalCount = 2) {
    if(!numero) return 0.00;
    // Remover todos os pontos de milhar e substituir a vírgula decimal por ponto
    const numeroFormatado = numero?.replace(/\./g, "").replace(",", ".");
    
    // Converter o número formatado para o tipo Number
    const numeroConvertido = Number(numeroFormatado);
    // Usar o método toFixed para formatar o número com 2 casas decimais
    const numeroFormatadoCom2CasasDecimais = numeroConvertido.toFixed(decimalCount);
    
    // Retornar o número formatado convertido para tipo Number
    return Number(numeroFormatadoCom2CasasDecimais);
}

const formatarValor2 = (amount:any, decimalCount = 2, decimal = ",", thousands = ".") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i:any = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

const saveFile = (content:any, fileName:string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
  
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

function convertBytes( bytes:number, decimals:number, only:string) {
    const K_UNIT = 1024;
    const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

    if(bytes== 0) return "0 Byte";
  
    if(only==="MB") return (bytes / (K_UNIT*K_UNIT)).toFixed(decimals) + " MB" ;
  
    let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
    let resp = parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i];
  
    return resp;
}

function extractFileName(filePath:string) {
    if(!filePath || filePath == undefined) return '';
    
    // Use the last occurrence of '/' or '\' to find the start of the file name
    const lastSlashIndex = Math.max(filePath.lastIndexOf('/'), filePath.lastIndexOf('\\'));
        
    const fileName = filePath.substring(lastSlashIndex + 1);
    
    const file = fileName.split('?');
    
    if(file.length > 0)
       return file[0]
    else 
      return fileName;
}

function extractFileType(filePath:string){
    if(!filePath) return ;

    const separator = filePath.split('.');

    if(separator[separator.length - 1] == ''){
        return '';
    }

    return separator[separator.length - 1]
}


const stripString = (value:any,size:number) => {
    if(!value) return '';

    if (value.length <= size) {
      return value; 
    }
      
    return value.substring(0, size - 3) + '...';
};

function formatDate(mask:string, dateString:string) {
    let hour = dateString.slice(11, dateString.length);

    dateString = dateString.slice(0, 10).trim();

    const dateRegex = /^(\d{4}-\d{2}-\d{2})|(\d{2}\/\d{2}\/\d{4})$/;
    if (!dateRegex.test(dateString)) {
        throw new Error('Formato de data inválido. Deve ser yyyy-mm-dd ou dd/mm/yyyy.');
    }

    let [year, month, day] = ['','','']
    const dateBRL = /(\d{2}\/\d{2}\/\d{4})$/;
    if (dateBRL.test(dateString)) {
        [day, month, year] = dateString.split(/[\/]/);
    }else{        
        [year, month, day] = dateString.split(/[\-]/);
    }

    // Substitui os caracteres especiais da máscara pelos componentes da data
    const formattedDate = mask.replace('dd', day).replace('mm', month).replace('yyyy', year);

    if (hour.trim() !== '') {
        return formattedDate + ' ' + hour;
    } else {
        return formattedDate;
    }
}
    

const formatDateInput = (date:Date) => {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${ano}-${mes}-${dia}`;
}  

const filtro = (dados:any = [], valor:any, campos:any = [], setListaAux:any) => {
    if(!dados) return ;

    if (valor) {
        const searchTerm = valor.trim().toLowerCase(); // Convertendo o termo de busca para minúsculas
        
        const filteredArr = dados.filter((item:any) =>{ 
            for(let i =0; i < campos.length; i++){
                if(item[campos[i].trim()].trim().toLowerCase().includes(searchTerm))
                    return true
            }
        });

        setListaAux(filteredArr);
    } else {        
        setListaAux(dados);
    }
}


function validaCPF(cpf:string) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let digit1 = (remainder < 2) ? 0 : 11 - remainder;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let digit2 = (remainder < 2) ? 0 : 11 - remainder;

    // Verifica se os dígitos verificadores são iguais aos do CPF
    return (parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2);
}

function validaCNPJ(cnpj:string) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cnpj.length !== 14) return false; // CNPJ deve ter 14 dígitos

    // Validação do primeiro dígito verificador
    let sum = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * peso;
        peso = (peso === 2) ? 9 : peso - 1;
    }
    let remainder = sum % 11;
    let digit1 = (remainder < 2) ? 0 : 11 - remainder;

    // Validação do segundo dígito verificador
    sum = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * peso;
        peso = (peso === 2) ? 9 : peso - 1;
    }
    remainder = sum % 11;
    let digit2 = (remainder < 2) ? 0 : 11 - remainder;

    // Verifica se os dígitos verificadores são iguais aos do CNPJ
    return (parseInt(cnpj.charAt(12)) === digit1 && parseInt(cnpj.charAt(13)) === digit2);
}

function validaCPFCNPJ(cpfCnpj:string) {
    let cAux = somenteNumero(cpfCnpj);
    if(cAux.length == 11){
        return validaCPF(cpfCnpj)
    }else if(cAux.length == 14){
        return validaCNPJ(cpfCnpj)
    }

    return true;    
}

const recuperaDadosLocal = (storage:string) => {
    try {
        const data = localStorage.getItem(storage)

        if(!data || data.length == 0){
            return '[]'
        }

        return data;        
    } catch (error) { 
        return '[]'
    }
}

const salvaDadosLocal = (storage:string,data:any) => {
    try {
        const usuariosData = JSON.stringify(data);
                
        localStorage.setItem(storage,usuariosData);

        return true;
    } catch (error) {
        return false;
    }    
}

const post = async (url:string, data:any) => {
    let nUrl = url;
    
    if(url.indexOf('db=') == -1){
        nUrl = nUrl + (url.indexOf('?') !== -1 ? '&' : `?`);
        nUrl = nUrl + `db=${localStorage.getItem('db')}`
    }    

    const result = await api.post(nUrl,data);

    if(result.data?.erro == '99'){
        setLogoutToken()
        return null;    
    }

    return result;
}


const get = async (url:string) => {
    let nUrl = url;
    
    if(url.indexOf('db=') == -1){
        nUrl = nUrl + (url.indexOf('?') !== -1 ? '&' : `?`);
        nUrl = nUrl + `db=${localStorage.getItem('db')}`
    }    
    
    const result = await api.get(nUrl);

    if(result.data?.erro == '99'){
        setLogoutToken()
        return null;    
    }

    return result;
}
/**essa função retonra out/2023  */
function obterDataAtualFormatadaMesAno() {
    // autor caio eduardo
    const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const data = new Date();
    const mesAtual = meses[data.getMonth()];
    const anoAtual = data.getFullYear();
    return `${mesAtual}/${anoAtual}`;
}
function obterPrimeiroDiaDoMesAtual() {
    const data = new Date();
    data.setDate(1); // Define o dia como 1, mantendo o mês e o ano inalterados.
    
    const dia = String(data.getDate()).padStart(2, '0'); // Obtém o dia com zero à esquerda, se necessário.
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Obtém o mês com zero à esquerda, pois o mês é base 0.
    const ano = data.getFullYear();
    
    return `${dia}.${mes}.${ano}`;
}


async function buscaDadosReceita(cnpjValue:any){
    if(!cnpjValue) return undefined

    if(!validaCNPJ(cnpjValue)) return undefined;
    
    try {
        const cnpj = somenteNumero(cnpjValue);

        if(cnpj.length < 14) return undefined;

        // return dadosExemplo;
        // const result = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, 
        const result = await axios.get(process.env.NEXT_PUBLIC_URL_API+`dados-receita?cnpj=${cnpj}`,        
            {
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json*'
                },
            }
        );

        if(result)
            return result.data
        

        return undefined
    } catch (error) {
        console.log('Erro ao buscar cnpj na receita',error)
        return undefined
    }
}

const trataCidade = (cidade?:string, uf?:string) => {
    if(cidade && uf) return cidade+', '+uf;

    if(cidade) return cidade;

    return uf;
}

export default {  
    formatarCpf,
    formatarValor,
    formatarCep,
    somenteNumero,
    buscaCep,
    formataCelular,
    formataTelefone,
    numeroInicio,
    formatarNumero,
    formatarValor2,
    saveFile,
    convertBytes,
    extractFileName,
    stripString,
    formatDate,
    formatDateInput,
    filtro,
    extractFileType,
    validaCPFCNPJ,
    recuperaDadosLocal,
    salvaDadosLocal,
    post,
    obterDataAtualFormatadaMesAno,
    obterPrimeiroDiaDoMesAtual,
    get,
    buscaDadosReceita,
    trataCidade
}