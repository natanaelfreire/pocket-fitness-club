import { Request, Response } from 'express';
import { prisma } from "../prisma";

export class InfoController {
  async salvar(req: Request, res: Response) {
    try {
      const {
        nome,
        endereco,
        horarios,
        telefone,
        facebook,
        instagram
      } = req.body;

      const info = await prisma.info.findFirst();

      if (info === null) {
        await prisma.info.create({
          data: {
            nome: nome,
            endereco: endereco,
            horarios: horarios,
            telefone: telefone,
            facebook: facebook,
            instagram: instagram
          }
        });
      }
      else {
        await prisma.info.update({
          data: {
            nome: nome,
            endereco: endereco,
            horarios: horarios,
            telefone: telefone,
            facebook: facebook,
            instagram: instagram
          },
          where: {
            id: info.id
          }
        })
      }

      return res.status(200).send("Informações salvas com sucesso!");
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }

  async buscar(req: Request, res: Response) {
    try {
      const info = await prisma.info.findFirst();

      return res.status(200).json(info);
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}