import { CinemaManager } from "./classes/CinemaManager";
import { CinemaStartMenu } from "./menus/start";

const startMenu = new CinemaStartMenu();

async function start() {
    await CinemaManager.loadAccounts()
    startMenu.show();
}

start()

export { startMenu }