import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma";
import { formatContent, getPaginationOptions, getPaginationResults } from './helpers';

function genresToConnect(genre: ContentGenreCreate) {
  return {
    genre: { connect: { id: Number(genre.id ?? genre) } }
  };
}

/**
 * Default list of contenidos
 */
async function defaultList (page: string | undefined, searchText: string) {
  const paginationOptions = getPaginationOptions(Number(page));
  const whereCondition: Prisma.ContentWhereInput = {
    title: { contains: `%${searchText}%`, mode: "insensitive" },
  };
  const [count, rows] = await prisma.$transaction([
    prisma.content.count({
      where: whereCondition,
    }),
    prisma.content.findMany({
      where: whereCondition,
      ...paginationOptions,
      ...defaultAttributes,
    })
  ])
  const paginationResults = getPaginationResults(Number(page), count);

  return {
    count,
    ...paginationResults,
    results: rows.map(formatContent),
  };
};

async function tableList (page: string | undefined, searchText: string) {
  const paginationOptions = getPaginationOptions(Number(page));
  const whereCondition: Prisma.ContentWhereInput = { title: { contains: `%${searchText}%`, mode: "insensitive" } }
  const [count, rows] = await prisma.$transaction([
    prisma.content.count({
      where: whereCondition,
    }),
    prisma.content.findMany({
      where: whereCondition,
      select: {
        id: true,
        title: true,
        year: true,
        duration: true,
        director: true,
      },
      orderBy: {
        id: 'desc',
      },
      ...paginationOptions,
    })
  ])
  const paginationResults = getPaginationResults(Number(page), count);

  return {
    count,
    ...paginationResults,
    results: rows
  };
}

async function cardList (_page: string | undefined, searchText: string) {
  const rows = await prisma.content.findMany({
      where: {
        title: { contains: `%${searchText}%`, mode: "insensitive" },
      },
      select: {
        id: true,
        title: true,
        urlImage: true,
        genres: { include: { genre: true } },
        maturityRating: true,
      },
    });
  return {
    count: rows.length,
    results: rows.map(formatContent),
  };
}

const defaultAttributes = {
  include: {
    genres: { include: { genre: true } },
    maturityRating: true,
  },
}

const ATTRIBUTES_FORMAT = {
  default: {
    getContents: defaultList,
  },
  table: {
    getContents: tableList,
  },
  card: {
    getContents: cardList,
  },
};

type ContenidoFormat = "default" | "table" | "card"

function isContenidoFormat(format: string): format is ContenidoFormat {
  return format in ["default", "table", "card"]
}

export async function list (req: Request, res: Response) {
  try {
    const { page } = req.query;
    const { title: titleSearch = '', format: formatQuery } = req.query;
    if(typeof page !== "string" && typeof page !== "undefined")
      throw new Error("Invalid page")
    if(typeof titleSearch !== "string")
      throw new Error("Invalid search text")
    if(typeof formatQuery !== "string")
      throw new Error("Invalid type of format")
    const { getContents } = isContenidoFormat(formatQuery) ? ATTRIBUTES_FORMAT[formatQuery] : ATTRIBUTES_FORMAT.default;
    const response = await getContents(page, titleSearch);

    res.status(200).send(response);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function create (req: Request, res: Response) {
  try {
    const { genres, ...fields } = req.body;
    const newContent = await prisma.content.create({
      data: {
        ...fields,
        genres: {
          create: genres.map(genresToConnect),
        },
      },
      include: {
        genres: { include: { genre: true } },
        maturityRating: true,
      },
    });
    res.status(200).send({ content: formatContent(newContent) });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function get (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const content = await prisma.content.findFirstOrThrow({
      where: { id: Number(id) },
      ...defaultAttributes,
    });
    res.status(200).send(formatContent(content));
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function patch (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { genres, ...fields } = req.body;
    const content = await prisma.content.update({
      where: { id: Number(id) },
      data: {
        ...fields,
        genres: {
          // Delete all and reassign
          deleteMany: {},
          create: genres.map(genresToConnect),
        },
      },
      include: {
        genres: { include: { genre: true } },
        maturityRating: true,
      },
    });
    res.status(200).send({ content: formatContent(content) });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function remove (req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.content.delete({
      where: { id: Number(id) },
    });
    res.status(200).send({ message: `Content deleted.` });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}
