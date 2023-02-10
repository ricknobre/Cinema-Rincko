import promptSync from "prompt-sync";
import color from "cli-color";
import fs from "fs";
import path from "path";
import { CinemaExitMenu } from "./exit";
import { CinemaCreateAccountMenu } from "../auth/CreateAccountMenu";
import { CinemaManager } from "../../classes/CinemaManager";
import { CinemaLoginMenu } from "../auth/LoginMenu";
export { color }

const prompt = promptSync({sigint: false})

export { prompt }

export class CinemaStartMenu {
    public static accounts = new Array();
    public static menus = [
        new CinemaExitMenu(),
        new CinemaLoginMenu(),
        new CinemaCreateAccountMenu(),
    ]
    public async show(){
        await CinemaManager.loadAccounts()
        let option;
        
        const label = [
            color.green("Cinema do Rincko"),
            "",
            color.blue("[1] ") + "Fazer login",
            color.blue("[2] ") + "Criar conta",
            color.red("[0] ") + "Sair",
            ""
        ]
        console.log(label.join("\n"))

        option = parseInt(prompt(color.yellow("Digite o número da opção desejada: ")))
        
        while (isNaN(option)) {
            option = parseInt(prompt(color.yellow("A opção digitada é inválida, digite novamente: ")))
        }

        while(!CinemaStartMenu.menus[option] == null){
            option = parseInt(prompt(color.yellow("A opção escolhida não existe, digite novamente: ")))
        }

        CinemaStartMenu.menus[option]?.show()
    }
}