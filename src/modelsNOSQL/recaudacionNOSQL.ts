import dynamodb from '../services/dynamoService';
import joi from "joi";
import { PREFIX_TABLE} from '../config';

export interface RecaudacionAttributes {
    nombre: string;
    proposito: string;
    meta: number;
    totalDonaciones: number;
  }

const RecaudacionModel = dynamodb.define<RecaudacionAttributes>('recaudacion',{
    hashKey:'nombre',
    timestamps: true,
    schema: {
        nombre: joi.string().required(),
        proposito:joi.string().required(),
        meta:joi.number().required(),
        totalDonaciones:joi.number().required(),
    },
    tableName:`recaudacion${PREFIX_TABLE}`,

});

//Solo ejecutar la primera vez y despues comentar
/* dynamodb.createTables((err:any)=>{
    if(err) 
        return console.log('Error al crear la tabla recaudacion ',err);
    console.log('Tabla recaudacion creada exitosamente');
  }) */
  
  export default RecaudacionModel;