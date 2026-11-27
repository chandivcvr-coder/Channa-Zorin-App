import {translateSentence,allEntries,reverseWord} from './rules.js';
import './style.css';
document.querySelector('#app').innerHTML=`
<header><div class="brand">CZ</div><div><h1>Channa Zorin AI</h1><p>Hybrid Language Studio · V2</p></div><span class="pill">RULE ENGINE</span></header>
<nav><button class="tab on" data-id="translator">Translator</button><button class="tab" data-id="learn">Learning guide</button><button class="tab" data-id="dictionary">Master dictionary</button></nav>
<section id="translator" class="view on"><h2>Sentence translator</h2><p class="muted">Sinhala Singlish / English word input → Channa Zorin sentence</p>
<div class="row"><select id="direction"><option value="si-cz">Sinhala / Singlish → Channa Zorin</option><option value="cz-si">Channa Zorin → Sinhala</option></select></div>
<textarea id="input" placeholder="උදා: mama dan potha balanawa"></textarea><button id="go" class="primary">Translate sentence</button>
<h3>Channa Zorin output</h3><div id="output" class="output">පරිවර්තනය මෙතැන පෙන්වයි.</div><p id="notice" class="muted"></p><h3>Word-by-word analysis</h3><div id="breakdown"></div></section>
<section id="learn" class="view"><h2>Official learning guide</h2><p class="muted">ඔයා ලබාදුන් Spoken Language Guide හි මූලික A–Z නීති ඇසුරෙන්.</p>
<div class="rule"><b>Sentence order — SOV</b><p>Subject + Time / Place / Modifier + Object + Verb</p><code>Unio bonnokath kalea</code></div>
<div class="rule"><b>Pronouns</b><p>මම Unio · අපි Uniyo · ඔයා Simio · ඔයාලා Simiyo · ඇය Silio · එයා/ඔහු Sigio · ඔවුහු Sigiyo</p></div>
<div class="rule"><b>Word building</b><p>Common noun: konno + first-letter swap. Adjective: pipo + swap. Question: sea + swap. Conjunction: line + swap.</p></div>
<div class="rule"><b>Time / place</b><p>dan ditan · iye yitaye · heta hiteta · methana mipetha · ethana eipetha · ikmanin ipikman</p></div>
<div class="rule"><b>Verb forms</b><p>Present -lea · Past -ta · Future -ra · Continuous -zi · Participle -zu · Command -va · Let's -aza · Question -da · Negative -ma. Fixed: inlea, thilea, cana, needa/needalea.</p></div>
<div class="rule"><b>Proper name endings only</b><p>-ට -n · -ගේ -k · -ව -m · -ගෙන් -dea · -ම -l. Do not apply to common nouns.</p></div>
<div class="rule"><b>Numbers</b><p>Units -rio · tens -ko · hundreds -pin · thousands -mba · hundred-thousands -mo.</p></div></section>
<section id="dictionary" class="view"><h2>Master dictionary</h2><input id="search" placeholder="Search word / meaning / category"><div id="entries"></div></section>
<footer>Channa Zorin · Creator-controlled language rules</footer>`;
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab,.view').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById(b.dataset.id).classList.add('on')});
const $=s=>document.querySelector(s);
$('#go').onclick=()=>{
 const dir=$('#direction').value, input=$('#input').value.trim();
 if(!input){$('#notice').textContent='කරුණාකර වාක්‍යයක් ඇතුළත් කරන්න.';return}
 if(dir==='cz-si'){
  const words=input.split(/\s+/);const out=words.map(w=>reverseWord(w)||`[${w}?]`).join(' ');
  $('#output').textContent=out;$('#notice').textContent='Reverse dictionary mode: [word?] ලෙස පෙන්වන්නේ dictionary එකේ තවම නැති පදයි.';
  $('#breakdown').innerHTML=words.map(w=>`<div class="part"><b>${w}</b><span>CHanna Zorin</span><strong>${reverseWord(w)||'Unknown'}</strong></div>`).join('');return;
 }
 const r=translateSentence(input);
 $('#output').textContent=r.output;$('#notice').textContent=r.note;
 $('#breakdown').innerHTML=r.parts.map(p=>`<div class="part"><b>${p.word}</b><span>${p.type}</span><strong>${p.result}</strong><small>${p.certainty}</small></div>`).join('');
};
const data=allEntries();
function draw(q=''){const rows=data.filter(x=>(x.si+x.cz+x.type).toLowerCase().includes(q.toLowerCase()));$('#entries').innerHTML=rows.map(x=>`<div class="entry"><b>${x.si}</b><strong>${x.cz}</strong><small>${x.type}</small></div>`).join('')||'<p class="muted">No entry found. Add only creator-approved words in src/rules.js.</p>'}
$('#search').oninput=e=>draw(e.target.value);draw();
