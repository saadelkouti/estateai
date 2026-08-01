import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHeart, FiMapPin, FiPhone, FiMail, FiX, FiCheck, FiShare2, FiZoomIn,
} from 'react-icons/fi';
import { LuBedDouble, LuBath, LuCar } from 'react-icons/lu';
import { properties } from '../data/properties';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { formatFullPrice } from '../utils/format';
import Img from '../components/common/Img';
import PropertyCard from '../components/property/PropertyCard';
import MapPlaceholder from '../components/property/MapPlaceholder';

export default function PropertyDetails() {
  const { slug } = useParams();
  const property = properties.find((p) => p.slug === slug);
  const [zoomImage, setZoomImage] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  if (!property) return <Navigate to="/404" replace />;

  const related = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  const handleContact = (e) => {
    e.preventDefault();
    setFormSent(true);
    showToast(`Your inquiry was sent to ${property.agent.name}`, 'success');
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Gallery */}
        <div className="relative mb-8 overflow-hidden rounded-4xl">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="property-gallery aspect-[16/9] sm:aspect-[21/9]"
          >
            {property.images.map((img, i) => (
              <SwiperSlide key={i}>
                <button className="relative block h-full w-full" onClick={() => setZoomImage(img)}>
                  <Img src={img} fallbackSeed={`${property.slug}-${i}`} alt={`${property.title} photo ${i + 1}`} className="h-full w-full object-cover" />
                  <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-primary/60 text-surface">
                    <FiZoomIn size={16} />
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-gold-gradient px-3 py-1 text-xs font-semibold text-primary">
                  {property.status}
                </span>
                <h1 className="mt-3 font-display text-3xl font-semibold text-primary dark:text-surface sm:text-4xl">
                  {property.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-primary/50 dark:text-surface/50">
                  <FiMapPin /> {property.location}, {property.country}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(property.id, property.title)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-primary/5 dark:bg-surface/10 text-primary dark:text-surface"
                >
                  <FiHeart className={isFavorite(property.id) ? 'fill-gold text-gold' : ''} />
                </button>
                <button
                  onClick={() => showToast('Link copied to clipboard', 'info')}
                  className="grid h-11 w-11 place-items-center rounded-full bg-primary/5 dark:bg-surface/10 text-primary dark:text-surface"
                >
                  <FiShare2 />
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: LuBedDouble, label: 'Bedrooms', value: property.bedrooms },
                { icon: LuBath, label: 'Bathrooms', value: property.bathrooms },
                { icon: LuCar, label: 'Garage', value: property.garage },
                { icon: FiMapPin, label: 'Area', value: `${property.area.toLocaleString()} sqft` },
              ].map((s) => (
                <div key={s.label} className="rounded-3xl bg-primary/[0.03] dark:bg-surface/5 p-5 text-center">
                  <s.icon className="mx-auto mb-2 text-xl text-accent" />
                  <p className="font-display text-lg font-semibold text-primary dark:text-surface">{s.value}</p>
                  <p className="text-xs text-primary/50 dark:text-surface/50">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-primary dark:text-surface">Description</h2>
              <p className="mt-4 leading-relaxed text-primary/60 dark:text-surface/60">{property.description}</p>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-primary dark:text-surface">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 rounded-2xl bg-primary/[0.03] dark:bg-surface/5 px-4 py-3 text-sm text-primary/70 dark:text-surface/70">
                    <FiCheck className="shrink-0 text-success" /> {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold text-primary dark:text-surface">Property Information</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4 rounded-3xl bg-primary/[0.03] dark:bg-surface/5 p-6 sm:grid-cols-3">
                {[
                  ['Type', property.type],
                  ['Year Built', property.yearBuilt],
                  ['Status', property.status],
                  ['Rating', `★ ${property.rating}`],
                  ['Listed', `${property.listedDaysAgo} days ago`],
                  ['Reference', `EST-${String(property.id).padStart(4, '0')}`],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-wide text-primary/40 dark:text-surface/40">{label}</dt>
                    <dd className="mt-1 font-medium text-primary dark:text-surface">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10">
              <h2 className="mb-4 font-display text-xl font-semibold text-primary dark:text-surface">Location</h2>
              <MapPlaceholder center={`${property.city}, ${property.country}`} />
            </div>
          </div>

          {/* Sticky contact card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-4xl bg-white dark:bg-secondary p-6 shadow-glass">
              <p className="font-display text-3xl font-semibold text-primary dark:text-surface">
                {formatFullPrice(property.price)}
                {property.status === 'For Rent' && <span className="text-base text-primary/40 dark:text-surface/40"> /mo</span>}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-primary/5 dark:border-surface/10 pt-6">
                <Img src={property.agent.photo} fallbackSeed={property.agent.id} alt={property.agent.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-primary dark:text-surface">{property.agent.name}</p>
                  <p className="text-xs text-primary/50 dark:text-surface/50">{property.agent.speciality}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a href={`tel:${property.agent.phone}`} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary/5 dark:bg-surface/10 py-2.5 text-sm font-medium text-primary dark:text-surface">
                  <FiPhone size={14} /> Call
                </a>
                <a href={`mailto:${property.agent.email}`} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary/5 dark:bg-surface/10 py-2.5 text-sm font-medium text-primary dark:text-surface">
                  <FiMail size={14} /> Email
                </a>
              </div>

              <form onSubmit={handleContact} className="mt-6 space-y-3">
                <input required placeholder="Your name" className="w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-4 py-2.5 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent" />
                <input required type="email" placeholder="Your email" className="w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-4 py-2.5 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent" />
                <textarea
                  required
                  rows={3}
                  defaultValue={`I'm interested in ${property.title}. Could you share more details?`}
                  className="w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-4 py-2.5 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary dark:bg-gold py-3 text-sm font-semibold text-surface dark:text-primary transition-transform hover:scale-105"
                >
                  {formSent ? 'Inquiry Sent ✓' : 'Request Viewing'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-semibold text-primary dark:text-surface">Related Properties</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-primary/90 p-6 backdrop-blur-sm"
          >
            <button onClick={() => setZoomImage(null)} className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full glass text-surface">
              <FiX />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={zoomImage}
              alt="Zoomed property view"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
