import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma";
import { formatContent, getPaginationOptions, getPaginationResults } from './helpers';

// TODO: Fix this two "any" types of a Carousel with Contents
function format(carousel: any) {
  return {
    ...carousel,
    contents: carousel.contents.map((c: any) => ({
      order: c.order,
      ...formatContent(c.content),
    })),
  }
}

async function defaultList (page: string | undefined, searchText: string) {
  const paginationOptions = getPaginationOptions(Number(page));
  const whereCondition: Prisma.CarouselWhereInput = {
    title: { contains: `%${searchText}%`, mode: "insensitive" },
  };
  const [count, rows] = await prisma.$transaction([
    prisma.carousel.count({
      where: whereCondition,
    }),
    prisma.carousel.findMany({
      where: whereCondition,
      ...paginationOptions,
      ...defaultAttributes,
    })
  ])
  const paginationResults = getPaginationResults(Number(page), count);

  return {
    count,
    ...paginationResults,
    results: rows.map(format),
  };
};

async function tableList (page: string | undefined, searchText: string) {
  const paginationOptions = getPaginationOptions(Number(page));
  const whereCondition: Prisma.CarouselWhereInput = {
    title: { contains: `%${searchText}%`, mode: "insensitive" },
  };
  const [count, rows] = await prisma.$transaction([
    prisma.carousel.count({
      where: whereCondition,
    }),
    prisma.carousel.findMany({
      where: whereCondition,
      ...paginationOptions,
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        id: 'desc',
      },
    })
  ])
  const paginationResults = getPaginationResults(Number(page), count);

  return {
    count,
    ...paginationResults,
    results: rows,
  };
}

const contentsInclude: Prisma.CarouselContentFindManyArgs = {
  include: {
    content: {
      include: {
        genres: {
          include: {
            genre: true
          }
        },
        maturityRating: true,
      }
    },
  },
  orderBy: {
    order: 'asc',
  }
};

const defaultAttributes = {
  select: {
    id: true,
    title: true,
    contents: contentsInclude,
  }
}

function contentsToConnect(content: CarouselContentCreate) {
  return {
    content: {
      connect: {
        id: Number(content.id),
      },
    },
    order: Number(content.order),
  };
}

export async function list (req: Request, res: Response) {
  try {
    const { title: titleSearch = '', page } = req.query;
    if(typeof page !== "string" && typeof page !== "undefined")
      throw new Error("Invalid page")
    if(typeof titleSearch !== "string")
      throw new Error("Invalid search text")
    const getCarousels = req.query?.format === 'table' ? tableList : defaultList;
    const response = await getCarousels(page, titleSearch);

    res.status(200).send(response);
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function create (req: Request, res: Response) {
  try {
    const { contents, ...fields } = req.body;
    const newCarousel = await prisma.carousel.create({
      data: {
        ...fields,
        contents: {
          create: contents.map(contentsToConnect),
        }
      },
      include: {
        contents: contentsInclude,
      },
    });

    res.status(200).send({
      carousel: format(newCarousel),
    });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function get (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const carousel = await prisma.carousel.findFirstOrThrow({
      where: { id: Number(id) },
      ...defaultAttributes,
    });
    res.status(200).send(format(carousel));
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function patch (req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { contents, ...fields } = req.body;
    const carousel = await prisma.carousel.update({
      where: { id: Number(id) },
      data: {
        ...fields,
        contents: {
          deleteMany: {},
          create: contents.map(contentsToConnect),
        }
      },
      include: {
        contents: contentsInclude,
      }
    });
    res.status(200).send({
      carousel: format(carousel),
    });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}

export async function remove (req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.carousel.delete({
      where: { id: Number(id) },
    });
    res.status(200).send({ message: `Carousel deleted.` });
  } catch (error: any) {
    res.status(400).send({message: error.message});
  }
}
