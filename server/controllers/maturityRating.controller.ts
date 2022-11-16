import { Request, Response } from "express";
import prisma from "../prisma";

export async function list (req: Request, res: Response) {
  try {
    const searchText = req.query.description ?? '';
    const results = await prisma.maturityRating.findMany({
      select: { id: true, description: true },
      where: {
        description: { contains: `${searchText}`, mode: "insensitive" },
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
    const maturityRating = await prisma.maturityRating.findFirstOrThrow({
      where: { id: Number(id) },
    });
    res.status(200).send({ maturityRating });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}
