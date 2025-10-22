import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../config/sequelize";

export class Consignor extends Model<InferAttributes<Consignor>, InferCreationAttributes<Consignor>> {
	declare consignor_id: number;
	declare full_name: string;
	declare email: string | null;
	declare total_capital: string;
	declare phone: string | null;
	declare password: string;
	declare role: string;
	declare created_at: string;
	declare last_login: string | null;
}

Consignor.init(
	{
			consignor_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
			full_name: { type: DataTypes.STRING(100), allowNull: false },
			email: { type: DataTypes.STRING(100), allowNull: true, unique: true },
			total_capital: { type: DataTypes.DECIMAL(12,2), allowNull: false, unique: false },
			phone: { type: DataTypes.STRING(20), allowNull: true },
			password: { type: DataTypes.STRING(255), allowNull: false },
			role: { type: DataTypes.ENUM('Admin', 'Consignor'), allowNull: false },
			created_at: { type: DataTypes.STRING(50), allowNull: false },
			last_login: { type: DataTypes.STRING(50), allowNull: false },
	},
	{ tableName: "consignors", sequelize, timestamps: false }
);