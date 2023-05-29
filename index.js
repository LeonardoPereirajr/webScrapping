const pup = require("puppeteer");

const url = "https://www.mercadolivre.com.br/";

const search = "macbook";
const c = 1;
(async () => {

    const browser = await pup.launch({ headless: false });//abre o navegador mostrando o navegador
    const page = await browser.newPage();//abre uma nova aba
    await page.goto(url);//vai para a url

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
    c++;
}

  await page.waitForTimeout(2000);//espera 2 segundos
    await browser.close();//fecha o navegador

})();