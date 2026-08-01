import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiStar } from 'react-icons/fi';
import { testimonials } from '../../data/testimonials';
import Img from '../common/Img';

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Client stories</span>
        <h2 className="mt-2 font-display text-3xl font-semibold text-primary dark:text-surface sm:text-4xl">
          Trusted by people who notice the details
        </h2>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={24}
        className="testimonial-swiper pb-12"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="mx-auto max-w-2xl rounded-4xl glass-light p-10 text-center shadow-sm">
              <div className="mb-4 flex justify-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} className="fill-gold" />
                ))}
              </div>
              <p className="font-display text-xl leading-relaxed text-primary dark:text-surface sm:text-2xl">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Img src={t.photo} fallbackSeed={t.name} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="text-left">
                  <p className="font-semibold text-primary dark:text-surface">{t.name}</p>
                  <p className="text-sm text-primary/50 dark:text-surface/50">{t.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
