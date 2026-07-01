import { motion } from "motion/react";
import { Check } from "lucide-react";
import { testimonials } from "../data";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold font-display text-white tracking-tight">
            Ce que disent ceux qui ont{" "}
            <span className="text-blue-500">travaillé avec moi</span>
          </h2>
          <div className="flex justify-center items-center mt-3 space-x-1.5">
            <span className="w-8 sm:w-12 h-1 bg-red-500 rounded-full" />
            <span className="w-8 sm:w-12 h-1 bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Testimonials Grid - Chat Style */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          id="testimonials-grid"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-all hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)] p-4 sm:p-6"
              id={`testimonial-card-${t.id}`}
            >
              {/* Header with Avatar, Name and Role */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-xs sm:text-sm truncate">{t.name}</h4>
                  <p className="text-slate-400 text-[11px] sm:text-xs truncate">{t.role}</p>
                </div>
                {/* Star Rating */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-red-500">★</span>
                  ))}
                </div>
              </div>

              {/* Message Bubble */}
              <div className="mb-4">
                <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-3 mb-2">
                  <p className="text-slate-100 text-sm leading-relaxed">{t.message}</p>
                </div>
                <p className="text-slate-500 text-xs ml-2">{t.time}</p>
              </div>

              {/* Reply Bubble */}
              <div>
                <div className="bg-green-900/30 border border-green-600/30 rounded-2xl rounded-tr-sm p-3 mb-2 ml-auto w-fit max-w-[85%]">
                  <p className="text-green-200 text-sm leading-relaxed">{t.reply}</p>
                </div>
                <div className="flex justify-end items-center gap-1 mr-2">
                  <p className="text-slate-500 text-xs">{t.replyTime}</p>
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
