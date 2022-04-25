import{parseHTML as i}from"linkedom";const S=e=>e.match(/tv\/(\w+)/)[1],x=async({url:e,language:n})=>{const r=S(e),t=await(await fetch(`https://api.viki.io/v4/containers/${r}/descriptions/${n}.json?html=true&app=100000a`)).json();return i(`
    <!doctype html>
    <html lang="en">
    <head>
        <title>Hello SSR</title>
    </head>
    <body>
        ${t.description.viki[n]}
    </body>
    </html>
  `).document.body.textContent},b=async({url:e,language:n="en"})=>{const s=await(await fetch(e,{headers:{"content-language":n,"accept-language":n}})).text(),{document:t}=i(s),a=t.querySelector("h1"),c=t.querySelector("h1").parentElement.nextElementSibling,l=t.querySelector("main img").getAttribute("src").split("?")[0],[p,m,g]=Array.from(t.querySelector("h1").parentElement.nextElementSibling.nextElementSibling.children).map(o=>o.textContent),[h,d]=Array.from(t.querySelector("h1").parentElement.parentElement.nextElementSibling.children).map(o=>Array.from(o.querySelectorAll("span")).map(u=>u.textContent.split(","))).flat(),y=await x({url:e,language:n});return{title:a.textContent,originalTitle:c.textContent,image:l,year:p.replace(/\D/g,""),rating:m.replace(/\D/g,""),episodes:g.replace(/\D/g,""),genres:h,cast:d,synopsis:y}};export{b as getInfo};
