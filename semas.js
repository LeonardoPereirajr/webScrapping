const pup = require("puppeteer");

const url = "https://monitoramento.semas.pa.gov.br/simlam/ListarProcessos.aspx";

const search = "12094570000410";
let c = 1;
const list = [];
(async () => {

    const browser = await pup.launch({ headless: false });//abre o navegador mostrando o navegador
    const page = await browser.newPage();//abre uma nova aba
    console.log("Navegador aberto");

    await page.goto(url);//vai para a url
    console.log("Pagina aberta");

    await page.waitForSelector("#collapseBuscaAvancada");
    
    await page.click("#collapseBuscaAvancada");
    
    await page.type("#ctl00_baseBody_ddlCPFCPNJProprietario", search);//digita no campo de busca

    //clicar no botao de filtro com id="ctl00_baseBody_btnBuscaAvancada"

    await Promise.all([
        page.waitForNavigation(),
        page.click("#ctl00_baseBody_btnBuscaAvancada")
    ])


    //capturar os dados da grid com id="ctl00_baseBody_upGrid"

    const links = await page.$$eval("#ctl00_baseBody_upGrid", el => el.map(link => link.href));//pega todos os links da pagina

    
  await page.waitForTimeout(5000);//espera 5 segundos
    await browser.close();//fecha o navegador

})();