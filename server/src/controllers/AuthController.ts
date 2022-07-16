import { Request, Response } from 'express';
import { prisma } from "../prisma";
import { formataNome } from '../utils/formataNome';

export class AuthController {
  async signIn(req: Request, res: Response) {
    try {
      const {
        email,
        senha
      } = req.body;

      if (!email) {
        throw new Error("Email inválido.");
      }

      if (!senha) {
        throw new Error("Senha inválida.");
      }

      const usuario = await prisma.usuario.findFirst({
        where: {
          email: email
        }
      })

      if (usuario == null) {
        throw new Error("Usuário não encontrado.");
      }

      if (usuario.senha != senha) {
        throw new Error("Senha incorreta. Tente novamente.");
      }

      return res.status(200).json({
        id: usuario.id,
        nome: formataNome(usuario.nome),
        perfilAcesso: usuario.perfilAcesso
      })
      
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).send(error.message);
      else
        return res.status(400).send('unknown error');
    }
  }
}