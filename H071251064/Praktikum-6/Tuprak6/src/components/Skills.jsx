function Skills() {
  const skills = ["Python", "Java", "HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Git"];

  const alamatLogo = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

  const logoSkill = {
    Python: `${alamatLogo}/python/python-original.svg`,
    Java: `${alamatLogo}/java/java-original.svg`,
    HTML: `${alamatLogo}/html5/html5-original.svg`,
    CSS: `${alamatLogo}/css3/css3-original.svg`,
    JavaScript: `${alamatLogo}/javascript/javascript-original.svg`,
    React: `${alamatLogo}/react/react-original.svg`,
    "Tailwind CSS": `${alamatLogo}/tailwindcss/tailwindcss-original.svg`,
    Git: `${alamatLogo}/git/git-original.svg`,
  };

  return (
    <section id="keahlian" className="relative scroll-mt-20 bg-linear-to-b from-teal-50 to-teal-100 pb-28 pt-20">
      <div className="mx-auto max-w-5xl px-5">
      <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-lime-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent sm:text-4xl">
            Keahlian
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-linear-to-r from-teal-600 to-emerald-300" />
        </div>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-teal-50">
              <img
                src={logoSkill[skill]}
                alt={`Logo ${skill}`}
                className="h-10 w-10 object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-slate-700">{skill}</span>
          </li>
        ))}
      </ul>
      </div>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-10 w-full sm:h-16 fill-teal-50"
      >
        <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,80 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}

export default Skills;