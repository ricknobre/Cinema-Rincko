import { CinemaAccount } from "./CinemaAccount";
import fs from "fs";
import path from "path";
import { CinemaAccountInterface } from "../interfaces/account";

const accountsPath = path.join(__dirname, "../..", "data/accounts");

export class CinemaManager {
    public static accounts = new Array<CinemaAccount>();
    public static async loadAccounts(){
        if (fs.existsSync(accountsPath)) {
            fs.readdirSync(accountsPath).forEach(async file => {
                const account = (await import(`../../data/accounts/${file}`)).default as CinemaAccountInterface;
                if (account) CinemaManager.accounts.push(new CinemaAccount(account.username, account.password));
            })
        } else {
            fs.mkdirSync(accountsPath, {recursive: true})
        }

    }
    public static createAccount(account: CinemaAccount){
        this.accounts.push(account)
        const filePath = path.join(accountsPath, account.getUUID() + ".json")
        fs.writeFileSync(filePath, JSON.stringify(account))
        //(path.join(__dirname, "../../..", "data/accounts", account.getUUID() + ".json"), JSON.stringify(account))
    }
    public static loginAccount(username: string, password: string){
        const accountFinded = CinemaManager.accounts
        .find(a => a.getUsername() == username && a.getPassword() == password);

        if (accountFinded) {
            return { status: true, account: accountFinded }
        } else {
            return { status: false, account: undefined }
        }
    }
}