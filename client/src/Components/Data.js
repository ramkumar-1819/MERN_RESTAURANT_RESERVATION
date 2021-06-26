const x=new Date();
var initialDate=Number(x.getDate());                   
var month=Number(x.getMonth())+1;

if(month<10){
    month="0"+month
}
if(initialDate<10){
  initialDate="0"+initialDate;
}
var a=x.getFullYear()+"-"+month+"-"+initialDate;
export {a};