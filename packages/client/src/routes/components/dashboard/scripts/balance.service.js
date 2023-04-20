import userLogin from '../../auth/login.service.js'

let balance;
console.log(`balance service login: ${userLogin}`);

export async function getUserBalance() {
  const response = await fetch(`http://localhost:3000/api/user/${userLogin}` ,{
    headers: {'Content-Type':'application/json'},
    credentials: 'include',
  });
  const content = await response.json();
  balance = content.user.balance;
  console.log(balance);
}