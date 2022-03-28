(this["webpackJsonpexpense-tracker-app"]=this["webpackJsonpexpense-tracker-app"]||[]).push([[0],{27:function(e,t,n){},46:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(21),c=n.n(a),l=(n(27),n(11)),s=n(7),i=n(3),r=n(1),u=n(10),o=n.n(u),j=(n(46),n(0));var d=function(e){var t=e.date.toLocaleString("en-US",{month:"long"}),n=e.date.toLocaleString("en-US",{day:"2-digit"}),a=e.date.getFullYear();return Object(j.jsxs)("div",{className:"expense-date",children:[Object(j.jsx)("div",{className:"expense-date__month",children:t}),Object(j.jsx)("div",{className:"expense-date__year",children:a}),Object(j.jsx)("div",{className:"expense-date__day",children:n})]})};n(48);var b=function(e){var t="card "+e.className;return Object(j.jsx)("div",{className:t,children:e.children})};n(49);var x=function(e){return Object(j.jsx)("li",{children:Object(j.jsxs)(b,{className:"expense-item",children:[Object(j.jsx)(d,{date:e.date}),Object(j.jsxs)("div",{className:"expense-item__description",children:[Object(j.jsx)("h2",{children:e.title}),Object(j.jsxs)("div",{className:"expense-item__price",children:["$",e.amount]}),Object(j.jsx)("button",{className:"expense-item__delete",onClick:function(){e.onDelete(e.id)},children:"Delete Expense"})]})]})})};n(50);var O=function(e){function t(t){e.onDelete(t)}var n=Object(j.jsx)("h2",{className:"expenses-list__fallback",children:"No expenses found."});return e.items.length>0&&1===(n=e.items.map((function(e){return Object(j.jsx)(x,{id:e.id,title:e.title,amount:e.amount,date:e.date,onDelete:t},e.id)}))).length&&n.push(Object(j.jsx)("p",{className:"expenses-list__fallback",children:"Only ONE expense here."},"ONE")),Object(j.jsx)("ul",{className:"expenses-list",children:n})},v=n(22);n(51);var h=function(e){var t="0%";return e.maxValue>0&&(t=Math.round(e.value/e.maxValue*100)+"%"),Object(j.jsxs)("div",{className:"chart-bar",children:[Object(j.jsx)("div",{className:"chart-bar__inner",children:Object(j.jsx)("div",{className:"chart-bar__fill",style:{height:t}})}),Object(j.jsx)("div",{className:"chart-bar__label",children:e.label})]})};n(52);var p=function(e){var t=e.dataPoints.map((function(e){return e.value})),n=Math.max.apply(Math,Object(s.a)(t));return Object(j.jsx)("div",{className:"chart",children:e.dataPoints.map((function(e){return Object(j.jsx)(h,{value:e.value,maxValue:n,label:e.label},e.label)}))})};var m=function(e){var t,n=[{label:"Jan",value:0},{label:"Feb",value:0},{label:"Mar",value:0},{label:"Apr",value:0},{label:"May",value:0},{label:"Jun",value:0},{label:"Jul",value:0},{label:"Aug",value:0},{label:"Sep",value:0},{label:"Oct",value:0},{label:"Nov",value:0},{label:"Dec",value:0}],a=Object(v.a)(e.expenses);try{for(a.s();!(t=a.n()).done;){var c=t.value;n[c.date.getMonth()].value+=c.amount}}catch(l){a.e(l)}finally{a.f()}return Object(j.jsx)(p,{dataPoints:n})},f=(n(53),function(e){return Object(j.jsx)("div",{className:"expenses-filter",children:Object(j.jsxs)("div",{className:"expenses-filter__control",children:[Object(j.jsx)("label",{children:"Filter by year"}),Object(j.jsxs)("select",{value:e.selected,onChange:function(t){e.onChangeFilter(t.target.value)},children:[Object(j.jsx)("option",{value:"2022",children:"2022"}),Object(j.jsx)("option",{value:"2021",children:"2021"}),Object(j.jsx)("option",{value:"2020",children:"2020"}),Object(j.jsx)("option",{value:"2019",children:"2019"})]})]})})});n(54);var N=function(e){var t=Object(r.useState)(2019),n=Object(i.a)(t,2),a=n[0],c=n[1],l=e.items.filter((function(e){return e.date.getFullYear().toString()===a}));return Object(j.jsxs)(b,{className:"expenses",children:[Object(j.jsx)(f,{selected:a,onChangeFilter:function(e){c(e)}}),Object(j.jsx)(m,{expenses:l}),Object(j.jsx)(O,{items:l,onDelete:function(t){e.onDelete(t)}})]})};n(55);var _=function(e){var t=Object(r.useState)(""),n=Object(i.a)(t,2),a=n[0],c=n[1],l=Object(r.useState)(""),s=Object(i.a)(l,2),u=s[0],o=s[1],d=Object(r.useState)(""),b=Object(i.a)(d,2),x=b[0],O=b[1];return Object(j.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={title:a,amount:+u,date:new Date(x)};e.onSaveExpenseData(n),c(""),o(""),O("")},children:[Object(j.jsxs)("div",{className:"new-expense__controls",children:[Object(j.jsxs)("div",{className:"new-expense__control",children:[Object(j.jsx)("label",{children:"Title"}),Object(j.jsx)("input",{type:"text",value:a,onChange:function(e){c(e.target.value)}})]}),Object(j.jsxs)("div",{className:"new-expense__control",children:[Object(j.jsx)("label",{children:"Amount"}),Object(j.jsx)("input",{type:"number",min:"0.01",step:"0.01",value:u,onChange:function(e){o(e.target.value)}})]}),Object(j.jsxs)("div",{className:"new-expense__control",children:[Object(j.jsx)("label",{children:"Date"}),Object(j.jsx)("input",{type:"date",min:"2019-01-01",max:"2022-12-31",value:x,onChange:function(e){O(e.target.value)}})]})]}),Object(j.jsxs)("div",{className:"new-expense__actions",children:[Object(j.jsx)("button",{onClick:e.onCancel,children:"Cancel"}),Object(j.jsx)("button",{type:"submit",children:"Add Expense"})]})]})},g=(n(56),function(e){var t=Object(r.useState)(!1),n=Object(i.a)(t,2),a=n[0],c=n[1];return Object(j.jsx)("div",{className:"new-expense",children:a?Object(j.jsx)(_,{onSaveExpenseData:function(t){e.onAddExpenseData(t),c(!1)},onCancel:function(){c(!1)}}):Object(j.jsx)("button",{onClick:function(){c(!0)},children:"Add New Expense"})})}),D=function(){var e=Object(r.useState)(5),t=Object(i.a)(e,2),n=t[0],a=t[1];o.a.get("./expense-tracker-app/data.json").then((function(e){return console.log(e.data)})),o.a.get("./expense-tracker-app/data.json",{id:"3",name:"ilyas"}).then((function(e){return console.log(e.data)}));var c=[{id:"e1",title:"Toilet Paper",amount:94.12,date:new Date(2020,7,14)},{id:"e2",title:"New TV",amount:799.49,date:new Date(2021,2,12)},{id:"e3",title:"Car Insurance",amount:294.67,date:new Date(2021,2,28)},{id:"e4",title:"New Desk (Wooden)",amount:450,date:new Date(2021,5,12)}],u=Object(r.useState)(c),d=Object(i.a)(u,2),b=d[0],x=d[1];return Object(j.jsxs)("div",{children:[Object(j.jsx)(g,{onAddExpenseData:function(e){a(n+1),x((function(t){return[Object(l.a)(Object(l.a)({},e),{},{id:"e"+n})].concat(Object(s.a)(t))}))}}),Object(j.jsx)(N,{items:b,onDelete:function(e){x((function(t){return t.filter((function(t){return t.id!==e}))}))}})]})};c.a.render(Object(j.jsx)(D,{}),document.getElementById("root"))}},[[57,1,2]]]);
//# sourceMappingURL=main.1d8df69c.chunk.js.map