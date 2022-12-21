function select(n)
{
  if(typeof(n)!="number") throw Error('n is NaN');

  localStorage.setItem('location',JSON.stringify([n]));
}
