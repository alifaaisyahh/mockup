import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  FileText, 
  Users, 
  Target, 
  Info, 
  Instagram, 
  Facebook, 
  Youtube, 
  MapPin,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', href: '#' },
    { 
      name: 'PROFIL', 
      href: '#', 
      dropdown: ['Visi Misi', 'Struktur Organisasi', 'Tugas Pokok dan Fungsi', 'Data Pegawai'] 
    },
    { name: 'BERITA', href: '#' },
    { name: 'PROGRAM', href: '#' },
    { 
      name: 'STANDAR PELAYANAN', 
      href: '#', 
      dropdown: ['Maklumat Pelayanan', 'SOP', 'Persyaratan Layanan'] 
    },
    { name: 'MEDIA & INFORMASI', href: '#' },
    { name: 'INTERAKSI', href: '#' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-header py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-gold">
              <span className="text-xs">PP</span>
            </div>
            <div>
              <h1 className={cn(
                "font-bold text-sm leading-tight tracking-tight",
                isScrolled ? "text-navy" : "text-white"
              )}>
                SATPOL PP <br />
                <span className="text-gold">KAB. KUBU RAYA</span>
              </h1>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={item.href} 
                  className={cn(
                    "nav-link flex items-center gap-1",
                    !isScrolled && "text-white/90 hover:text-white"
                  )}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown size={14} />}
                </a>
                
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2"
                      >
                        {item.dropdown.map((sub) => (
                          <a key={sub} href="#" className="dropdown-item">
                            {sub}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className={cn(
              "p-2 rounded-full transition-colors",
              isScrolled ? "text-navy hover:bg-slate-100" : "text-white hover:bg-white/10"
            )}>
              <Search size={20} />
            </button>
            <button className="bg-accent hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95">
              <AlertCircle size={18} />
              PENGADUAN
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} className={!isScrolled ? "text-white" : ""} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <a href={item.href} className="block text-lg font-medium text-navy">
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-2 border-l-2 border-slate-100 pl-4">
                      {item.dropdown.map((sub) => (
                        <a key={sub} href="#" className="block text-sm text-slate-600">
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Slider Simulation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/satpolpp1/1920/1080" 
          alt="Satpol PP Activity" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-bold tracking-wider mb-6 border border-gold/30">
            RESMI SATPOL PP KABUPATEN KUBU RAYA
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6">
            Menegakkan Perda, <br />
            <span className="text-gold">Menyelenggarakan</span> <br />
            Ketertiban Umum
          </h2>
          <p className="text-lg text-slate-200 mb-10 max-w-lg leading-relaxed">
            Berkomitmen memberikan pelayanan terbaik dalam menjaga ketentraman dan ketertiban masyarakat di wilayah Kabupaten Kubu Raya.
          </p>
          
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </section>
  );
};

const QuickAccess = () => {
  const items = [
    { icon: <FileText className="text-blue-600" />, title: 'SOP', desc: 'Standar Operasional Prosedur' },
    { icon: <Users className="text-emerald-600" />, title: 'Data Pegawai', desc: 'Informasi Kepegawaian' },
    { icon: <Target className="text-gold" />, title: 'Visi Misi', desc: 'Tujuan & Sasaran Organisasi' },
    { icon: <Info className="text-purple-600" />, title: 'Media Informasi', desc: 'Publikasi & Dokumentasi' },
  ];

  return (
    <section className="relative -mt-20 z-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl card-shadow border border-slate-100 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                {React.cloneElement(item.icon as React.ReactElement, { size: 32, className: "group-hover:text-white transition-colors" })}
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsSection = () => {
  const news = [
    {
      image: 'https://picsum.photos/seed/news1/600/400',
      date: '05 Maret 2024',
      title: 'Penertiban PKL di Kawasan Protokol Kubu Raya Berjalan Kondusif',
      excerpt: 'Satuan Polisi Pamong Praja Kabupaten Kubu Raya melakukan penertiban rutin terhadap pedagang kaki lima...'
    },
    {
      image: 'https://picsum.photos/seed/news2/600/400',
      date: '03 Maret 2024',
      title: 'Sosialisasi Perda Ketertiban Umum kepada Masyarakat Desa',
      excerpt: 'Upaya preventif terus dilakukan melalui sosialisasi langsung ke tingkat desa guna meningkatkan kesadaran...'
    },
    {
      image: 'https://picsum.photos/seed/news3/600/400',
      date: '01 Maret 2024',
      title: 'Satpol PP Kubu Raya Terima Penghargaan Pelayanan Publik Terbaik',
      excerpt: 'Prestasi membanggakan diraih oleh Satpol PP Kubu Raya dalam ajang penganugerahan kualitas pelayanan...'
    }
  ];

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-gold font-bold tracking-widest uppercase text-sm">Update Terkini</span>
            <h2 className="text-4xl font-extrabold text-navy mt-2">Berita Terbaru</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-navy font-bold hover:text-accent transition-colors">
            Lihat Semua Berita <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden card-shadow group border border-slate-100"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-navy flex items-center gap-1">
                  <Calendar size={12} />
                  {item.date}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-navy mb-4 line-clamp-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-navy group-hover:gap-3 transition-all">
                  Baca Selengkapnya <ArrowRight size={16} className="text-gold" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfoGraphics = () => {
  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-widest uppercase text-sm">Edukasi & Sosialisasi</span>
          <h2 className="text-4xl font-extrabold text-navy mt-2">Informasi Grafis</h2>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] snap-center">
                <div className="bg-slate-100 rounded-3xl aspect-[3/4] overflow-hidden border border-slate-200 group relative">
                  <img 
                    src={`https://picsum.photos/seed/info${i}/600/800`} 
                    alt="Infographic" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white font-bold text-lg">Sosialisasi Perda No. {i} Tahun 2024</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-navy w-6" : "bg-slate-300")}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Col 1: Identity */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-navy font-bold text-xl border-2 border-gold">
                <span className="text-xs">PP</span>
              </div>
              <h2 className="font-bold text-lg leading-tight">
                SATPOL PP <br />
                <span className="text-gold">KAB. KUBU RAYA</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Lembaga pemerintah yang bertugas menegakkan Peraturan Daerah dan menyelenggarakan ketertiban umum serta ketentraman masyarakat.
            </p>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin size={20} className="text-gold shrink-0" />
              <span>Jl. Arteri Supadio No. 1, Sungai Raya, Kabupaten Kubu Raya, Kalimantan Barat 78391</span>
            </div>
          </div>

          {/* Col 2: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-8 border-b border-white/10 pb-4">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone size={16} className="text-gold" />
                </div>
                <span>(0561) 1234567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail size={16} className="text-gold" />
                </div>
                <span>satpolpp@kuburayakab.go.id</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Clock size={16} className="text-gold" />
                </div>
                <div>
                  <p className="font-medium text-white">Jam Operasional</p>
                  <p className="text-xs">Senin - Jumat: 08:00 - 16:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-8 border-b border-white/10 pb-4">Media Sosial</h3>
            <p className="text-sm text-slate-400 mb-6">Ikuti kami untuk mendapatkan informasi terbaru seputar kegiatan Satpol PP.</p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={20} />, label: 'Instagram' },
                { icon: <Facebook size={20} />, label: 'Facebook' },
                { icon: <Youtube size={20} />, label: 'YouTube' },
                { icon: <AlertCircle size={20} />, label: 'TikTok' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Maps */}
          <div>
            <h3 className="text-lg font-bold mb-8 border-b border-white/10 pb-4">Lokasi Kantor</h3>
            <div className="rounded-2xl overflow-hidden h-48 bg-slate-800 border border-white/10">
              {/* Embed Google Maps Placeholder */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8178!2d109.3456!3d-0.0234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDEnMjQuMiJTIDEwOcKwMjAnNDQuMiJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© 2024 Satpol PP Kabupaten Kubu Raya. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Peta Situs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <QuickAccess />
        <NewsSection />
        <InfoGraphics />
      </main>
      <Footer />
      
      {/* Floating Emergency Button for Mobile */}
      <button className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center z-40 animate-bounce">
        <AlertCircle size={28} />
      </button>
    </div>
  );
}
