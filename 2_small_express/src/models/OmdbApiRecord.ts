import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

export class OmdbApiRecord extends Model {}

OmdbApiRecord.init(
  {
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false
    },
    params: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  },
  {
    modelName: "omdbApiRecord",
    tableName: "OmdbApiRecord",
    underscored: true,
    timestamps: true,
    sequelize,
  }
);
