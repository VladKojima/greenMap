class User{
    constructor(id, login, password, role, firstname, lastname, faname, phone){
        this.id = id;
        this.login = login;
        this.password = password;
        this.role = 0;
        this.firstname = firstname;
        this.lastname = lastname;
        this.faname = faname;
        this.phone = phone;
    }

    getName(lastname, firstname, faname){
        return lastname + " " +  firstname + " " + faname
    }

    parsePhone(phone){
        return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4-$5');
    }
}

let newUser1 = new User(1 , "userLogin", "password", 0, "Name", "Family", "Father name", "89181996666");
let newUser2 = new User(2 , "userLogin2", "password1", 0, "Name2", "Family2", "Father name2", "89181996667");
let userList = [newUser1, newUser2];
let i = 0

function userIn(id, login, password, role, firstname, lastname, faname, phone){
        let temp = new User(id, login, password, role, firstname, lastname, faname, phone);
        userList.push(temp);
        userOut();

}

function userOut(){
    let tbody = $(".table");
    for(; i < getUsers().length; i++){
        let cur = getUsers()[i]
        if(cur !== undefined){
            console.log(cur);
            console.log(cur.firstname)
        let tr =$('<tr>');
        let td1=$('<td>');
        let td2=$('<td>');
        let td3=$('<td>');
        let td4=$('<td>');
        let td5=$('<td>');
        td1.append(i);
        td2.append(cur.getName(cur.lastname, cur.firstname, cur.faname));
        td3.append(cur.login);
        td4.append(cur.parsePhone(cur.phone));
        td5.append('<?xml version="1.0" ?><svg height="24" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>')
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tbody.append(tr);
        }
    }
}

async function registrate() {
    var jsonbody = {};
    jsonbody['login'] = 'superadmin22';
    jsonbody['password'] = 'superadmin123456';
    jsonbody['name'] = 'Супер';
    jsonbody['surname'] = 'Администратор';
    jsonbody['patronymic'] = '';
    jsonbody['role'] = 1;
    await axios.post(serverURL + url_addUser, JSON.stringify(jsonbody)).then(response => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
        // если ошибка, значит скорее всего уже есть такой логин. Надо сообщить об этом пользователю
    });
}

async function getUsers() {
    // здесь же еще пример проверки на роль. имеет ли право пользователь это делать? допустим, если это может только суперадмин:
    role = localStorage.getItem("role");
    if (role != 1) {
        console.log('У вас нет прав, нужны права суперадмина')
    } else {
        await axios.get(serverURL + url_getUsers).then(response => {
            users = response.data; // locations - json с полученными данными
            console.log(users); // здесь идет отображение данных
        });
    }
}
