'use client'

import { useEffect, useState } from 'react'
import { NoteTag } from '@prisma/client'
import { NoteTagItemToggle } from '@/components/shared/tag-item-toggle'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { itemVariants, listVariants } from '@/lib/animation/variants'

export function NoteTagsContainer({ tags }: { tags: NoteTag['tagName'][] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="relative w-full">
      {/* 左侧 fade 遮罩 */}
      <span
        className={cn(
          'absolute left-0 top-0 bottom-0 w-12 z-10',
          'bg-gradient-to-r from-white/80 to-transparent dark:from-black/60',
          'pointer-events-none transition-colors duration-300 ease-in-out',
          current === 1 && 'hidden',
        )}
      />
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
        setApi={setApi}
        // * 魔法值，后序考虑使用计算得到
        className="w-full max-w-[97vw]"
      >
        <CarouselContent>
          {tags.length === 0 ? (
            <p className="text-muted-foreground m-auto">没有标签 (｡•́︿•̀｡)</p>
          ) : (
            <motion.section
              className="flex"
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {tags.map(tag => (
                <motion.div key={tag.toLowerCase()} variants={itemVariants}>
                  <CarouselItem className="basis-auto">
                    <NoteTagItemToggle tag={tag} />
                  </CarouselItem>
                </motion.div>
              ))}
            </motion.section>
          )}
        </CarouselContent>
      </Carousel>

      {/* 右侧 fade 遮罩 */}
      <span
        className={cn(
          'absolute right-0 top-0 bottom-0 w-12 z-10',
          'bg-gradient-to-l from-white/80 to-transparent dark:from-black/60',
          'pointer-events-none transition-colors duration-300 ease-in-out',
          current === count && 'hidden',
        )}
      />
    </section>
  )
}
