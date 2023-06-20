import dynamodb from "../services/dynamoService";
import joi from "joi";
import { PREFIX_TABLE} from "../config";

const UserModel = dynamodb.define("usuario", {
    hashKey: "awsCognitoId",
    timestamps: true,
    schema: {
        awsCognitoId: joi.string().required(),
        name: joi.string().required(),
        email: joi.string().required().email(),
    },
    tableName: `usuario${PREFIX_TABLE}`,
    indexes: [
        {
            hashKey: "email",
            name: "EmailIndex",
            type: "global",
        },
    ],
});

// Solo ejecutar la primera vez y después comentar
/* dynamodb.createTables((err: any) => {
    if (err) {
      console.log('Error al crear la tabla Usuario:', err);
    } else {
      console.log('Tabla Usuario creada exitosamente');
    }
  }); */

export default UserModel;