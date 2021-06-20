
const fs = require("fs");
let menu = require("./main_menu.json");
const Handlebars = require("handlebars");
let faq_infert = require("./faq_infert.json")
let gyn_faq = require("./gyn_faq.json")
Handlebars.registerPartial(
    "navbar", fs.readFileSync("navbar.hbs").toString()
)
Handlebars.registerPartial(
    "navbar_item", fs.readFileSync("navbar_item.hbs").toString()
)
Handlebars.registerPartial(
    "footer", fs.readFileSync("footer.hbs").toString()
)
Handlebars.registerPartial(
    "team_mem",fs.readFileSync("team_mem.hbs").toString()
)
Handlebars.registerPartial(
    "qa",fs.readFileSync("qa.hbs").toString()
)

function render(infile,outfile,data){
    const template = Handlebars.compile(fs.readFileSync(infile).toString());
    fs.writeFileSync(outfile,template(data));   
}


render("index.hbs","dist/index.html",{"menu" : menu});

var pages = require("./pages_gen.json");
pages.map(p=>{
    Handlebars.registerPartial(
        "pagecontent", fs.readFileSync(p.templ).toString()
    );
    render("page_template.hbs","dist/"+p.out,{title : p.title ,menu :menu ,faq_infert:faq_infert,gyn_faq:gyn_faq});
});