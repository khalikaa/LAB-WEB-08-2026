const skillList = [
  {
    id: 1,
    name: "Figma Prototyping & Wireframing",
    category: "UI/UX Design",
    iconUrl: "https://i.pinimg.com/1200x/90/72/62/907262cc3f76a8bd5466f2b1b91a715e.jpg", 
    level: "Sering Dipraktikkan",
    badgeBg: "bg-rose-50 text-[#FF5E84] border-rose-200"
  },
  {
    id: 2,
    name: "User Research & Usability Testing",
    category: "Research & Strategy",
    iconUrl: "https://i.pinimg.com/1200x/4f/de/81/4fde81882c73596e9bad367457998d0c.jpg",
    level: "Sering Dipraktikkan",
    badgeBg: "bg-rose-50 text-[#FF5E84] border-rose-200"
  },
  {
    id: 3,
    name: "HTML5 & CSS3 Responsive Grid",
    category: "Front-End Dev",
    iconUrl: "https://i.pinimg.com/1200x/64/d5/29/64d529e328ee673e81173dfb5df320c8.jpg",
    level: "Sering Dipraktikkan",
    badgeBg: "bg-rose-50 text-[#FF5E84] border-rose-200"
  },
  {
    id: 4,
    name: "JavaScript DOM & Web Storage",
    category: "Front-End Dev",
    iconUrl: "https://i.pinimg.com/1200x/a4/67/dd/a467dd79ef9730bf52c1c82433772a2f.jpg",
    level: "Sering Dipraktikkan",
    badgeBg: "bg-rose-50 text-[#FF5E84] border-rose-200"
  },
  {
    id: 5,
    name: "Java Programming & OOP",
    category: "Software Engineering",
    iconUrl: "https://i.pinimg.com/736x/94/68/e0/9468e09802e804b38d1a1d168f85a586.jpg",
    level: "Sedang Dikembangkan",
    badgeBg: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    id: 6,
    name: "Public Speaking & Moderasi",
    category: "Leadership & Social",
    iconUrl: "https://i.pinimg.com/736x/b9/1f/26/b91f26b9feeff3d5b1a2e50187ea43bc.jpg",
    level: "Sering Dipraktikkan",
    badgeBg: "bg-rose-50 text-[#FF5E84] border-rose-200"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 md:py-16 px-6 md:px-10 bg-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <span className="text-[#FF5E84] text-xs font-black tracking-widest uppercase bg-[#FF5E84]/10 border border-[#FF5E84]/20 px-3.5 py-1 rounded-full inline-block">
            My Expertise
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#2A1E24] tracking-tight">
            Kemampuan & Bidang Keahlian
          </h2>
          <p className="text-xs md:text-sm text-[#7A6971] font-semibold max-w-lg mx-auto">
            Kombinasi keahlian teknis UI/UX, pengembangan perangkat lunak, dan komunikasi sosial.
          </p>
        </div>

        {/* Grid Skills Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {skillList.map((skill) => (
            <div
              key={skill.id}
              className="group bg-linear-to-b from-pink-50/40 to-white border border-pink-100/80 p-5 rounded-3xl shadow-xs hover:shadow-md hover:border-[#FF5E84]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Header Card: Custom Pinterest Image Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-pink-100 flex items-center justify-center p-1.5 shadow-xs overflow-hidden group-hover:scale-110 transition-transform">
                    <img 
                      src={skill.iconUrl} 
                      alt={skill.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#7A6971] uppercase tracking-wider bg-white/80 border border-pink-100 px-2.5 py-1 rounded-lg">
                    {skill.category}
                  </span>
                </div>

                {/* Skill Title */}
                <h3 className="font-extrabold text-[#2A1E24] text-sm leading-snug group-hover:text-[#FF5E84] transition-colors">
                  {skill.name}
                </h3>
              </div>

              {/* Status Badge */}
              <div className="pt-4 mt-2 border-t border-pink-100/60">
                <span className={`inline-block text-[10px] font-extrabold px-3 py-1 rounded-full border ${skill.badgeBg}`}>
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}