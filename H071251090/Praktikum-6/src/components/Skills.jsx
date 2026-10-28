function Skills() {
    const keahlian = [
        'HTML', 'CSS', 'Javascript', 'Python', 'Java', 'PostgreSQL', 'Git & Github', 'Figma',
    ];

    return (
        <section id="skills" className="py-20 bg-gray-950 text-gray-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
            <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Keahlian</h2>
            <div className="h-1 w-16 bg-blue-500 rounded mx-auto md:mx-0"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {keahlian.map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all duration-200 flex items-center justify-center text-center font-medium text-gray-200 shadow-sm">
                {item}
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}

export default Skills;