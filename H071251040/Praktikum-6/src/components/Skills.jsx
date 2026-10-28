function Skills() {
  const keahlian = [
    "HTML & CSS",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "UI Design",
    "Git & GitHub",
  ];

  const warna = ["bg-kuning", "bg-white", "bg-merah text-white", "bg-kuning", "bg-white", "bg-biru"];
  const miring = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];

  return (
    <section id="skills" className="bg-biru px-5 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl text-white [text-shadow:3px_3px_0_#000] sm:text-5xl">
          Keahlian Saya
        </h2>
        <ul className="m-0 mt-8 flex list-none flex-wrap gap-4 p-0">
          {keahlian.map((skill, index) => (
            <li
              key={index}
              className={`border-4 border-black px-5 py-3 font-display text-base shadow-[5px_5px_0_#000] transition hover:rotate-0 hover:scale-105 sm:text-lg ${warna[index % warna.length]} ${miring[index % miring.length]}`}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;
