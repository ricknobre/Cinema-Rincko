import { color, prompt } from "../start"

import uuid from "uuid";
import { CinemaManager } from "../../classes/CinemaManager";
import { CinemaAccount } from "../../classes/CinemaAccount";
import { startMenu } from "../..";
import { CinemaMainMenu } from "../main";

export class CinemaCreateAccountMenu {
    public show(){
        let input: string;
        let username: string = "";
        let password: string = "";
        let confirmPassword: string = "";
        
        const label = [
            color.green("Cinema do Rincko") + " / " + color.blue("Criar uma conta"),
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

        input = prompt(color.yellow("Insira o nome de usuário: "));
        if (cancelCheck()) {
            cancel()
            return;
        }
        username = input;
        
        while(CinemaManager.accounts.find(a => a.getUsername() == username)) {
            input = prompt(color.red("Este nome de usuário já está em uso! Tente utilizar outro: "));
            if (cancelCheck()) {
                cancel()
                return;
            }
            username = input;
        }

        input = prompt(color.yellow("Insira uma senha: "));
        if (cancelCheck()) {
            cancel()
            return;
        }
        password = input
        input = prompt(color.yellow("Confirme a senha: "));
        if (cancelCheck()) {
            cancel()
            return;
        }
        confirmPassword = input

        while(password !== confirmPassword) {
            console.log(color.red("As senhas não coincidem! Digite novamente"));
            input = prompt(color.yellow("Insira uma senha novamente: "));
            if (cancelCheck()) {
                cancel()
                return;
            }
            password = input;
            input = prompt(color.yellow("Confirme a senha: "));
            if (cancelCheck()) {
                cancel()
                return;
            }
            confirmPassword = input;
        }

        const account = new CinemaAccount(username, password);
        CinemaManager.createAccount(account)

        console.log(color.green("Conta criada com sucesso!"))
        new CinemaMainMenu().show(account)

        

    }
}