function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},t.parcelRequired7c6=o);var a=o("fZKcF"),i=o("7Y9D8"),s=o("k0Hlu"),d=o("5GVQI");const l={searchFormEl:document.querySelector(".search-form"),cardContainer:document.querySelector(".gallery"),addMoreBtn:document.querySelector(".load-more")};h();const c=new(0,s.CardsAPI);let u=null;function f(){l.cardContainer.innerHTML=""}function y(t){l.cardContainer.insertAdjacentHTML("beforeend",function(e){return e.map((e=>(0,d.default)(e))).join("")}(t)),new(e(a))(".gallery a",{captionsData:"alt",captionDelay:"250"}).refresh()}function h(){l.addMoreBtn.classList.add("is-hidden")}l.searchFormEl.addEventListener("submit",(async function(e){e.preventDefault(),f(),h(),c.page=1,c.query=e.target.elements.searchQuery.value;try{!function(e){if(0===e.total)throw new Error("Sorry, there are no images matching your search query. Please try again.");if(u=Math.ceil(e.totalHits/40),i.Notify.success(`Hooray! We found ${e.totalHits} images.`),y(e.hits),l.searchFormEl.reset(),e.totalHits<=40)return void h();l.addMoreBtn.classList.remove("is-hidden")}(await c.getCards())}catch(e){!function(e){f(),i.Notify.failure(e.message)}(e)}})),l.addMoreBtn.addEventListener("click",(async function(e){c.page+=1;y((await c.getCards()).hits),void window.scrollBy({top:860,behavior:"smooth"}),c.page===u&&(h(),i.Notify.info("We're sorry, but you've reached the end of search results."))}));
//# sourceMappingURL=addmore.2a57e671.js.map