import { startMenu } from "../..";
import { CinemaManager } from "../../classes/CinemaManager";
import { CinemaMainMenu } from "../main";
import { color, prompt, CinemaStartMenu } from "../start";

export class CinemaLoginMenu {
    public show(){
        let input: string;
        let username: string = "";
        let password: string = "";

        const label = [
            color.green("Cinema do Rincko") + " / " + color.blue("Fazer login"),
            "",
            color.blue("Você pode digitar \"-cancelar\" a qualquer momento"),
            color.blue("para voltar ao menu inicial!"),
        ];
        console.log(label.join("\n"));

        function cancelCheck(){
            return (input.toLowerCase() == "-cancelar")
        }
        function cancel(){
            console.log(color.red("Operação cancelada! Voltando ao menu principal"))
            startMenu.show()
        }

        input = prompt("Digite seu nome de usuário: ")
        if (cancelCheck()) {
            cancel()
            return
        }
        username = input

        input = prompt("Digite sua senha: ")
        if (cancelCheck()) {
            cancel()
            return
        }
        password = input

        while (!CinemaManager.loginAccount(username, password).status) {
            console.log(color.red("Usuário ou senha inválidos, digite novamente"))
            console.log(color.red("ou digite \"-criar\" para criar uma nova conta!"))
            input = prompt("Digite seu nome de usuário: ")

            if (input.toLowerCase() == "-criar") {
                CinemaStartMenu.menus[2]?.show()
                return;
            }
            if (cancelCheck()) {
                cancel()
                return
            }
            username = input
    
            input = prompt("Digite sua senha de usuário: ")
            if (cancelCheck()) {
                cancel()
                return
            }
            password = input
        }

        const { account } = CinemaManager.loginAccount(username, password)
        if (account) {
            console.log(color.green("Sessão iniciada com sucesso!"))
            console.log(color.green("Bem-vindo(a) de volta " + account.getUsername()))

            new CinemaMainMenu().show(account);
        }

    }
}