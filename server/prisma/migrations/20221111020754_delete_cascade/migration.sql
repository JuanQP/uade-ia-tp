-- DropForeignKey
ALTER TABLE "CarouselContent" DROP CONSTRAINT "CarouselContent_carouselId_fkey";

-- DropForeignKey
ALTER TABLE "CarouselContent" DROP CONSTRAINT "CarouselContent_contentId_fkey";

-- DropForeignKey
ALTER TABLE "ContentGenre" DROP CONSTRAINT "ContentGenre_contentId_fkey";

-- DropForeignKey
ALTER TABLE "ContentGenre" DROP CONSTRAINT "ContentGenre_genreId_fkey";

-- AddForeignKey
ALTER TABLE "CarouselContent" ADD CONSTRAINT "CarouselContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarouselContent" ADD CONSTRAINT "CarouselContent_carouselId_fkey" FOREIGN KEY ("carouselId") REFERENCES "Carousel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentGenre" ADD CONSTRAINT "ContentGenre_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentGenre" ADD CONSTRAINT "ContentGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
