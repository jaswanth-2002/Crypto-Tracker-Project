const form = document.querySelector('#searchForm');
const res= document.querySelector('#tablemenu');
var upd;

form.addEventListener('submit',(e)=>{
    if(upd)
    {
        clearTimeout(upd);
    }
    e.preventDefault();
    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);
})

const fetchPrice= async(ctype)=>{
    const r=await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    const price= r.data.coin.price;
    const volume= r.data.coin.volume;
    const Change= r.data.coin.priceChange1d;

    res.innerHTML = `
    <tr style='background-color:orange; color:black;font-weight:700;'> 
        <td>Property</td>
        <td>Value</td>
    </tr>
    <tr> 
        <td>${ctype}</td>
        <td>${price} - INR</td>
    </tr>
    <tr> 
        <td>Volume</td>
        <td>${volume}</td>
    </tr>
    <tr> 
        <td>Change</td>
        <td>${Change}</td>
    </tr>`;

    upd= setTimeout(()=>fetchPrice(ctype), 30000);
}