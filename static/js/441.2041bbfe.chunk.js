"use strict";(self.webpackChunkastonreact=self.webpackChunkastonreact||[]).push([[441],{6653:function(e,a,t){t.d(a,{x:function(){return s}});t(2791);var n=t(7689),r=t(184),s=function(){var e=(0,n.s0)();return(0,r.jsx)("div",{className:"backButton__wrapper",children:(0,r.jsx)("button",{className:"button backButton",onClick:function(){return e(-1)},children:"GO BACK"})})}},1046:function(e,a,t){t.d(a,{U:function(){return n}});var n=function(){var e=new Date;e.getDate(),e.getMonth(),e.getFullYear(),e.getHours(),e.getMinutes(),e.getSeconds();return(new Date).toISOString()}},8441:function(e,a,t){t.r(a),t.d(a,{default:function(){return v}});var n=t(9439),r=t(2791),s=t(184),i=function(e){var a=e.onclickHandler,t=e.buttonClass;return(0,s.jsx)("button",{onClick:function(){return a()},className:t,children:(0,s.jsx)("span",{className:"closeButton__content"})})};var c=t.p+"static/media/arrow_button.f2dccfb270d77bbc15947f8512173088.svg",l=function(e){var a=e.onClickHandler,t=e.direction,n=e.buttonClass,r=e.isDisabled;return(0,s.jsx)("button",{disabled:r||!1,onClick:a,className:n?"arrowButton arrowButton__".concat(t," ").concat(n):"arrowButton arrowButton__".concat(t),children:(0,s.jsx)("img",{src:c,alt:"arrowButton"})})},o=function(e){var a=e.data,t=e.gameName,c=e.className,o=(0,r.useState)(!1),d=(0,n.Z)(o,2),u=d[0],g=d[1],m=(0,r.useState)(null),_=(0,n.Z)(m,2),h=_[0],f=_[1],x=(0,r.useState)(0),j=(0,n.Z)(x,2),v=j[0],b=j[1],p=function(e,a){"right"===a&&(b((function(e){return e+1})),console.log("SLIDE TO RIGHT")),"left"===a&&(b((function(e){return e-1})),console.log("SLIDE TO left")),console.log(e,a)},S=function(e){if(!e)return g(!1),void f(null);g((function(e){return!e})),f(u?null:e)};return console.log(v),a&&a.length?(0,s.jsxs)("div",{className:c?"".concat(c," gameSlider"):"gameSlider",children:[(0,s.jsx)(l,{buttonClass:"gameSlider__controlls",onClickHandler:function(){p(a.length,"left")},direction:"left",isDisabled:0===v}),u&&h&&(0,s.jsxs)("div",{className:"gameSlider__popup",children:[(0,s.jsx)(i,{onclickHandler:S,buttonClass:"gameSlider__closeButton"}),(0,s.jsx)("img",{className:"gameSlider__image_fullscreen",src:h,alt:"gameScreenshot"})]}),(0,s.jsx)("div",{className:"gameSlider__wrapper",children:a&&a.map((function(e,a){return(0,s.jsx)("div",{className:"gameSlider__item",onClick:function(){return S(e)},style:{transform:"translateX(-".concat(100*v,"%)")},children:(0,s.jsx)("img",{className:"gameSlider__image",src:e,alt:"".concat(t,"_").concat(a)})},a)}))}),(0,s.jsx)(l,{buttonClass:"gameSlider__controlls",onClickHandler:function(){p(a.length,"right")},direction:"right",isDisabled:v===a.length-2})]}):(0,s.jsx)("div",{className:"gameSlider__message",children:"There are no scrennshots yet"})},d=t(1046),u=t(6653),g=function(e){var a=e.name,t=e.gameId,n=e.rating,r=e.releaseDate,i=e.image,c=e.description,l=e.isAuth,g=e.isInFavorites,m=e.triggerUpdate,_=e.triggerGet,h=e.email,f=e.dataScreenshots;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(u.x,{}),(0,s.jsxs)("div",{className:"game",children:[(0,s.jsx)("h2",{className:"game__name",children:a}),(0,s.jsxs)("span",{className:"game__rating",children:["Rating: ",n,"/5"]}),(0,s.jsxs)("span",{className:"game__date",children:["Released date:",r]}),(0,s.jsx)("img",{className:"game__img",src:i,alt:a}),(0,s.jsx)("button",{disabled:!l||g,className:"game__add",onClick:function(){m({id:String(t),email:h,name:a,background_image:i,date:(0,d.U)()}),_({email:h})},children:g?"In Favorites":"Add to Favorite"}),(0,s.jsx)(o,{className:"game__screenshotSlider",data:f,gameName:a}),(0,s.jsx)("span",{className:"game__description",children:c})]})]})},m=t(2196),_=t(6579),h=t(9690),f=t(3331);function x(e){var a,t=e.gameId,r=(0,_.o9)(),i=r.email,c=r.isAuth,l=(0,m.vO)({gameId:t}),o=l.data,d=l.isLoading,u=l.isFetching,x=l.isSuccess,j=l.isError,v=l.error,b=(0,h.VP)({email:i}),p=b.data,S=b.isSuccess,N=(0,m.Od)({gameId:t}).data,k=null===N||void 0===N?void 0:N.results.map((function(e){return e.image})),C=(0,h.Gz)(),w=(0,n.Z)(C,1)[0],I=(0,h.LA)(),D=(0,n.Z)(I,1)[0];if(c){if(d||u)a=(0,s.jsx)(f.a,{});else if(x&&S){var B=Object.values(p).map((function(e){return Number(e.id)})).includes(t);a=(0,s.jsx)(g,{name:o.name,gameId:t,rating:o.rating,releaseDate:o.released,image:o.background_image,description:o.description_raw,isAuth:c,isInFavorites:B,triggerUpdate:w,triggerGet:D,email:i,dataScreenshots:k})}else x?a=(0,s.jsx)(g,{name:o.name,gameId:t,rating:o.rating,releaseDate:o.released,image:o.background_image,description:o.description_raw,isAuth:c,triggerUpdate:w,triggerGet:D,email:i,dataScreenshots:k}):j&&(a=(0,s.jsx)("div",{children:v.toString()}));return(0,s.jsx)("div",{children:a})}return d||u?a=(0,s.jsx)(f.a,{}):x?a=(0,s.jsx)(g,{name:o.name,gameId:t,rating:o.rating,releaseDate:o.released,image:o.background_image,description:o.description_raw,isAuth:c,triggerUpdate:w,triggerGet:D,email:i,dataScreenshots:k}):j&&(a=(0,s.jsx)("div",{children:v.toString()})),(0,s.jsx)("div",{children:a})}var j=t(7689);function v(){var e=(0,j.UO)().id,a=Number(e);return(0,s.jsx)(x,{gameId:a})}}}]);
//# sourceMappingURL=441.2041bbfe.chunk.js.map