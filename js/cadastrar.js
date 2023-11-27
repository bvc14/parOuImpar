window.addEventListener('load', function () {
    this.document.getElementById('btnCadastrar').addEventListener('click', cadastrarUsuario);

    function cadastrarUsuario() {
        var user = document.getElementById('txtUser').value;
        var pwd = document.getElementById('txtPwd').value;
        var checkPwd = document.getElementById('txtCheckPwd').value;

        var regularUser = /^[a-zA-Z0-9]{5,20}$/;
        var regularPwd = /^[a-zA-Z0-9+*\/@&-]{4,12}$/;

        if (user == '' || pwd == '' || checkPwd == '') {
            alertWifi('Preencha todas as informações!', false, 0, "", 30, "");
        } else if (!regularUser.test(user)) {
            alertWifi('Usuário inválido! Deve conter de 5 a 20  caracteres alfanuméricos.', false, 0, "", 30, "");
        } else if (!regularPwd.test(pwd) || !regularPwd.test(checkPwd)) {
            alertWifi('Senha inválida! Deve conter de 4 a 12 caracteres alfanuméricos ou os caracteres + * / @ & -', false, 0, "", 30, "");
        }
        else {
            var novoUsuario = { nome: user, senha: pwd };
            var vetUsuarios = localStorage.getItem('vetUsuarios');
            if (!vetUsuarios) {
                var vet = [];

                vet.push(novoUsuario);

                localStorage.setItem('vetUsuarios', JSON.stringify(vet));
            } else {
                vet = JSON.parse(vetUsuarios);
                var achou = false;

                for (var i = 0; i < vet.length; i++) {
                    if (vet[i].nome == user) {
                        achou = true;
                        break;
                    }
                }

                if (achou) {
                    alertWifi('Usuário já cadastrado!', false, 0, "", 30, "");
                } else {
                    if (pwd != checkPwd) {
                        alertWifi('As senhas não coincidem!', false, 0, "", 30, "");
                    } else {
                        vet.push(novoUsuario);
                        localStorage.setItem('vetUsuarios', JSON.stringify(vet));
                        alertWifi('Usuário cadastrado com sucesso!', false, 0, "", 30, "");
                    }
                }
            }
        }

    }

});