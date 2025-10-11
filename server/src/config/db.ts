export interface DBConfig {
  uri: string;
  databaseName: string;
}

export const defaultDBConfig: DBConfig = {
  uri: "", // todo
  databaseName: "", // todo
};

export function validateConfig(config: DBConfig): boolean {
    if (!config.uri || config.uri === "mongodb://user:password@localhost:27017/?authSource=admin") {
        console.error("DB Config Error: MongoDB URI is missing or using default placeholder.");
        return false;
    }
    if (!config.databaseName) {
        console.error("DB Config Error: Database name is missing.");
        return false;
    }
    return true;
}
