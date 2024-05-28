import mongoose from "mongoose";
import { seedingSetting } from "./setting.seed";
import { seedingAdmin } from "./admin.seed";

(async () => {
    if (mongoose.connections.length > 0) {
        const { MIGRATE_SETTING, MIGRATE_ADMIN, MIGRATE_CHAIN, MIGRATE_TOKEN, MIGRATE_BRIDGE_CONFIG } = process.env;
        if (MIGRATE_SETTING) {
            await seedingSetting();
        }

        if (MIGRATE_ADMIN) {
            await seedingAdmin();
        }

        // await catPlanetInit.generateCollection()
        // await seedingChains();
        // await seedingTokens();
        // await seedingItem();
        // await seedingItemStored();
    }
})();