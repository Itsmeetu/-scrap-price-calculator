'use strict';
const fields = ['quantity','purchase','freight','expenses','selling','annualRate','days'];
const rupees = value => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(value);
let current;
function update() {
  try {
    const input = Object.fromEntries(fields.map(key => {
      const element = document.getElementById(key);
      return [key, element.value.trim() === '' ? NaN : element.valueAsNumber];
    }));
    const r = ScrapCalculator.calculate(input);
    current = {input,r};
    document.getElementById('error').textContent = '';
    document.getElementById('download').disabled = false;
    const container = document.getElementById('results');
    container.replaceChildren();
    const hero = document.createElement('div'); hero.className = 'hero';
    const title = document.createElement('span'); title.textContent = 'BREAK-EVEN / KG · INCLUDING CREDIT COST';
    const price = document.createElement('strong'); price.textContent = rupees(r.breakEven);
    const note = document.createElement('small'); note.textContent = 'Delivered cost before financing: ' + rupees(r.landedPerKg) + '/kg';
    hero.append(title,price,note); container.append(hero);
    const rows = [['Load weight',r.kg.toLocaleString('en-IN')+' kg'],['Freight / metric ton',rupees(r.freightPerTon)],['Total delivered cost',rupees(r.landedTotal)],['Credit financing cost',rupees(r.financeCost)],['Sales revenue',rupees(r.revenue)],['Estimated profit / loss',rupees(r.profit)],['Profit / loss per kg',rupees(r.profitPerKg)],['Margin on sales',r.marginPercent === null ? '— (no revenue)' : r.marginPercent.toFixed(2)+'%']];
    for (const [label,value] of rows) {
      const row = document.createElement('div'); row.className = 'row';
      const key = document.createElement('span'); key.textContent=label;
      const val = document.createElement('strong'); val.textContent=value;
      row.append(key,val);container.append(row);
    }
  } catch(error) {
    current = null; document.getElementById('error').textContent=error.message;
    document.getElementById('results').textContent='Complete the inputs to see your estimate.';
    document.getElementById('download').disabled=true;
  }
}
document.getElementById('pricing').addEventListener('input',update);
document.getElementById('pricing').addEventListener('submit',event=>event.preventDefault());
document.getElementById('download').addEventListener('click',()=>{
  if (!current) return;
  const {input,r}=current;
  const material=document.getElementById('material').value.replace(/[\r\n]/g,' ').trim() || 'Scrap material';
  const text=['INDICATIVE QUOTATION',material,'Date: '+new Date().toLocaleDateString('en-IN'),'',
    'Quantity: '+input.quantity+' metric tons ('+r.kg+' kg)',
    'Selling price: '+rupees(input.selling)+'/kg, excluding GST',
    'Material value: '+rupees(r.revenue)+', excluding GST',
    'Payment: '+(input.days===0?'Immediate payment':input.days+' days credit'),'',
    'Delivery basis, destination, quality, taxes, availability, quotation validity and final payment terms require written confirmation.',
    'This estimate is not an invoice or a binding offer.'].join('\n');
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='scrap-quotation.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
update();
