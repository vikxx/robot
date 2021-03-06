const golos = require('golos-js')
golos.config.set('websocket', "wss://api.golos.cf")

// Данные создателя аккаунта
// Активный ключ создателя (вашего существующего аккаунта)
const wif= "5ouriuruemACTIVEKEYkjnfjnvnjfnvjnfjnvfjnvnjdu"

// Стоимость создания аккаунта.
// Эти средства пойдут в силу голоса созданному пользователю. Вы можете их увеличить или уменьшить.
const fee= "3.000 GOLOS"

// Логин создателя (вашего существующего аккаунта)
const creator= "robot"

// Придумайте логин и пароль для нового аккаунта
const NAME = "nickname123"
const PASS = "MyStrongPass1234567890"

// Профиль пользователя. О себе, аватар, и т.д. , можно оставить пустым и заполнить позднее
const jsonMetadata= {
	
}


let x = golos.auth.generateKeys(NAME, PASS, ['owner','active','posting','memo'])
const ownerAuth = {
    weight_threshold: 1,
    account_auths: [],
    key_auths: [[x.owner, 1]]
}
const activeAuth = {
    weight_threshold: 1,
    account_auths: [],
    key_auths: [[x.active, 1]]
}
const postingAuth = {
    weight_threshold: 1,
    account_auths: [],
    key_auths: [[x.posting, 1]]
}
const memoKey= x.memo

golos.broadcast.accountCreate(wif, fee, creator, NAME, 
ownerAuth, 
activeAuth, 
postingAuth, 
memoKey, 
jsonMetadata, 
(err, result) => {
  if(err) return console.log(err);
	 let keys = golos.auth.getPrivateKeys(NAME, PASS, ["owner","active","posting","memo"]);
	console.log(`=============================
Логин: ${NAME}
Пароль: ${PASS}
Постинг: ${keys.posting}
Активный: ${keys.active}
Владелец: ${keys.owner}
============================================
`)
   // console.log(result)
});
