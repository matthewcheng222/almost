(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=6e4,n=36e5,r=864e5,i=`time-progress-preferences`,a={birthDate:``,personalMetricsEnabled:!1,pinnedMetricId:null,sinceDate:``,sinceLabel:``};function o(){try{let e=localStorage.getItem(i);if(!e)return{...a};let t=JSON.parse(e);return{birthDate:typeof t.birthDate==`string`?t.birthDate:``,personalMetricsEnabled:typeof t.personalMetricsEnabled==`boolean`?t.personalMetricsEnabled:!1,pinnedMetricId:typeof t.pinnedMetricId==`string`?t.pinnedMetricId:null,sinceDate:typeof t.sinceDate==`string`?t.sinceDate:``,sinceLabel:typeof t.sinceLabel==`string`?t.sinceLabel:``}}catch{return{...a}}}function s(e){localStorage.setItem(i,JSON.stringify(e))}var c={preferences:o(),currentMetric:null,selectedMetricKey:`day`,refs:null,recentMetricIds:[],availableMetricIds:[],lastFocusThemeKey:``};function l(e,t=0,n=100){return Math.min(Math.max(e,t),n)}function u(e){return String(e).padStart(2,`0`)}function d(e){return`${e.toFixed(3)}%`}function f(e){return e.toLocaleString()}function p(e){let t=e%10,n=e%100;return t===1&&n!==11?`${e}st`:t===2&&n!==12?`${e}nd`:t===3&&n!==13?`${e}rd`:`${e}th`}function m(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function h(e){if(!e)return null;let t=new Date(`${e}T00:00:00`);return Number.isNaN(t.getTime())?null:t}function g(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}function _(e){let t=(e.getDay()+6)%7;return new Date(e.getFullYear(),e.getMonth(),e.getDate()-t)}function v(e){let t=new Date(e.getFullYear(),0,1);return Math.floor((e.getTime()-t.getTime())/r)+1}function y(e,t){return new Date(e,t+1,0).getDate()}function b(e){return new Date(e,1,29).getDate()===29}function x(e){return Math.floor((e-1)/100)*100+1}function S(i){if(i<=0)return`Now`;let a=i,o=Math.floor(a/r);a-=o*r;let s=Math.floor(a/n);a-=s*n;let c=Math.floor(a/t);a-=c*t;let l=Math.floor(a/e),u=[];return o>0&&u.push(`${o}d`),(o>0||s>0)&&u.push(`${s}h`),(o>0||s>0||c>0)&&u.push(`${c}m`),u.push(`${l}s`),u.join(` `)}function C(e){let t=e.getDay(),n=t===6?7:(6-t+7)%7;return new Date(e.getFullYear(),e.getMonth(),e.getDate()+n,0,0,0,0)}function w(e){let t=_(e);return new Date(t.getFullYear(),t.getMonth(),t.getDate()+7,0,0,0,0)}function T(e){return new Date(e.getFullYear(),e.getMonth()+1,1,0,0,0,0)}function E(e){return new Date(e.getFullYear()+1,0,1,0,0,0,0)}function D(e){let t=e.getFullYear()+1;for(;!b(t);)t+=1;return new Date(t,0,1,0,0,0,0)}function ee(e){let t=e.getFullYear(),n=e.getMonth();for(let r=0;r<120;r+=1){let r=new Date(t,n,13,0,0,0,0);if(r>e&&r.getDay()===5)return r;n+=1,n>11&&(n=0,t+=1)}return new Date(e.getFullYear()+1,0,13,0,0,0,0)}function te(e){let t=new Date(`2025-01-13T22:27:00Z`).getTime(),n=29.530588853*r,i=e.getTime()-t,a=Math.ceil(i/n);return new Date(t+a*n)}function O(e,t){let n=e.getMonth(),r=e.getDate(),i=new Date(t.getFullYear(),n,r,0,0,0,0);return i<=t&&(i=new Date(t.getFullYear()+1,n,r,0,0,0,0)),i}function ne(e,t){let n=new Date(t.getFullYear(),e.getMonth()+6,e.getDate(),0,0,0,0);return n<=t&&(n=new Date(t.getFullYear()+1,e.getMonth()+6,e.getDate(),0,0,0,0)),n}function re(e,t){let n=new Date(t.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0),r=t.getFullYear()-e.getFullYear()-(t<n?1:0),i=Math.ceil((r+1)/10)*10;return{age:i,target:new Date(e.getFullYear()+i,e.getMonth(),e.getDate(),0,0,0,0)}}function ie(e){return new Date(e.getTime()+0xe8d4a51000)}function k(e,t,n){let r=e.getTime()-t.getTime();return r<=0?100:l((n.getTime()-t.getTime())/r*100)}function A(e,t){return Math.floor((g(t).getTime()-g(e).getTime())/r)}function ae(e,t){return new Date(e.getTime()+t*r)}function j(e,t,n){return t<=e?100:l((n-e)/(t-e)*100)}function oe(e){return[1e3,5e3,1e4,15e3,2e4,25e3,3e4].find(t=>t>e)||Math.ceil(e/5e3)*5e3}function se(e){let t=e.getFullYear(),n=new Date(t,2,20,0,0,0,0),r=new Date(t,5,21,0,0,0,0),i=new Date(t,8,22,0,0,0,0),a=new Date(t,11,21,0,0,0,0);return e<n?{name:`spring`,target:n,seasonStart:new Date(t-1,11,21,0,0,0,0)}:e<r?{name:`summer`,target:r,seasonStart:n}:e<i?{name:`autumn`,target:i,seasonStart:r}:e<a?{name:`winter`,target:a,seasonStart:i}:{name:`spring`,target:new Date(t+1,2,20,0,0,0,0),seasonStart:a}}function ce(e){let t=new Date(e),n=t.getDay(),r;if(n===5&&t.getHours()<18)r=0;else{let e=(5-n+7)%7;r=e===0?7:e}return t.setDate(t.getDate()+r),t.setHours(18,0,0,0),t}function M(e,n){let i=[],a=g(e),o=ce(e);i.push({kind:`countdown`,id:`friday-night`,title:`Until Friday night`,detail:`The unofficial weekly exhale starts at 18:00`,value:S(o.getTime()-e.getTime()),progressPercent:k(o,a,e),category:`playful`});let s=C(e);i.push({kind:`countdown`,id:`weekend`,title:`Until the weekend`,detail:`Saturday begins at 00:00 in your local time`,value:S(s.getTime()-e.getTime()),progressPercent:k(s,a,e),category:`playful`});let c=w(e);i.push({kind:`countdown`,id:`next-week`,title:`Until next week`,detail:`Monday starts a fresh weekly chapter`,value:S(c.getTime()-e.getTime()),progressPercent:k(c,_(e),e),category:`playful`});let u=T(e);i.push({kind:`countdown`,id:`next-month`,title:`Until next month`,detail:`A fresh page on the calendar`,value:S(u.getTime()-e.getTime()),progressPercent:k(u,new Date(e.getFullYear(),e.getMonth(),1,0,0,0,0),e),category:`seasonal`});let d=se(e);i.push({kind:`countdown`,id:`next-season`,title:`Until ${d.name}`,detail:`A seasonal shift is on the way`,value:S(d.target.getTime()-e.getTime()),progressPercent:k(d.target,d.seasonStart,e),category:`seasonal`});let m=te(e);i.push({kind:`countdown`,id:`full-moon`,title:`Until the next full moon`,detail:`Approximate lunar timing for a little cosmic flavor`,value:S(m.getTime()-e.getTime()),progressPercent:k(m,a,e),category:`playful`});let v=E(e);i.push({kind:`countdown`,id:`new-year`,title:`Until New Year`,detail:`A clean reset for the calendar`,value:S(v.getTime()-e.getTime()),progressPercent:k(v,new Date(e.getFullYear(),0,1,0,0,0,0),e),category:`seasonal`});let y=ee(e);i.push({kind:`countdown`,id:`friday-13th`,title:`Until Friday the 13th`,detail:`A classic little calendar oddity`,value:S(y.getTime()-e.getTime()),progressPercent:k(y,a,e),category:`playful`});let b=D(e);i.push({kind:`countdown`,id:`leap-year`,title:`Until the next leap year`,detail:`The next year with a February 29`,value:S(b.getTime()-e.getTime()),progressPercent:k(b,new Date(e.getFullYear(),0,1,0,0,0,0),e),category:`seasonal`});let x=h(n.sinceDate);if(n.sinceDate&&x&&!Number.isNaN(x.getTime())&&x<=e){let t=n.sinceLabel.trim()||`your date`,a=A(x,e),o=Math.floor(a/7),s=Math.ceil((a+1)/100)*100,c=Math.max(0,s-100),u=new Date(g(x).getTime()+s*r);i.push({kind:`since`,id:`since-custom-days`,title:`Days since ${t}`,detail:`Since ${x.toLocaleDateString()}`,value:`${f(a)} days`,progressPercent:j(c,s,a),category:`custom`}),i.push({kind:`since`,id:`since-custom-weeks`,title:`Weeks since ${t}`,detail:`${f(a)} days is ${f(o)} full weeks`,value:`${f(o)} weeks`,progressPercent:l((a%7+1)/7*100),category:`custom`}),i.push({kind:`countdown`,id:`since-custom-100`,title:`Until ${t} hits ${f(s)} days`,detail:`A nice round milestone`,value:S(u.getTime()-e.getTime()),progressPercent:j(c,s,a),category:`milestone`})}let M=h(n.birthDate);if(M&&n.personalMetricsEnabled){let n=O(M,e);i.push({kind:`countdown`,id:`birthday`,title:`Until your next birthday`,detail:`Your next annual milestone`,value:S(n.getTime()-e.getTime()),personal:!0,progressPercent:k(n,new Date(n.getFullYear()-1,n.getMonth(),n.getDate(),0,0,0,0),e),category:`milestone`});let r=ne(M,e);i.push({kind:`countdown`,id:`half-birthday`,title:`Until your half-birthday`,detail:`A perfectly unnecessary but delightful milestone`,value:S(r.getTime()-e.getTime()),personal:!0,progressPercent:k(r,new Date(r.getFullYear(),r.getMonth()-6,r.getDate(),0,0,0,0),e),category:`playful`});let a=re(M,e),o=Math.max(0,e.getFullYear()-M.getFullYear()-(e<new Date(e.getFullYear(),M.getMonth(),M.getDate(),0,0,0,0)?1:0)),s=Math.floor(o/10)*10;i.push({kind:`countdown`,id:`round-age`,title:`Until your ${p(a.age)} birthday`,detail:`A round-number age milestone`,value:S(a.target.getTime()-e.getTime()),personal:!0,progressPercent:j(s,a.age,o),category:`milestone`});let c=A(M,e);i.push({kind:`since`,id:`alive-days`,title:`Days you have been alive`,detail:`Since ${M.toLocaleDateString()}`,value:`${f(c)} days`,personal:!0,progressPercent:l((c%100+1)/100*100),category:`milestone`});let u=oe(c),d=Math.max(0,u-5e3),m=ae(M,u);i.push({kind:`countdown`,id:`alive-days-${u}`,title:`Until you are ${f(u)} days old`,detail:`A fun round-number life milestone`,value:S(m.getTime()-e.getTime()),personal:!0,progressPercent:j(d,u,c),category:`milestone`});let h=Math.floor((e.getTime()-M.getTime())/t);i.push({kind:`since`,id:`alive-minutes`,title:`Minutes you have been alive`,detail:`A very committed counter`,value:`${f(h)} minutes`,personal:!0,progressPercent:l((h%1e4+1)/1e4*100),category:`playful`});let g=Math.floor((e.getTime()-M.getTime())/t*70);i.push({kind:`since`,id:`heartbeats`,title:`Approximate heartbeats so far`,detail:`Very rough estimate at 70 beats per minute`,value:`${f(g)} beats`,personal:!0,progressPercent:l((g%1e6+1)/1e6*100),category:`playful`});let _=ie(M);_>e&&i.push({kind:`countdown`,id:`billion-seconds`,title:`Until you are 1 billion seconds old`,detail:`A surprisingly satisfying milestone`,value:S(_.getTime()-e.getTime()),personal:!0,progressPercent:k(_,M,e),category:`milestone`})}return i}function N(){c.availableMetricIds=M(new Date,c.preferences).map(e=>e.id),c.currentMetric&&!c.availableMetricIds.includes(c.currentMetric.id)&&(c.currentMetric=null)}function P(e,t){return M(t,c.preferences).find(t=>t.id===e)??null}function F(e){c.recentMetricIds=[e,...c.recentMetricIds.filter(t=>t!==e)].slice(0,4)}function I(e){let t=c.availableMetricIds;if(!t.length)return null;let n=c.preferences.pinnedMetricId;if(n&&t.includes(n))return n;let r=t.filter(t=>t!==e&&!c.recentMetricIds.includes(t)),i=r.length>0?r:t.filter(t=>t!==e);return i.length?i[Math.floor(Math.random()*i.length)]:t[0]}function L(e){let t=e.getFullYear(),n=e.getMonth(),r=e.getDate(),i=v(e),a=y(t,n),o=b(t)?366:365,s=e.getHours(),c=e.getMinutes(),d=e.getSeconds(),f=(c+(d+e.getMilliseconds()/1e3)/60)/60,m=f*100,h=(s+f)/24*100,g=(r-1+(s+f)/24)/a*100,_=(i-1+(s+f)/24)/o*100,S=x(t),C=t-S+1,w=(t-S+(i-1+(s+f)/24)/o)/100*100,T=e.toLocaleString(void 0,{month:`long`}),E=e.toLocaleString(void 0,{weekday:`long`}),D=`${u(s)}:${u(c)}:${u(d)}`;return[{key:`hour`,label:`Hour`,percent:l(m),detail:`${c}m ${d}s elapsed`,subdetail:`From ${u(s)}:00 to ${u(s)}:59`},{key:`day`,label:`Day`,percent:l(h),detail:`${D} local time`,subdetail:`${E}, ${T} ${r}`},{key:`month`,label:`Month`,percent:l(g),detail:`${T} ${r} of ${a}`,subdetail:`${a-r} full days after today`},{key:`year`,label:`Year`,percent:l(_),detail:`Day ${i} of ${o}`,subdetail:`${o-i} days remaining after today`},{key:`century`,label:`Century`,percent:l(w),detail:`${C} year of the ${p(Math.ceil(t/100))} century`,subdetail:`${100-C} years remaining after this one`}]}function le(e){let t=e.getHours()+e.getMinutes()/60;return t>=5&&t<8?{themeKey:`daybreak`,panelClass:`time-theme-daybreak`,accentClass:`time-fill-daybreak`,glowMarkup:`
        <div class="time-theme-orb sun-orb daybreak-sun"></div>
        <div class="time-theme-orb haze-orb daybreak-haze"></div>
      `}:t>=8&&t<12?{themeKey:`morning`,panelClass:`time-theme-morning`,accentClass:`time-fill-morning`,glowMarkup:`
        <div class="time-theme-orb sun-orb morning-sun"></div>
        <div class="time-theme-orb haze-orb morning-haze"></div>
      `}:t>=12&&t<17?{themeKey:`afternoon`,panelClass:`time-theme-afternoon`,accentClass:`time-fill-afternoon`,glowMarkup:`
        <div class="time-theme-orb sun-orb afternoon-sun"></div>
        <div class="time-theme-orb haze-orb afternoon-haze"></div>
      `}:t>=17&&t<21?{themeKey:`dusk`,panelClass:`time-theme-dusk`,accentClass:`time-fill-dusk`,glowMarkup:`
        <div class="time-theme-orb sun-orb dusk-sun"></div>
        <div class="time-theme-orb haze-orb dusk-haze"></div>
      `}:{themeKey:`night`,panelClass:`time-theme-night`,accentClass:`time-fill-night`,glowMarkup:`
      <div class="time-theme-orb moon-orb night-moon"></div>
      <div class="time-theme-orb haze-orb night-haze"></div>
    `}}function R(e){let t=e.getMonth();return t>=2&&t<=4?{themeKey:`spring`,panelClass:`time-theme-spring`,accentClass:`time-fill-spring`,glowMarkup:`
        <div class="time-theme-orb season-orb spring-bloom"></div>
        <div class="time-theme-orb season-orb spring-mist"></div>
      `}:t>=5&&t<=7?{themeKey:`summer`,panelClass:`time-theme-summer`,accentClass:`time-fill-summer`,glowMarkup:`
        <div class="time-theme-orb season-orb summer-glow"></div>
        <div class="time-theme-orb season-orb summer-air"></div>
      `}:t>=8&&t<=10?{themeKey:`autumn`,panelClass:`time-theme-autumn`,accentClass:`time-fill-autumn`,glowMarkup:`
        <div class="time-theme-orb season-orb autumn-glow"></div>
        <div class="time-theme-orb season-orb autumn-smoke"></div>
      `}:{themeKey:`winter`,panelClass:`time-theme-winter`,accentClass:`time-fill-winter`,glowMarkup:`
      <div class="time-theme-orb season-orb winter-glow"></div>
      <div class="time-theme-orb season-orb winter-mist"></div>
    `}}function z(e){let t=e.getHours();return t<6?{themeKey:`hour-night`,panelClass:`time-theme-hour-night`,accentClass:`time-fill-hour-night`,glowMarkup:`
        <div class="time-theme-orb moon-orb hour-night-moon"></div>
        <div class="time-theme-orb haze-orb hour-night-haze"></div>
      `}:t<12?{themeKey:`hour-morning`,panelClass:`time-theme-hour-morning`,accentClass:`time-fill-hour-morning`,glowMarkup:`
        <div class="time-theme-orb sun-orb hour-morning-sun"></div>
        <div class="time-theme-orb haze-orb hour-morning-haze"></div>
      `}:t<18?{themeKey:`hour-afternoon`,panelClass:`time-theme-hour-afternoon`,accentClass:`time-fill-hour-afternoon`,glowMarkup:`
        <div class="time-theme-orb sun-orb hour-afternoon-sun"></div>
        <div class="time-theme-orb haze-orb hour-afternoon-haze"></div>
      `}:{themeKey:`hour-evening`,panelClass:`time-theme-hour-evening`,accentClass:`time-fill-hour-evening`,glowMarkup:`
      <div class="time-theme-orb sun-orb hour-evening-sun"></div>
      <div class="time-theme-orb haze-orb hour-evening-haze"></div>
    `}}function B(e){let t=e.getMonth();return t<=1||t===11?{themeKey:`month-winter`,panelClass:`time-theme-month-winter`,accentClass:`time-fill-month-winter`,glowMarkup:`
        <div class="time-theme-orb season-orb month-winter-glow"></div>
        <div class="time-theme-orb haze-orb month-winter-haze"></div>
      `}:t>=2&&t<=4?{themeKey:`month-spring`,panelClass:`time-theme-month-spring`,accentClass:`time-fill-month-spring`,glowMarkup:`
        <div class="time-theme-orb season-orb month-spring-glow"></div>
        <div class="time-theme-orb haze-orb month-spring-haze"></div>
      `}:t>=5&&t<=7?{themeKey:`month-summer`,panelClass:`time-theme-month-summer`,accentClass:`time-fill-month-summer`,glowMarkup:`
        <div class="time-theme-orb season-orb month-summer-glow"></div>
        <div class="time-theme-orb haze-orb month-summer-haze"></div>
      `}:{themeKey:`month-autumn`,panelClass:`time-theme-month-autumn`,accentClass:`time-fill-month-autumn`,glowMarkup:`
      <div class="time-theme-orb season-orb month-autumn-glow"></div>
      <div class="time-theme-orb haze-orb month-autumn-haze"></div>
    `}}function V(){return{themeKey:`century`,panelClass:`time-theme-century`,accentClass:`time-fill-century`,glowMarkup:`
      <div class="time-theme-orb season-orb century-glow"></div>
      <div class="time-theme-orb haze-orb century-haze"></div>
    `}}function H(e){let t=new Date;switch(e.key){case`hour`:return z(t);case`day`:return le(t);case`month`:return B(t);case`year`:return R(t);case`century`:return V();default:return{themeKey:`default`,panelClass:``,accentClass:``,glowMarkup:``}}}function U(e){c.preferences.birthDate=e,e||(c.preferences.personalMetricsEnabled=!1,c.preferences.pinnedMetricId=null,c.currentMetric?.personal&&(c.currentMetric=null)),s(c.preferences),N(),Z(),X()}function ue(e){if(!c.preferences.birthDate&&e){c.refs&&(c.refs.personalToggle.checked=!1);return}c.preferences.personalMetricsEnabled=e,c.preferences.pinnedMetricId=null,s(c.preferences),N(),Z(),X()}function de(e){c.preferences.sinceDate=e,e||(c.preferences.pinnedMetricId=null,c.currentMetric?.id.startsWith(`since-`)&&(c.currentMetric=null)),c.refs&&(c.refs.sinceLabelInput.disabled=!e),s(c.preferences),N(),Z(),X()}function fe(e){c.preferences.sinceLabel=e,s(c.preferences),N(),Z(),X()}function W(){if(c.refs){for(let e of[`hour`,`day`,`month`,`year`,`century`])c.refs.metricButtons[e]?.addEventListener(`click`,()=>{c.selectedMetricKey=e,q(L(new Date))});c.refs.shuffleButton.addEventListener(`click`,Q),c.refs.pinButton.addEventListener(`click`,ve),c.refs.birthDateInput.addEventListener(`change`,e=>{U(e.target.value)}),c.refs.personalToggle.addEventListener(`change`,e=>{ue(e.target.checked)}),c.refs.sinceDateInput.addEventListener(`change`,e=>{de(e.target.value)}),c.refs.sinceLabelInput.addEventListener(`input`,e=>{fe(e.target.value)}),c.refs.sinceLabelInput.disabled=!c.preferences.sinceDate}}function pe(e){let t=[`hour`,`day`,`month`,`year`,`century`],n=H(e);return`
    <section
      class="glass-panel time-focus-panel ${n.panelClass} rounded-[1.9rem] p-5 md:p-7"
      data-metric-panel
    >
      <div data-metric-glow>${n.glowMarkup}</div>

      <div class="relative z-10 mb-6 flex items-start justify-between gap-4">
        <div>
          <p class="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-zinc-500">
            Current Focus
          </p>
          <h2
            class="mt-2 text-2xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-3xl"
            data-metric-title
          >
            ${m(e.label)}
          </h2>
        </div>

        <div
          class="text-3xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-5xl"
          data-metric-percent
        >
          ${m(d(e.percent))}
        </div>
      </div>

      <div class="relative z-10 progress-track h-3 rounded-full">
        <div
          class="progress-fill ${n.accentClass} transition-[width] duration-500 ease-out"
          style="width:${e.percent}%"
          data-metric-bar
        ></div>
      </div>

      <div class="relative z-10 mt-5">
        <p
          class="text-base font-medium tracking-[-0.02em] text-zinc-700 md:text-lg"
          data-metric-detail
        >
          ${m(e.detail)}
        </p>

        <p
          class="mt-1 text-sm leading-6 text-zinc-500 md:text-base"
          data-metric-subdetail
        >
          ${m(e.subdetail)}
        </p>
      </div>

      <div class="relative z-10 mt-6 flex flex-wrap gap-2">
        ${t.map(t=>`
              <button
                type="button"
                data-metric-select="${t}"
                class="metric-pill rounded-full px-4 py-2 text-sm font-medium transition ${t===e.key?`metric-pill-active`:`text-zinc-600`}"
              >
                ${m(t.charAt(0).toUpperCase()+t.slice(1))}
              </button>
            `).join(``)}
      </div>
    </section>
  `}function G(e,t){return`
    <main class="selection-soft relative min-h-screen overflow-hidden px-6 py-10 md:px-10 md:py-14">
      <div class="ambient-orb left-[-5rem] top-[4rem] h-52 w-52 bg-white/70"></div>
      <div class="ambient-orb right-[-3rem] top-[8rem] h-60 w-60 bg-zinc-200/60"></div>

      <div class="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <section class="glass-shell w-full max-w-3xl rounded-[2.25rem] px-6 py-8 md:px-10 md:py-10">
          <header class="mx-auto mb-10 max-w-2xl text-center">
            <p class="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-zinc-400">
              Live Time Visualization
            </p>
            <h1 class="text-4xl font-semibold tracking-[-0.07em] text-zinc-950 md:text-6xl">
              Almost There
            </h1>
            <p class="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-500 md:text-base">
              Progress is happening. You’re closer than you think.
            </p>
          </header>

          <section class="grid gap-4">
            ${pe(e.find(e=>e.key===c.selectedMetricKey)??e.find(e=>e.key===`day`)??e[0])}

            <section class="glass-panel sidequest-panel sidequest-panel-static rounded-[1.9rem] p-5 md:p-6">
              <div class="relative z-10 mb-5 flex items-start justify-between gap-4">
                <div>
                  <p class="sidequest-kicker inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em]">
                    <span class="sidequest-kicker-dot"></span>
                    Small Wins
                  </p>

                  <h2
                    class="mt-3 text-xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-2xl"
                    data-fun-title
                  >
                    ${m(t?.title??`No metric selected`)}
                  </h2>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    data-action="shuffle"
                    class="glass-button sidequest-button sidequest-action rounded-full px-4 py-2 text-sm font-medium text-zinc-700"
                  >
                    Shuffle
                  </button>
                  <button
                    type="button"
                    data-action="pin"
                    class="glass-button sidequest-button sidequest-action rounded-full px-4 py-2 text-sm font-medium text-zinc-700"
                  >
                    ${m(c.preferences.pinnedMetricId===t?.id?`Unpin`:`Pin`)}
                  </button>
                </div>
              </div>

              <div class="relative z-10 mb-4">
                <div
                  class="sidequest-value text-3xl font-semibold tracking-[-0.06em] text-zinc-950 md:text-4xl"
                  data-fun-value
                >
                  ${m(t?.value??`—`)}
                </div>

                <p class="mt-2 text-sm leading-6 text-zinc-700" data-fun-detail>
                  ${m(t?.detail??`Choose a live metric`)}
                </p>
              </div>

              <div class="relative z-10">
                <div class="progress-track sidequest-track h-3 rounded-full">
                  <div
                    class="progress-fill sidequest-fill transition-[width] duration-500 ease-out"
                    style="width:${t?.progressPercent??0}%"
                    data-fun-bar
                  ></div>
                </div>

                <div class="mt-2 flex items-center justify-between text-[0.72rem] font-medium uppercase tracking-[0.14em] text-zinc-600">
                  <span>Quest progress</span>
                  <span data-fun-percent>${m(d(t?.progressPercent??0))}</span>
                </div>
              </div>

              <details class="sidequest-disclosure relative z-10 mt-5">
                <summary class="glass-button sidequest-button sidequest-summary rounded-full px-4 py-2 text-sm font-medium text-zinc-700">
                  <span class="sidequest-summary-open">Hide your dates</span>
                  <span class="sidequest-summary-closed">Add your dates</span>
                </summary>

                <div class="sidequest-settings mt-4 rounded-[1.4rem] border border-white/35 bg-white/20 p-4">
                  <div class="grid gap-3 md:grid-cols-2">
                    <div>
                      <label for="sinceLabel" class="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        “Since” label
                      </label>
                      <input
                        id="sinceLabel"
                        type="text"
                        value="${m(c.preferences.sinceLabel)}"
                        placeholder="for example: graduation"
                        class="glass-input w-full rounded-2xl px-4 py-3 text-sm text-zinc-800 outline-none"
                      />
                    </div>

                    <div>
                      <label for="sinceDate" class="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        Since date
                      </label>
                      <input
                        id="sinceDate"
                        type="date"
                        value="${m(c.preferences.sinceDate)}"
                        class="glass-input w-full rounded-2xl px-4 py-3 text-sm text-zinc-800 outline-none"
                      />
                    </div>
                  </div>

                  <div class="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                      <label for="birthDate" class="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                        Birth date
                      </label>
                      <input
                        id="birthDate"
                        type="date"
                        value="${m(c.preferences.birthDate)}"
                        class="glass-input w-full rounded-2xl px-4 py-3 text-sm text-zinc-800 outline-none"
                      />
                    </div>

                    <label class="flex items-center gap-3 rounded-2xl py-2 text-sm text-zinc-600">
                      <input
                        id="personalMetricsEnabled"
                        type="checkbox"
                        ${c.preferences.personalMetricsEnabled?`checked`:``}
                        class="h-4 w-4 accent-zinc-900"
                      />
                      Enable personal metrics
                    </label>
                  </div>
                </div>
              </details>
            </section>
          </section>

          <footer class="mt-8 text-center">
            <p class="text-xs uppercase tracking-[0.12em] text-zinc-400">
              Updates every second
            </p>
            <div class="mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/25 px-4 py-2 text-sm text-zinc-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md">
              <span>Made with time and caffeine by</span>
              <span class="font-semibold text-zinc-800">Matthew Cheng</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  `}function K(){let e=[`hour`,`day`,`month`,`year`,`century`],t={};for(let n of e)t[n]=document.querySelector(`[data-metric-select="${n}"]`);return{metricTitle:document.querySelector(`[data-metric-title]`),metricPercent:document.querySelector(`[data-metric-percent]`),metricDetail:document.querySelector(`[data-metric-detail]`),metricSubdetail:document.querySelector(`[data-metric-subdetail]`),metricBar:document.querySelector(`[data-metric-bar]`),metricPanel:document.querySelector(`[data-metric-panel]`),metricGlow:document.querySelector(`[data-metric-glow]`),metricButtons:t,funTitle:document.querySelector(`[data-fun-title]`),funValue:document.querySelector(`[data-fun-value]`),funDetail:document.querySelector(`[data-fun-detail]`),funBar:document.querySelector(`[data-fun-bar]`),funPercent:document.querySelector(`[data-fun-percent]`),shuffleButton:document.querySelector(`[data-action="shuffle"]`),pinButton:document.querySelector(`[data-action="pin"]`),birthDateInput:document.querySelector(`#birthDate`),personalToggle:document.querySelector(`#personalMetricsEnabled`),sinceDateInput:document.querySelector(`#sinceDate`),sinceLabelInput:document.querySelector(`#sinceLabel`)}}var me=[`time-theme-daybreak`,`time-theme-morning`,`time-theme-afternoon`,`time-theme-dusk`,`time-theme-night`,`time-theme-spring`,`time-theme-summer`,`time-theme-autumn`,`time-theme-winter`,`time-theme-hour-night`,`time-theme-hour-morning`,`time-theme-hour-afternoon`,`time-theme-hour-evening`,`time-theme-month-winter`,`time-theme-month-spring`,`time-theme-month-summer`,`time-theme-month-autumn`,`time-theme-century`],he=[`time-fill-daybreak`,`time-fill-morning`,`time-fill-afternoon`,`time-fill-dusk`,`time-fill-night`,`time-fill-spring`,`time-fill-summer`,`time-fill-autumn`,`time-fill-winter`,`time-fill-hour-night`,`time-fill-hour-morning`,`time-fill-hour-afternoon`,`time-fill-hour-evening`,`time-fill-month-winter`,`time-fill-month-spring`,`time-fill-month-summer`,`time-fill-month-autumn`,`time-fill-century`];function ge(e){if(c.refs)for(let t of[`hour`,`day`,`month`,`year`,`century`]){let n=c.refs.metricButtons[t];n&&(n.classList.toggle(`metric-pill-active`,t===e),n.classList.toggle(`text-zinc-600`,t!==e))}}function q(e){if(!c.refs)return;let t=e.find(e=>e.key===c.selectedMetricKey)??e.find(e=>e.key===`day`)??e[0];if(!t)return;let n=H(t);c.refs.metricTitle.textContent=t.label,c.refs.metricPercent.textContent=d(t.percent),c.refs.metricDetail.textContent=t.detail,c.refs.metricSubdetail.textContent=t.subdetail,c.refs.metricBar.style.width=`${t.percent}%`,c.lastFocusThemeKey!==n.themeKey&&(c.refs.metricPanel.classList.remove(...me),n.panelClass&&c.refs.metricPanel.classList.add(n.panelClass),c.refs.metricBar.classList.remove(...he),n.accentClass&&c.refs.metricBar.classList.add(n.accentClass),c.refs.metricGlow.innerHTML=n.glowMarkup,c.lastFocusThemeKey=n.themeKey),ge(t.key)}function J(e){c.refs&&(c.refs.funTitle.textContent=e?.title??`No metric selected`,c.refs.funValue.textContent=e?.value??`—`,c.refs.funDetail.textContent=e?.detail??`Choose a live metric`,c.refs.funBar.style.width=`${e?.progressPercent??0}%`,c.refs.funPercent.textContent=d(e?.progressPercent??0),c.refs.pinButton.textContent=c.preferences.pinnedMetricId===e?.id?`Unpin`:`Pin`)}function Y(e){if(c.preferences.pinnedMetricId&&(c.currentMetric=P(c.preferences.pinnedMetricId,e),c.currentMetric)||c.currentMetric&&(c.currentMetric=P(c.currentMetric.id,e),c.currentMetric))return;let t=I(null);c.currentMetric=t?P(t,e):null}function X(){let e=new Date;q(L(e)),Y(e),c.currentMetric&&F(c.currentMetric.id),J(c.currentMetric)}function _e(){let e=document.querySelector(`#app`);if(!e)return;N();let t=new Date,n=L(t),r=I(null);c.currentMetric=r?P(r,t):null,c.currentMetric&&F(c.currentMetric.id),e.innerHTML=G(n,c.currentMetric),c.refs=K(),c.lastFocusThemeKey=``,W()}function Z(){let e=document.querySelector(`#app`);if(!e)return;N();let t=new Date,n=L(t);Y(t),e.innerHTML=G(n,c.currentMetric),c.refs=K(),c.lastFocusThemeKey=``,W(),q(n),J(c.currentMetric)}function Q(){c.preferences.pinnedMetricId=null,s(c.preferences),N();let e=I(c.currentMetric?.id??null);c.currentMetric=e?P(e,new Date):null,c.currentMetric&&F(c.currentMetric.id),J(c.currentMetric)}function ve(){c.currentMetric&&(c.preferences.pinnedMetricId=c.preferences.pinnedMetricId===c.currentMetric.id?null:c.currentMetric.id,s(c.preferences),J(c.currentMetric))}function $(){let e=1e3-Date.now()%1e3;window.setTimeout(()=>{X(),$()},e)}_e(),X(),$();