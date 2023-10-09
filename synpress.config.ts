/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "cypress";
import setupNodeEvents from "./tests/e2e/plugins";

export default defineConfig({
  userAgent: "synpress",
  //   retries: {
  //     openMode: 0,
  //     runMode: 0,
  //   },
  //   env: {
  //     guildApiUrl: "https://api.guild.xyz/v2",
  //     userAddress: "0x304Def656Babc745c53782639D3CaB00aCe8C843",
  //     platformlessGuildName: "Platformless Cypress Gang",
  //     platformlessGuildUrlName: "platformless-cypress-gang",
  //     guildName: "Cypress Gang",
  //     guildUrlName: "cypress-gang",
  //     dcClientId: "868172385000509460",
  //     dcServerId: "1096417797292171365", // We'll delete the created roles in this Discord server
  //     tgId: "-1001653099938",
  //   },
  e2e: {
    setupNodeEvents,
    supportFile: "./tests/e2e/support.ts",
    specPattern: "./tests/e2e/specs/*.spec.ts",
  },
});
