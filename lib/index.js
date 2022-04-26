import{parseHTML as h}from"linkedom";const f=n=>{const t=n.match(/tv\/(\w+)/);if(t?.length)return t[1]},x=async({url:n,language:t="en"})=>{const i=f(n),e=await(await fetch(`https://api.viki.io/v4/containers/${i}/descriptions/${t}.json?html=true&app=100000a`)).json();return h(`
    <!doctype html>
    <html lang="en">
    <head>
        <title>Hello SSR</title>
    </head>
    <body>
        ${e.description.viki[t]}
    </body>
    </html>
  `).document.body.textContent},b=async({url:n,language:t="en"})=>{const s=await(await fetch(n,{headers:{"content-language":t,"accept-language":t}})).text(),{document:e}=h(s),a=e.querySelector("h1"),c=e.querySelector("h1").parentElement.nextElementSibling,y=e.querySelector("main img").getAttribute("src").split("?")[0],[l,p,m]=Array.from(e.querySelector("h1").parentElement.nextElementSibling.nextElementSibling.children).map(r=>r.textContent),[d,u]=Array.from(e.querySelector("h1").parentElement.parentElement.nextElementSibling.children).map(r=>{const g=Array.from(r.querySelectorAll("span"));return g.length?g.map(o=>{if(o&&o.textContent)return o.textContent.split(",")}):[]}).flat(),S=await x({url:n,language:t});return{title:a?a.textContent:"",originalTitle:c?c.textContent:"",image:y,year:l&&l.replace(/\D/g,""),rating:p&&p.replace(/\D/g,""),episodes:m&&m.replace(/\D/g,""),genres:d,cast:u,synopsis:S}};export{b as getInfo};
