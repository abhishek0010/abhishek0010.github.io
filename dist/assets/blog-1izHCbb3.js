import{j as n}from"./index-DP9tZ9GB.js";const p={title:"Hello World - Welcome to My Blog",date:"2024-01-15",description:"My first blog post introducing this new site and what to expect.",tags:["personal","web-development"],draft:!1};function g(t){const e={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Welcome to My Blog!"}),`
`,n.jsx(e.p,{children:"I'm excited to finally launch this blog! This space will be my digital garden where I share my thoughts on software engineering, web development, and the occasional deep dive into interesting technical topics."}),`
`,n.jsx(e.h2,{children:"What to Expect"}),`
`,n.jsx(e.p,{children:"This blog is built with modern web technologies that I'm passionate about. I'll be writing about:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Web Development"}),": From React patterns to CSS tricks, I'll share what I learn along the way"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Software Architecture"}),": Discussions on building scalable and maintainable systems"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Personal Projects"}),": Behind-the-scenes looks at what I'm building"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Career Insights"}),": Lessons learned from my journey in tech"]}),`
`]}),`
`,n.jsx(e.h2,{children:"The Tech Stack"}),`
`,n.jsx(e.p,{children:"This site is built with a stack I genuinely enjoy working with:"}),`
`,n.jsx(e.pre,{children:n.jsxs(e.code,{className:"hljs language-typescript",children:[n.jsx(e.span,{className:"hljs-keyword",children:"const"}),` techStack = {
  `,n.jsx(e.span,{className:"hljs-attr",children:"framework"}),": ",n.jsx(e.span,{className:"hljs-string",children:"'React'"}),`,
  `,n.jsx(e.span,{className:"hljs-attr",children:"buildTool"}),": ",n.jsx(e.span,{className:"hljs-string",children:"'Vite'"}),`,
  `,n.jsx(e.span,{className:"hljs-attr",children:"styling"}),": ",n.jsx(e.span,{className:"hljs-string",children:"'Tailwind CSS'"}),`,
  `,n.jsx(e.span,{className:"hljs-attr",children:"content"}),": ",n.jsx(e.span,{className:"hljs-string",children:"'MDX'"}),`,
  `,n.jsx(e.span,{className:"hljs-attr",children:"hosting"}),": ",n.jsx(e.span,{className:"hljs-string",children:"'GitHub Pages'"}),`
};
`]})}),`
`,n.jsx(e.p,{children:"MDX allows me to write content in Markdown while seamlessly embedding React components when needed. It's the perfect balance of simplicity and power."}),`
`,n.jsx(e.h2,{children:"Why Start Blogging?"}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsx(e.p,{children:'"The best way to learn is to teach." - Richard Feynman'}),`
`]}),`
`,n.jsx(e.p,{children:"I've always found that explaining concepts helps solidify my own understanding. Writing forces me to organize my thoughts and fill in the gaps in my knowledge. Plus, if something I write helps even one person solve a problem, that's a win."}),`
`,n.jsx(e.h2,{children:"What's Next?"}),`
`,n.jsx(e.p,{children:"I have a few posts in the works already:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Setting up a modern React project with Vite"}),`
`,n.jsx(e.li,{children:"Building type-safe APIs with TypeScript"}),`
`,n.jsx(e.li,{children:"My development environment setup"}),`
`]}),`
`,n.jsx(e.p,{children:"Stay tuned, and thanks for stopping by! Feel free to reach out if you have questions or topics you'd like me to cover."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.p,{children:n.jsx(e.em,{children:"Happy coding!"})})]})}function m(t={}){const{wrapper:e}=t.components||{};return e?n.jsx(e,{...t,children:n.jsx(g,{...t})}):g(t)}const u=Object.freeze(Object.defineProperty({__proto__:null,default:m,frontmatter:p},Symbol.toStringTag,{value:"Module"})),w=`---
title: "Hello World - Welcome to My Blog"
date: "2024-01-15"
description: "My first blog post introducing this new site and what to expect."
tags: ["personal", "web-development"]
draft: false
---

# Welcome to My Blog!

I'm excited to finally launch this blog! This space will be my digital garden where I share my thoughts on software engineering, web development, and the occasional deep dive into interesting technical topics.

## What to Expect

This blog is built with modern web technologies that I'm passionate about. I'll be writing about:

- **Web Development**: From React patterns to CSS tricks, I'll share what I learn along the way
- **Software Architecture**: Discussions on building scalable and maintainable systems
- **Personal Projects**: Behind-the-scenes looks at what I'm building
- **Career Insights**: Lessons learned from my journey in tech

## The Tech Stack

This site is built with a stack I genuinely enjoy working with:

\`\`\`typescript
const techStack = {
  framework: 'React',
  buildTool: 'Vite',
  styling: 'Tailwind CSS',
  content: 'MDX',
  hosting: 'GitHub Pages'
};
\`\`\`

MDX allows me to write content in Markdown while seamlessly embedding React components when needed. It's the perfect balance of simplicity and power.

## Why Start Blogging?

> "The best way to learn is to teach." - Richard Feynman

I've always found that explaining concepts helps solidify my own understanding. Writing forces me to organize my thoughts and fill in the gaps in my knowledge. Plus, if something I write helps even one person solve a problem, that's a win.

## What's Next?

I have a few posts in the works already:

1. Setting up a modern React project with Vite
2. Building type-safe APIs with TypeScript
3. My development environment setup

Stay tuned, and thanks for stopping by! Feel free to reach out if you have questions or topics you'd like me to cover.

---

*Happy coding!*
`;function f(t){return n.jsx(n.Fragment,{})}function j(t={}){return n.jsx(w,{...t,children:n.jsx(f,{...t})})}const r=Object.assign({"/src/content/blog/hello-world.mdx":u}),y=Object.assign({"/src/content/blog/hello-world.mdx":j});function x(t){return(t.split("/").pop()||"").replace(".mdx","")}function b(t){const s=t.trim().split(/\s+/).length;return Math.max(1,Math.ceil(s/200))}function S(t){if(typeof t!="string")return"";const e=/^---[\s\S]*?---/;return t.replace(e,"").trim()}function c(t=!1){const e=[];for(const s in r){const i=r[s].frontmatter||{},o=x(s),a=y[s]||"",h=S(a),d={title:i.title||"Untitled",slug:o,date:i.date||new Date().toISOString().split("T")[0],description:i.description||"",tags:i.tags||[],draft:i.draft??!1,content:h,readingTime:b(h)};(!d.draft||t)&&e.push(d)}return e.sort((s,l)=>new Date(l.date).getTime()-new Date(s.date).getTime())}function k(t){return c(!0).find(s=>s.slug===t)||null}function M(t){const e=`/src/content/blog/${t}.mdx`,s=r[e];return(s==null?void 0:s.default)||null}function v(){const t=c(),e=new Set;return t.forEach(s=>{s.tags.forEach(l=>e.add(l))}),Array.from(e).sort()}function T(t,e,s=3){return c().filter(o=>o.slug!==t).map(o=>({post:o,score:o.tags.filter(a=>e.includes(a)).length})).filter(({score:o})=>o>0).sort((o,a)=>a.score-o.score).slice(0,s).map(({post:o})=>o)}export{v as a,k as b,M as c,T as d,c as g};
