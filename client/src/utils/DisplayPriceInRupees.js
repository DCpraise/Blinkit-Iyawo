export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('en-NG',{
        style : 'currency',
        currency : 'NGN',
        minimumFractionDigits : 0
    }).format(price)
}