import { Request, Response } from "express";
import prisma from "../prisma";

export async function list (req: Request, res: Response) {
  try {
    const searchText = req.query.description ?? '';
    const results = await prisma.genre.findMany({
      select: { id: true, description: true },
      where: {
        description: { contains: `${searchText}`, mode: 'insensitive' },
      },
    });
    res.status(200).send({ results });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function get (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const genre = await prisma.genre.findFirstOrThrow({
      where: { id: Number(id) },
    });
    res.status(200).send({ genre });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}
