import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Wind, Heart, Brain, ChevronDown, User, Users, MapPin, Clock, MessageCircle, Info, CheckCircle2, XCircle, Calendar, Instagram } from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Over Martin', href: '#over' },
    { name: 'Aanbod', href: '#methode' },
    { name: 'Wat brengt het jou?', href: '#resultaten' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#" 
          className="flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img 
            src="https://i.ibb.co/LdxFtVKT/logo.png" 
            alt="Nieuwe Adem Logo" 
            className="h-12 md:h-16 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-xl md:text-2xl font-bold tracking-wide text-text-dark">Nieuwe Adem</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors text-text-dark/80 hover:text-powder-blue`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-leaf-green text-white text-sm font-medium rounded-full hover:bg-leaf-green/90 transition-all duration-300 shadow-sm"
          >
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-powder-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg-base shadow-lg py-8 px-6 flex flex-col space-y-6 md:hidden border-t border-soft-lavender/30"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-text-dark/80 hover:text-powder-blue tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-leaf-green text-white text-center font-medium rounded-full mt-4 shadow-sm hover:bg-leaf-green/90 transition-colors"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-bg-base">
      {/* Soft decorative background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-soft-lavender/40 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-powder-blue/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/60 border border-powder-blue/40 shadow-lg shadow-powder-blue/10 backdrop-blur-md">
            <span className="text-powder-blue font-bold tracking-widest uppercase text-xl md:text-3xl drop-shadow-sm">
              Adem als startpunt voor verandering
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-xl flex flex-col justify-center"
          >
            <h1 className="text-lg md:text-2xl font-medium text-powder-blue leading-[1.2] mb-6 tracking-tight drop-shadow-sm">
              Van overleven naar voluit leven.
            </h1>
            <p className="text-lg md:text-xl text-text-dark/80 mb-10 leading-relaxed font-light max-w-lg">
              In een wereld die nooit uitstaat, is je ademhaling de directe weg terug naar jezelf. Het is de snelste manier om je zenuwstelsel te kalmeren: door je adempatroon te optimaliseren, geef je je lichaam het signaal dat het veilig is. Wetenschappelijk onderbouwd, fysiek voelbaar. Spanning maakt plaats voor ruimte, en energie gaat weer stromen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact-form" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-leaf-green text-white rounded-full font-medium hover:bg-leaf-green/90 transition-colors shadow-sm text-center"
              >
                Plan een kennismaking
              </a>
              <a 
                href="#methode" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('methode')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-leaf-green border border-leaf-green/30 rounded-full font-medium hover:bg-soft-lavender/20 transition-colors shadow-sm text-center"
              >
                Bekijk mijn aanbod
              </a>
            </div>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative mt-8 md:mt-0 h-[350px] md:h-auto"
        >
          <img
            src="https://i.ibb.co/sJpDDNyY/plant4.jpg"
            alt="Rustgevende plant"
            className="rounded-[2.5rem] shadow-xl object-cover w-full h-full opacity-90 absolute inset-0"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="over" className="py-32 bg-bg-base">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl border border-soft-lavender/30">
            <img 
              src="https://i.ibb.co/ZpffcrHB/Martin1.png" 
              alt="Martin - Ademcoach" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-powder-blue/30 rounded-full blur-2xl"></div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-medium text-powder-blue mb-4 drop-shadow-sm tracking-tight">
            Over <span className="font-light">Martin</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-powder-blue/80 font-medium mb-8">
            Geef je adem de ruimte, geef jezelf rust.
          </h3>
          <div className="space-y-6 text-text-dark/80 font-light text-lg leading-relaxed">
            <p>
              Ik ben Martin, mijn eigen reis met ademwerk begon vanuit een zoektocht naar een betere balans tussen mijn werk en privéleven. Pas toen ik zelf een verbonden ademhalingssessie ontving, ervaarde ik de werkelijke kracht en helende potentie van de adem. Die ervaring was zo’n eye-opener dat ik besloot deze kennis zelf door te gaan geven. Inmiddels heb ik mijn opleiding bij het Ruach Ademcentrum afgerond.
            </p>
            <p>
              Naast mijn werk als gecertificeerd ademcoach ben ik werkzaam als Persoonlijk Begeleider in de gehandicaptenzorg. Het begeleiden van mensen zit in mijn natuur; ik ben geduldig, rustig en empathisch. In mijn sessies creëer ik een veilige bedding waarin ik werk met zachtheid, lichte aanraking, drukpunten, geluid en energie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Aanbod = () => {
  return (
    <section 
      id="methode" 
      className="py-32 relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://i.ibb.co/wH3d65h/bos-water2.png')" }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[3px]"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl md:text-5xl font-medium text-powder-blue mb-8 drop-shadow-sm tracking-tight">
            Aanbod & Tarieven
          </h2>
          <p className="text-lg text-white font-light leading-relaxed drop-shadow-md">
            Kies de sessie die bij je past of vraag naar andere mogelijkheden. Of je nu een eerste stap wilt zetten of klaar bent voor een dieper traject, ik begeleid je graag op jouw pad naar meer rust en ruimte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Ademsessie Individueel",
              price: "€ 79,50",
              details: [
                { icon: <User size={18} />, text: "1 ademsessie" },
                { icon: <MapPin size={18} />, text: "Locatie: Bergen op Zoom" },
                { icon: <Clock size={18} />, text: "Tijd: ca 90 min" },
                { icon: <MessageCircle size={18} />, text: "+ intakegesprek" }
              ],
              buttonText: "Neem contact op",
              popular: false
            },
            {
              title: "Adempakket Individueel",
              price: "€ 299,00",
              details: [
                { icon: <User size={18} />, text: "4 ademsessies" },
                { icon: <MapPin size={18} />, text: "Locatie: Bergen op Zoom" },
                { icon: <Clock size={18} />, text: "Tijd: ca 90 min" },
                { icon: <MessageCircle size={18} />, text: "+ intakegesprek" }
              ],
              buttonText: "Neem contact op",
              popular: true
            },
            {
              title: "Ademsessie Duo",
              price: "€ 139,00",
              details: [
                { icon: <Users size={18} />, text: "1 sessie voor 2 personen" },
                { icon: <MapPin size={18} />, text: "Locatie: Bergen op Zoom" },
                { icon: <Clock size={18} />, text: "Tijd: ca 90 min" },
                { icon: <MessageCircle size={18} />, text: "+ intakegesprek" }
              ],
              buttonText: "Neem contact op",
              popular: false
            },
            {
              title: "Ademcirkel",
              price: "Zie agenda",
              priceSubtext: undefined,
              details: [
                { icon: <Users size={18} />, text: "Sessie: groep" },
                { icon: <Info size={18} />, text: "Ademcirkels worden zowel in kleine- en grote groepen georganiseerd." }
              ],
              buttonText: "Agenda",
              popular: false
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`relative bg-bg-base p-10 rounded-[2rem] border ${item.popular ? 'border-leaf-green shadow-lg hover:scale-105' : 'border-transparent'} hover:border-soft-lavender hover:bg-soft-lavender/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-powder-blue/20 flex flex-col h-full text-center`}
            >
              {item.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-leaf-green text-white px-4 py-1 rounded-full text-sm font-medium tracking-wide">
                  Aanbieding
                </div>
              )}
              
              <h3 className="text-2xl font-medium text-text-dark mb-2">{item.title}</h3>
              <div className="mb-8">
                <span className="text-4xl font-medium text-powder-blue">{item.price}</span>
                {item.priceSubtext && <span className="text-text-dark/60 ml-2 text-sm">{item.priceSubtext}</span>}
              </div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex flex-col items-center justify-center gap-2 text-text-dark/80 font-light">
                    <span className="text-ocean-blue">{detail.icon}</span>
                    <span className="leading-relaxed">{detail.text}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href={item.buttonText === "Agenda" ? "#agenda" : "#contact-form"}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.buttonText === "Agenda") {
                    document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-4 rounded-full font-medium transition-colors shadow-sm text-center block bg-leaf-green text-white hover:bg-leaf-green/90"
              >
                {item.buttonText}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  return (
    <section id="resultaten" className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium text-powder-blue mb-4 drop-shadow-sm tracking-tight">
              Wat brengt het jou?
            </h2>
            <p className="text-xl md:text-2xl text-text-dark font-semibold mb-12">
              De kracht van verbonden ademhaling
            </p>
            <div className="space-y-10">
              {[
                {
                  title: "Krachtige stressreductie en mentale helderheid",
                  desc: "Door de pauzes tussen de in- en uitademing weg te laten, wordt de activiteit van het parasympathische zenuwstelsel verhoogd. Dit lokt een diepe ontspanningsrespons uit die de spiegel van stresshormonen, zoals cortisol, meetbaar verlaagt. Hierdoor wordt de constante stroom van piekergedachten doorbroken, wat ruimte maakt voor mentale helderheid en een gekalmeerde geest."
                },
                {
                  title: "Verhoogde energie en vitaliteit",
                  desc: "Het ritmische patroon van de verbonden ademhaling optimaliseert de zuurstofcirculatie naar alle cellen in het lichaam. Dit proces helpt bij het \"opschonen\" van fysieke en emotionele blokkades die in de weefsels zijn opgeslagen. Wanneer deze belemmeringen worden getransformeerd, kan de levensenergie weer vrij stromen, wat resulteert in een groter gevoel van vitaliteit."
                },
                {
                  title: "Zenuwstelselregulatie voor een betere nachtrust",
                  desc: "Verbonden ademhaling fungeert als een \"hack\" voor het zenuwstelsel om over te schakelen van de alerte sympathische stand naar de 'rust-en-herstel'-modus. Door deze fysiologische verschuiving komt het lichaam in een staat van diepe rust, wat essentieel is voor het herstellen van een gezond dag-nachtritme en het bevorderen van een diepere, herstellende slaap."
                },
                {
                  title: "Diepere zelfverbinding en intuïtief vertrouwen",
                  desc: "De techniek verlaagt de drempel naar het onderbewustzijn, waardoor u bewuster wordt van lichamelijke sensaties en opgeslagen emoties. Dit vergroot het zelfbewustzijn en leert u te luisteren naar de subtiele signalen van uw lichaam. Deze versterkte verbinding met uw eigen kern helpt om meer te vertrouwen op uw innerlijk weten en intuïtie."
                }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-6 group p-6 rounded-[2rem] border border-transparent hover:border-soft-lavender/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-leaf-green flex items-center justify-center mt-1 group-hover:bg-leaf-green/90 transition-colors duration-300">
                    <Wind size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-text-dark mb-3">{benefit.title}</h3>
                    <p className="text-text-dark/70 font-light leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
}

const parseICSDate = (dateStr: string): Date => {
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));
  
  if (dateStr.length > 8) {
    const hour = parseInt(dateStr.substring(9, 11));
    const minute = parseInt(dateStr.substring(11, 13));
    const second = parseInt(dateStr.substring(13, 15));
    if (dateStr.endsWith('Z')) {
      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }
    return new Date(year, month, day, hour, minute, second);
  }
  
  return new Date(year, month, day);
};

const parseICS = (icsData: string): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const unfoldedData = icsData.replace(/\r?\n[ \t]/g, '');
  const lines = unfoldedData.split(/\r?\n/);
  
  let currentEvent: Partial<CalendarEvent> | null = null;
  
  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) {
      currentEvent = {};
    } else if (line.startsWith('END:VEVENT')) {
      if (currentEvent && currentEvent.start && currentEvent.title) {
        events.push(currentEvent as CalendarEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      const colonIdx = line.indexOf(':');
      if (colonIdx === -1) continue;
      const key = line.substring(0, colonIdx);
      const value = line.substring(colonIdx + 1);
      
      if (key === 'SUMMARY') {
        currentEvent.title = value.replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\n/g, '\n');
      } else if (key.startsWith('DTSTART')) {
        currentEvent.start = parseICSDate(value);
      } else if (key.startsWith('DTEND')) {
        currentEvent.end = parseICSDate(value);
      } else if (key === 'DESCRIPTION') {
        const decoded = value.replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\n/g, '\n');
        currentEvent.description = decoded.replace(/<[^>]*>?/gm, '');
      } else if (key === 'LOCATION') {
        currentEvent.location = value.replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\n/g, '\n');
      } else if (key === 'UID') {
        currentEvent.id = value;
      }
    }
  }
  
  return events.sort((a, b) => a.start.getTime() - b.start.getTime());
};

const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a 
          key={i} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-ocean-blue hover:text-powder-blue underline transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const Agenda = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const icsUrl = 'https://calendar.google.com/calendar/ical/martin.nieuweadem%40gmail.com/public/basic.ics';
        
        const proxies = [
          {
            url: `https://api.allorigins.win/get?url=${encodeURIComponent(icsUrl)}`,
            isJson: true
          },
          {
            url: `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(icsUrl)}`,
            isJson: false
          }
        ];

        let data = '';
        let success = false;

        const fetchWithTimeout = async (url: string, timeout = 6000) => {
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), timeout);
          try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            return response;
          } catch (error) {
            clearTimeout(id);
            throw error;
          }
        };

        for (const proxy of proxies) {
          try {
            const response = await fetchWithTimeout(proxy.url);
            if (response.ok) {
              const text = await response.text();
              
              if (proxy.isJson) {
                try {
                  const json = JSON.parse(text);
                  if (json.contents && json.contents.includes('BEGIN:VCALENDAR')) {
                    data = json.contents;
                    success = true;
                    break;
                  }
                } catch (jsonError) {
                  // Ignore JSON parse errors
                }
              } else {
                if (text.includes('BEGIN:VCALENDAR')) {
                  data = text;
                  success = true;
                  break;
                }
              }
            }
          } catch (e) {
            console.warn(`Proxy failed: ${proxy.url}`);
          }
        }

        if (!success) {
          throw new Error('All proxies failed to fetch the calendar');
        }
        
        const parsedEvents = parseICS(data);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const upcomingEvents = parsedEvents.filter(e => e.start >= now).slice(0, 6);
        
        setEvents(upcomingEvents);
      } catch (err) {
        console.error('Error fetching calendar:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section 
      id="agenda" 
      className="py-32 relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://i.ibb.co/nqK6kSR2/lucid-origin-professional-photo-of-image-profile-source-style-cinematic-golden-hour-lifestyle-0.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium text-powder-blue mb-6 drop-shadow-sm tracking-tight">
            Agenda
          </h2>
          <p className="text-lg md:text-xl text-text-dark/80 font-light max-w-2xl mx-auto">
            Bekijk de planning voor aankomende ademcirkels en evenementen.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {loading ? (
            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-12 text-center shadow-sm border border-white">
              <div className="animate-spin w-10 h-10 border-4 border-leaf-green border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-text-dark/70 font-medium tracking-wide">Agenda laden...</p>
            </div>
          ) : error ? (
            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-16 text-center shadow-sm border border-white">
              <Calendar className="w-16 h-16 text-leaf-green mx-auto mb-6 opacity-80" />
              <p className="text-xl text-text-dark font-medium mb-3">Er konden momenteel geen afspraken worden geladen.</p>
              <p className="text-lg text-text-dark/60 font-light">
                (Soms blokkeren ad-blockers het inladen van de kalender data). Neem direct contact op voor de actuele beschikbaarheid.
              </p>
              <a 
                href="#contact-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block mt-8 px-8 py-3 bg-leaf-green text-white rounded-full font-medium shadow-sm hover:bg-leaf-green/90 transition-colors"
              >
                Neem contact op
              </a>
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-16 text-center shadow-sm border border-white">
              <Calendar className="w-16 h-16 text-leaf-green mx-auto mb-6 opacity-80" />
              <p className="text-xl text-text-dark font-medium mb-3">Er staan momenteel geen openbare groepsessies gepland.</p>
              <p className="text-lg text-text-dark/60 font-light">
                Mocht je interesse hebben in een 1-op-1 sessie of zelf een groep vormen, neem dan contact op!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group bg-white/95 backdrop-blur-md rounded-[2rem] p-8 shadow-sm hover:shadow-xl border border-soft-lavender/40 hover:border-powder-blue/40 transition-all duration-300 hover:-translate-y-1 flex gap-6"
                >
                  <div className="flex-shrink-0 bg-soft-lavender/30 text-ocean-blue rounded-2xl w-24 h-24 flex flex-col items-center justify-center p-2 group-hover:bg-powder-blue group-hover:text-white transition-colors duration-300 shadow-sm">
                    <span className="block text-sm font-bold uppercase tracking-widest mb-1">
                      {event.start.toLocaleDateString('nl-NL', { month: 'short' })}
                    </span>
                    <span className="block text-4xl font-light leading-none">
                      {event.start.getDate()}
                    </span>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-text-dark mb-4 leading-tight group-hover:text-ocean-blue transition-colors">{event.title}</h3>
                      <div className="flex flex-col gap-2.5 text-sm md:text-base text-text-dark/70 font-light">
                        <div className="flex items-center gap-3">
                          <Clock size={18} className="text-leaf-green flex-shrink-0" />
                          <span>
                            {event.start.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex flex-start gap-3">
                            <MapPin size={18} className="text-leaf-green flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {event.description && (
                      <div className="mt-5 pt-5 border-t border-soft-lavender/30">
                        <p className="text-sm text-text-dark/60 line-clamp-3 leading-relaxed">
                          {renderTextWithLinks(event.description)}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Voor wie is ademwerk geschikt?",
      a: "Ademwerk is in de basis een waardevolle methode voor iedereen die verlangt naar meer fysiologische rust, vitale energie en een diepere verbinding met zichzelf. Door bewust te ademen, beïnvloed je direct je zenuwstelsel om stress effectief te reguleren en vastgezette spanning los te laten. Omdat intensieve technieken (zoals verbonden ademhaling) krachtige processen in het lichaam activeren, is het echter niet voor iedereen zonder overleg veilig toe te passen. Er gelden specifieke contra-indicaties, zoals hart- en vaatziekten, epilepsie, zwangerschap en ernstige psychische aandoeningen zoals psychoses of zware PTSS. Val je binnen een van deze doelgroepen of twijfel je of deze vorm van ademwerk momenteel passend is voor jouw gezondheid? Neem dan altijd eerst contact op, zodat we kunnen overleggen of een zachte, aangepaste ademtechniek veiliger en beter voor jou is."
    },
    {
      q: "Hoe ziet een sessie eruit?",
      a: (
        <div className="space-y-4">
          <p>Een ademsessie is een veilig en gestructureerd proces, afgestemd op jouw persoonlijke behoeften. De sessie is opgebouwd uit de volgende drie fases:</p>
          <p><strong>Voorgesprek & Intentie:</strong> We starten met een korte afstemming om te bespreken waar je op dit moment staat en we zetten een heldere intentie voor de sessie.</p>
          <p><strong>De Ademsessie:</strong> Terwijl je comfortabel en warm ligt, begeleid ik je door de specifieke ademtechnieken. Met behulp van gerichte coaching, ondersteunende muziek en (alleen indien jij dit prettig vindt) lichte fysieke aanraking, helpen we jouw zenuwstelsel te reguleren en vastgezette spanning los te laten.</p>
          <p><strong>Ontspanning & Integratie:</strong> We sluiten de sessie af met een diepe rustfase. Dit is fysiologisch gezien een cruciaal moment: je lichaam krijgt de tijd om de zuurstof- en CO2-balans te herstellen, terwijl je zenuwstelsel optimaal kalmeert en opgedane inzichten integreert.</p>
        </div>
      )
    },
    {
      q: "Hoeveel sessies heb ik nodig?",
      a: "Het effect van ademwerk op het lichaam is heel persoonlijk. Sommige cliënten ervaren na één sessie al een enorme verschuiving, met een directe en merkbare afname van fysieke spanning of mentale onrust. Echter, wanneer (stress)patronen al langere tijd in het zenuwstelsel zijn opgeslagen, heeft het lichaam simpelweg herhaling nodig om nieuwe fysiologische veiligheid te verankeren. Voor een diepgaande en blijvende transformatie raad ik daarom vaak een traject van 4 sessies aan. Op deze manier geven we jouw systeem de tijd om vastgezette spanning structureel los te laten en bouwen we duurzaam aan een gezond, functioneel adempatroon."
    },
    {
      q: "Is het normaal dat ik emotioneel word?",
      a: (
        <div className="space-y-4">
          <p>Ja, absoluut. Dit is een veelvoorkomende en fysiologisch verklaarbare reactie. Je ademhaling functioneert als de afstandsbediening van je zenuwstelsel. In tijden van stress of spanning hebben we de neiging om emoties fysiek in ons lichaam vast te zetten. Door bewust en verdiept te ademen, geef je jouw zenuwstelsel het signaal dat het veilig is om deze onderdrukte spanning weer in beweging te brengen en los te laten.</p>
          <p>Tijdens dit proces van ontladen mag alles er zijn: van tranen en boosheid tot lachen, trillen of een gevoel van intense opluchting. De sessie biedt een veilige, begeleide ruimte waarin jouw lichaam precies datgene kan loslaten wat het nodig heeft om weer in balans te komen.</p>
        </div>
      )
    }
  ];

  return (
    <section 
      id="faq" 
      className="py-32 relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://i.ibb.co/q30C34k0/melanen1.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[3px]"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 drop-shadow-md tracking-tight">Veelgestelde Vragen</h2>
          <p className="text-lg text-white/90 font-light drop-shadow-sm">Alles wat je moet weten voor je eerste sessie.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-bg-base rounded-[1.5rem] overflow-hidden border border-transparent hover:border-soft-lavender/50 transition-all duration-300"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-lg font-medium text-text-dark pr-8">{faq.q}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${openIndex === i ? 'bg-powder-blue text-white' : 'bg-soft-lavender text-powder-blue'}`}>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 pt-2 text-text-dark/70 font-light leading-relaxed text-lg">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 10000);
  };

  return (
    <section 
      id="contact" 
      className="py-32 relative bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://i.ibb.co/27xfkZ5M/2.jpg')" }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${
              toast.type === 'success' ? 'bg-white text-leaf-green border border-leaf-green/20' : 'bg-white text-red-500 border border-red-500/20'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
            <span className="font-medium text-text-dark">{toast.message}</span>
            <button 
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              className="ml-4 text-text-dark/40 hover:text-text-dark transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-white/50 backdrop-blur-[3px]"></div>
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-medium text-white mb-16 drop-shadow-md tracking-tight">
            Klaar om je adem in beweging te zetten?
          </h2>

          <div id="contact-form" className="max-w-xl mx-auto scroll-mt-24">
            <form 
              action="https://formsubmit.co/4259591ae232cefb5024f14d196935cf"
              method="POST"
              className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/60 shadow-xl text-left"
              onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  
                  fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                  })
                  .then(response => {
                    if (response.ok) {
                      showToast('Bedankt voor je bericht! Ik neem zo spoedig mogelijk contact met u op.', 'success');
                      form.reset();
                    } else {
                      showToast('Er is iets misgegaan. Probeer het later opnieuw.', 'error');
                    }
                  })
                  .catch(error => {
                    showToast('Er is iets misgegaan. Probeer het later opnieuw.', 'error');
                  });
                }}
              >
                {/* Honeypot */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                {/* Disable Captcha */}
                <input type="hidden" name="_captcha" value="false" />
                {/* Disable next page (handled by fetch) */}
                <input type="hidden" name="_next" value="" />

                <div className="mb-6">
                  <label htmlFor="name" className="block text-text-dark/80 font-medium mb-2 ml-1">Naam</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className="w-full px-5 py-4 rounded-2xl border border-soft-lavender/50 bg-white/70 focus:outline-none focus:ring-2 focus:ring-powder-blue/40 focus:border-powder-blue transition-all placeholder:text-text-dark/30"
                    placeholder="Jouw naam"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-text-dark/80 font-medium mb-2 ml-1">E-mailadres</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="w-full px-5 py-4 rounded-2xl border border-soft-lavender/50 bg-white/70 focus:outline-none focus:ring-2 focus:ring-powder-blue/40 focus:border-powder-blue transition-all placeholder:text-text-dark/30"
                    placeholder="jouw@email.nl"
                    required
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-text-dark/80 font-medium mb-2 ml-1">Je bericht</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border border-soft-lavender/50 bg-white/70 focus:outline-none focus:ring-2 focus:ring-powder-blue/40 focus:border-powder-blue transition-all resize-none placeholder:text-text-dark/30"
                    placeholder="Voor meer informatie of het plannen van een ademsessie..."
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-leaf-green text-white rounded-2xl font-medium hover:bg-leaf-green/90 transition-colors shadow-sm text-lg"
                >
                  Verstuur bericht
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white py-20 border-t border-charcoal/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <a href="#" className="mb-6 flex flex-col items-start gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm">
              <img 
                src="https://i.ibb.co/LdxFtVKT/logo.png" 
                alt="Nieuwe Adem Logo" 
                className="h-16 md:h-20 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-wide text-white">Nieuwe Adem</span>
          </a>
          <p className="text-white/70 font-light max-w-sm leading-relaxed">
            Begeleiding naar diepe innerlijke rust en transformatie door de kracht van bewust ademen.
          </p>
          <div className="mt-8">
            <a 
              href="https://www.instagram.com/martinnieuweadem/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 group"
              aria-label="Volg mij op Instagram"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg group-hover:scale-105 transition-transform">
                <Instagram size={20} />
              </span>
              <span className="text-white/80 font-medium group-hover:text-white transition-colors">
                Volg mij via Instagram
              </span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-6 text-powder-blue tracking-wide">Navigatie</h4>
          <ul className="space-y-4 text-white/70 font-light">
            <li><a href="#over" className="hover:text-powder-blue transition-colors">Over Martin</a></li>
            <li><a href="#methode" className="hover:text-powder-blue transition-colors">Aanbod</a></li>
            <li><a href="#resultaten" className="hover:text-powder-blue transition-colors">Wat brengt het jou?</a></li>
            <li><a href="#agenda" className="hover:text-powder-blue transition-colors">Agenda</a></li>
            <li><a href="#faq" className="hover:text-powder-blue transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-6 text-powder-blue tracking-wide">Contact</h4>
          <ul className="space-y-4 text-white/70 font-light">
            <li>Bergen op Zoom, Nederland</li>
            <li><a href="#contact" className="hover:text-powder-blue transition-colors">Stuur een bericht via het formulier</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/20 text-white/50 text-sm flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Nieuwe Adem. Alle rechten voorbehouden.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-powder-blue transition-colors">Privacy</a>
          <a href="#" className="hover:text-powder-blue transition-colors">Voorwaarden</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-bg-base selection:bg-soft-lavender selection:text-text-dark">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Aanbod />
        <Benefits />
        <Agenda />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
