import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

export class ProductStore extends Model<InferAttributes<ProductStore>, InferCreationAttributes<ProductStore>> {
    declare ps_id: number;
    declare store_id: number;
    declare consignor_id: number;
    declare product_code: string;
    declare quantity: number;
    declare date_consigned: Date;
    declare date_returned: Date;
    declare status: "Dititipkan" | "Terjual" | "Dikembalikan";
}

ProductStore.init(
    {
        ps_id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        store_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        consignor_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        product_code: { type: DataTypes.STRING(15), allowNull: false },
        quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        date_consigned: { type: DataTypes.DATEONLY, allowNull: false },
        date_returned: { type: DataTypes.DATEONLY, allowNull: false },
        status: { type: DataTypes.ENUM("Dititipkan", "Terjual", "Dikembalikan"), allowNull: false },
    },
    {
        tableName: "product_stores",
        sequelize,
        timestamps: false,
    }
);
