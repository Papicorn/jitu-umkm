import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

export class Stores extends Model<InferAttributes<Stores>, InferCreationAttributes<Stores>> {
    declare store_id: number;
    declare consignor_id: number;
    declare store_name: string;
    declare owner_name: string;
    declare phone: string;
    declare address: string;
    declare store_type: string;
    declare commision_unit: string;
    declare commision: string;
    declare created_at: string;
}

Stores.init(
    {
        store_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        consignor_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        store_name: { type: DataTypes.STRING(100), allowNull: false },
        owner_name: { type: DataTypes.STRING(100), allowNull: false },
        phone: { type: DataTypes.STRING(20), allowNull: true },
        address: { type: DataTypes.STRING(100), allowNull: true },
        store_type: { type: DataTypes.STRING(100), allowNull: false },
        commision_unit: { type: DataTypes.STRING(100), allowNull: false },
        commision: { type: DataTypes.INTEGER, allowNull: true },
        created_at: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: "stores", sequelize, timestamps: false }
);