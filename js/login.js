window.addEventListener('load', function() {
    this.document.getElementById('btnEntrar').addEventListener('click', verificarLogin);
    audioClick = new Audio('../audio/click.mp3');

    function verificarLogin() {   
        var user = document.getElementById('txtUser').value;
        var pwd = document.getElementById('txtPwd').value;
        var vetUsuarios;

        if(user == '' || pwd == '') {
            alertWifi('Preencha todas as informações!', false, 0, "", 30, "");
        } else{
            vetUsuarios = localStorage.getItem('vetUsuarios');
            vetUsuarios = JSON.parse(vetUsuarios);
            if(!vetUsuarios) {
                alertWifi('Usuário não cadastrado!', false, 0, "", 30, "");
            } else {
                var achou = false;
                for(var i = 0; i < vetUsuarios.length; i++) {
                    if(vetUsuarios[i].nome == user && vetUsuarios[i].senha == pwd) {
                        achou = true;
                        break;
                    } 
                }

                if(!achou) {
                    alertWifi('Usuário ou senha incorretos!', false, 0, "", 30, "");
                } else{
                    alertWifi(`Bem vindo ${user}`, false, 0, "", 30, "");
                    window.location.href = 'jogo.html';
                }
        }

    }
 };
});

