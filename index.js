const pup = require("puppeteer");

const url = "https://www.mercadolivre.com.br/";

const search = "macbook";
let c = 1;
const list = [];
(async () => {

    const browser = await pup.launch({ headless: false });//abre o navegador mostrando o navegador
    const page = await browser.newPage();//abre uma nova aba
    console.log("Navegador aberto");

    await page.goto(url);//vai para a url
    console.log("Pagina aberta");

    await page.waitForSelector("#cb1-edit");
    
    await page.type("#cb1-edit", search);//digita no campo de busca

    await Promise.all([ 
        page.waitForNavigation(),
        page.click(".nav-search-btn")
    ])

  const links = await page.$$eval(".ui-search-result__image > a", el => el.map(link => link.href));//pega todos os links da pagina
    
  for(const link of links){
    console.log("Pagina", c);
    await page.goto(link);//vai para o link
    await page.waitForSelector(".ui-pdp-title");//espera o seletor aparecer
    
    const title = await page.$eval(".ui-pdp-title", el => el.innerText);//pega o titulo
    const price = await page.$eval(".andes-money-amount__fraction", element => element.innerText);//pega o preço

    const seller = await page.evaluate(() => {
        const el = document.querySelector(".ui-pdp-seller__link-trigger");
        if(!el) return null;
        return el.innerText;
    });//pega o vendedor

    const obj = {};//cria um objeto com os dados
    obj.title = title;
    obj.price = price;
    obj.link = link;
    (seller ? obj.seller = seller : "");

    list.push(obj);//adiciona o objeto na lista

    c++;
}

    console.log(list);//mostra a lista

  await page.waitForTimeout(2000);//espera 2 segundos
    await browser.close();//fecha o navegador

})();