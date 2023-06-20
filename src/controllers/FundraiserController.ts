import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import RecaudacionModel, { RecaudacionAttributes } from "../modelsNOSQL/recaudacionNOSQL";
import UserModel from "../modelsNOSQL/usuarioNOSQL";
import joi from "joi";
import { v4 as uuiv4 } from "uuid";

class RecaudacionController extends AbstractController {
  private static instance: RecaudacionController;

  public static getInstance(): AbstractController {
    if (!this.instance) {
      this.instance = new RecaudacionController("recaudacion");
    }
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post("/crearUsuario", this.crearUsuario.bind(this));
    this.router.post("/signin", this.signin.bind(this));
    this.router.post("/verificar", this.verify.bind(this));

    this.router.post("/donacion", this.donacion.bind(this));
    this.router.post(
      "/configurar",
      this.authMiddleware.verifyToken.bind(this.authMiddleware),
      this.configurar.bind(this)
    );
    this.router.get("/totalDonaciones", this.totalDonaciones.bind(this));
  }

  private async crearUsuario(req: Request, res: Response) {
    const { email, password, name } = req.body;
    try {
      // Create a new user in Cognito
      const user = await this.cognitoService.crearUsuario(email, password, [
        {
          Name: "email",
          Value: email,
        },
      ]);
      console.log("Usuario de cognito creado", user);
      // Guardar el usuario en DB NoSQL (DynamoDB)
      await UserModel.create(
        {
          awsCognitoId: user.UserSub,
          name,
          email,
        },
        { overwrite: false }
      );
      console.log("Usuario guardado en BDNoSQL");
      res.status(201).send({ message: "User created" });
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const login = await this.cognitoService.signInUser(email, password);

      res.status(200).send({ ...login.AuthenticationResult });
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async verify(req: Request, res: Response) {
    const { email, code } = req.body;
    try {
      await this.cognitoService.verifyUser(email, code);

      res.status(200).send({ message: "Verified user" });
    } catch (error: any) {
      console.error(error);
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async donacion(req: Request, res: Response) {
    const { nombre, cantidad } = req.body;
    try {
      const recaudacion = await RecaudacionModel.get(nombre);
      console.log(recaudacion);
      if (recaudacion) {
        const newDonationTotal = recaudacion.attrs.totalDonaciones + cantidad;
        await RecaudacionModel.update({
          nombre,
          totalDonaciones: newDonationTotal,
        });
        res.status(200).send({ message: "Donación hecha con éxito." });
      } else {
        res.status(404).send({ message: "Esa recaudación no existe." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al realizar la donación." });
    }
  }

  private async configurar(req: Request, res: Response) {
    const { nombre, proposito, meta } = req.body;
    try {
      const id = uuiv4();
      let recaudacion = await RecaudacionModel.get(nombre);
      if (!recaudacion) {
        // Si no se encuentra una hecha, crea una nueva
        const newRecaudacion: RecaudacionAttributes = {
          nombre: nombre,
          proposito: proposito,
          meta: meta,
          totalDonaciones: 0,
        };
        recaudacion = await RecaudacionModel.create(newRecaudacion);
      }
      res
        .status(200)
        .send({ message: "Campaña de recaudación configurada con éxito." });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al configurar la campaña." });
    }
  }

  private async totalDonaciones(req: Request, res: Response) {
    const { nombre } = req.body;
    try {
      const recaudacion = await RecaudacionModel.get(nombre);
      if (recaudacion) {
        res
          .status(200)
          .send({ totalDonaciones: recaudacion.attrs.totalDonaciones });
      } else {
        res.status(404).send({ message: "Esa recaudación no existe." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error al obtener el total de donaciones." });
    }
  }

  protected validateBody(body: any): boolean {
    const schema = joi.object({
      nombre: joi.string().required(),
      proposito: joi.string().required(),
      meta: joi.number().required(),
      totalDonaciones: joi.number().required(),
    });

    const { error } = schema.validate(body);
    return !error;
  }
}

export default RecaudacionController;
