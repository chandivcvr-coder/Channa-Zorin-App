// Creator-approved Channa Zorin rule implementation.
// Unknown vocabulary is never silently guessed. Add verified words in Dictionary.
export const lexicon = [
 // [Singlish keys, Sinhala display, Channa Zorin, class]
 [["mama","mata"],"මම / මට","Unio","SUBJECT"],
 [["api","apita"],"අපි / අපිට","Uniyo","SUBJECT"],
 [["oya","oyata","umba","obata"],"ඔයා / ඔයාට","Simio","SUBJECT"],
 [["oyala","oyalata"],"ඔයාලා / ඔයාලට","Simiyo","SUBJECT"],
 [["eya","ohu","aya"],"එයා / ඔහු","Sigio","SUBJECT"],
 [["eya"],"ඇය / එයා","Sigio","SUBJECT"],
 [["eya"],"ඇය","Silio","SUBJECT_FEM"],
 [["eyala","ovuhu"],"ඔවුහු / එයාලා","Sigiyo","SUBJECT"],
 [["dan"],"දැන්","ditan","TIME"],
 [["iye"],"ඊයේ","yitaye","TIME"],
 [["heta"],"හෙට","hiteta","TIME"],
 [["methana"],"මෙතන","mipetha","PLACE"],
 [["ethana"],"එතන","eipetha","PLACE"],
 [["ikmanin"],"ඉක්මනින්","ipikman","MANNER"],
 [["hoda"],"හොඳ","hipopoda","ADJECTIVE"],
 [["naraka"],"නරක","nipoparaka","ADJECTIVE"],
 [["loku"],"ලොකු","lipopoku","ADJECTIVE"],
 [["podi"],"පොඩි","pipopodi","ADJECTIVE"],
 [["ai"],"ඇයි","aeasi","QUESTION"],
 [["kawada"],"කවදාද","keasawada","QUESTION"],
 [["koheda"],"කොහෙද","keasoheda","QUESTION"],
 [["kohoma"],"කොහොමද","keasohoma","QUESTION"],
 [["nisa"],"නිසා","ninelisa","CONJUNCTION"],
 [["eth"],"ඒත්","einelth","CONJUNCTION"],
 [["saha"],"සහ","sinelaha","CONJUNCTION"],
 [["nathnam"],"නැත්නම්","ninelathnam","CONJUNCTION"],
 [["potha","poth"],"පොත","ponnokoth","OBJECT"],
 [["bath"],"බත්","bonnokath","OBJECT"],
 [["gedara"],"ගෙදර","gonnokedara","PLACE_OBJECT"],
 [["salli"],"සල්ලි","sonnokalli","OBJECT"],
 [["wathura"],"වතුර","wonnakathura","OBJECT"],
 [["the"],"තේ","tonnokhe","OBJECT"],
 [["bus"],"බස්","bonnokus","OBJECT"],
 [["channa"],"චන්න","Channa","PROPER"],
 [["kasun"],"කසුන්","Kasun","PROPER"],
 // verb roots are mapped separately below
];
export const verbs = [
 {keys:["kanawa","kanna","ka","kala","kala","kanne"],root:"ka",forms:{present:"kalea",past:"kaleata",future:"kaleara",command:"kaleava",continuous:"kaleazi",participle:"kaleazu",negative:"kalema",question:"kaleada",lets:"kaleaza"},type:"VERB"},
 {keys:["yanawa","yanna","ya","giya","gihin","yamin"],root:"ya",forms:{present:"yalea",past:"yaleata",future:"yaleara",command:"yaleava",continuous:"yaleazi",participle:"yaleazu",negative:"yalema",question:"yaleada",lets:"yaleaza"},type:"VERB"},
 {keys:["balanawa","balanna","bala","baluwa"],root:"bala",forms:{present:"balalea",past:"balaleata",future:"balaleara",command:"balaleava",continuous:"balaleazi",participle:"balaleazu",negative:"balalema",question:"balaleada",lets:"balaleaza"},type:"VERB"},
 {keys:["bonawa","bonna","bona","bibi"],root:"bon",forms:{present:"bonlea",past:"bonleta",future:"bonlera",command:"bonleva",continuous:"bonlezi",participle:"bonlezu",negative:"bonlema",question:"bonleda",lets:"bonleaza"},type:"VERB"},
 {keys:["denawa","denna","dunna","dun"],root:"dun",forms:{present:"dunlea",past:"dunleata",future:"dunlearа",command:"dunleava",continuous:"dunleazi",participle:"dunleazu",negative:"dunlema",question:"dunleada",lets:"dunleaza"},type:"VERB"},
 {keys:["innawa","inna","hitiya"],root:"in",forms:{present:"inlea",past:"inleata",future:"inlearа",command:"inleava",continuous:"inleazi",participle:"inleazu",negative:"inlema",question:"inleada",lets:"inleaza"},type:"VERB_FIXED"}
];
export const numberUnits=["Ario","Brio","Crio","Drio","Erio","Frio","Grio","Hrio","Irio"];
export const numberTens=["Ako","Bako","Tako","Dako","Eako","Fako","Gako","Hako","Iako"];
export const numberHundreds=["Apin","Bapin","Tapin","Dapin","Eapin","Fapin","Gapin","Hapin","Iapin"];
export const numberThousands=["Amba","Bmba","Cmba","Dmba","Emba","Fmba","Gmba","Hmba","Imba"];
export const numberHundredThousands=["Amo","Bmo","Cmo","Dmo","Emo","Fmo","Gmo","Hmo","Imo"];
export function numberToCZ(n){
 n=Number(n); if(!Number.isInteger(n)||n<0||n>900000) return null; if(n===0)return "Zero";
 const out=[]; const add=(v,a)=>{if(v)out.push(a[v-1]);};
 add(Math.floor(n/100000),numberHundredThousands); n%=100000;
 add(Math.floor(n/1000),numberThousands); n%=1000;
 add(Math.floor(n/100),numberHundreds); n%=100;
 add(Math.floor(n/10),numberTens); n%=10; add(n,numberUnits);
 return out.join(" ")||"Zero";
}
const norm=s=>s.toLocaleLowerCase().replace(/[.,!?;:()"'“”]/g,"").trim();
const entries=new Map();
for(const row of lexicon) for(const k of row[0]) entries.set(norm(k),{cz:row[2],type:row[3],si:row[1]});
const verbEntries=new Map();
for(const v of verbs) for(const k of v.keys) verbEntries.set(norm(k),v);

function swapPrefix(prefix,word){
 if(!word) return word;
 return word[0]+prefix.slice(1)+prefix[0]+word.slice(1);
}
export function transformCommonNoun(word){return swapPrefix("konno",word)}
export function transformAdjective(word){return swapPrefix("pipo",word)}
export function transformQuestion(word){return swapPrefix("sea",word)}
export function transformConjunction(word){return swapPrefix("line",word)}
function classifyToken(token){
 const raw=token, w=norm(token), punct=(token.match(/[.,!?;:]+$/)||[""])[0];
 if(!w)return {raw,out:raw,type:"PUNCT"};
 if(/^\d+$/.test(w))return {raw,out:numberToCZ(Number(w))||raw,type:"NUMBER"};
 if(entries.has(w)){const e=entries.get(w);return {raw,out:e.cz,type:e.type};}
 if(verbEntries.has(w)){const v=verbEntries.get(w);let form="present";
  if(["giya","dunna","bal uwa"].includes(w))form="past";
  if(["yanna","kanna","balanna","bonna","denna","inna"].includes(w))form="command";
  if(["gihin","bibi","kala"].includes(w))form="participle";
  if(["yanawa","kanawa","balanawa","bonawa","denawa","innawa"].includes(w))form="present";
  return {raw,out:v.forms[form],type:"VERB"};
 }
 if(/^[a-z]+$/.test(w))return {raw,out:transformCommonNoun(w),type:"OBJECT",inferred:true};
 return {raw,out:raw,type:"UNKNOWN",unknown:true};
}
const subjectTypes=new Set(["SUBJECT","SUBJECT_FEM"]);
const timeTypes=new Set(["TIME","PLACE","MANNER"]);
export function translateSentence(input, direction="si-cz"){
 if(direction==="cz-si") return {output:"",parts:[],unknown:[],note:"Channa Zorin → Sinhala reverse translation සඳහා V2 හි dictionary-based reverse mode භාවිතා කරන්න. නොදන්නා වචන අනුමාන නොකරයි."};
 const tokens=input.match(/\d+|[A-Za-z]+|[^\sA-Za-z\d]+/gu)||[];
 const parsed=tokens.map(classifyToken);
 // Build SOV: subject, time/place, conjunction/question, adjective, object, verb.
 const rank=p=>subjectTypes.has(p.type)?0:timeTypes.has(p.type)?1:p.type==="CONJUNCTION"?2:p.type==="QUESTION"?3:p.type==="ADJECTIVE"?4:["OBJECT","PLACE_OBJECT","PROPER","NUMBER"].includes(p.type)?5:p.type==="VERB"?6:7;
 const words=parsed.filter(p=>p.type!=="PUNCT");
 const sorted=[...words].sort((a,b)=>rank(a)-rank(b));
 const punctuation=(input.match(/[.!?]+$/)||[""])[0];
 const output=sorted.map(p=>p.out).join(" ")+punctuation;
 const unknown=parsed.filter(p=>p.unknown).map(p=>p.raw);
 const parts=parsed.map(p=>({word:p.raw,type:p.type,result:p.out,certainty:p.unknown?"unknown":p.inferred?"rule-derived":"dictionary/rule"}));
 return {output,parts,unknown,note:unknown.length?`සම්පූර්ණයෙන් තහවුරු නොවූ වචන ${unknown.length}ක් ඇත. ඒවා සඳහා වචන අනුමාන ලෙස noun rule යොදා ඇත; Dictionary එකෙන් නිවැරදි category එක තෝරන්න.`:"දැනට ඇතුළත් grammar සහ vocabulary අනුව පරිවර්තනය කළා. දිගු/සංකීර්ණ වාක්‍ය සඳහා තවත් grammar coverage අවශ්‍ය විය හැක."};
}
export function reverseWord(cz){
 const found=lexicon.find(r=>r[2].toLowerCase()===cz.toLowerCase());
 if(found)return found[1];
 const v=verbs.find(v=>Object.values(v.forms).some(x=>x.toLowerCase()===cz.toLowerCase()));
 if(v)return v.keys[0];
 return null;
}
export function allEntries(){return lexicon.map(r=>({si:r[1],cz:r[2],type:r[3]}));}
