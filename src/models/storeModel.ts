import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

export class Stores extends Model<InferAttributes<Stores>, InferCreationAttributes<Stores>> {
    declare store_id: number;
    declare consignor_id: number;
    declare store_name: string;
    declare owner_name: string;
    declare commision: string;
}

Stores.init(
    {
        store_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        consignor_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        store_name: { type: DataTypes.STRING(100), allowNull: false },
        owner_name: { type: DataTypes.STRING(100), allowNull: false },
        commision: { type: DataTypes.INTEGER, allowNull: false }
    },
    { tableName: "stores", sequelize, timestamps: false }
);