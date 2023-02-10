import { CinemaAccount } from "../../classes/CinemaAccount";
import { color } from "../start";

export class CinemaMainMenu {
    public topLabel(account: CinemaAccount) {
        return [
            color.green("=".repeat(20)),
            color.green("Cinema do Rincko"),
            color.green("=".repeat(20)),
            color.green(`Usuário: ${account.getUsername()} / Carrinho: ${0} itens`)
        ]
    }
    public show(account: CinemaAccount){
        console.log(this.topLabel(account).join("\n"))
    }
}