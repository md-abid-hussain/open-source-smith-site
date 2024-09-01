import Image from 'next/image';

export default function BuiltUsing() {
    return (
        <section id="tools-used-in-building" className="py-10 px-4 sm:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center scroll-m-32">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8">
                Tools and Libraries used
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/vercel.png" alt="Vercel" width={50} height={50} className='dark:bg-white dark:rounded-full' />
                    <h3 className="text-xl font-semibold mb-4">Vercel</h3>
                    <p>
                        We use Vercel for seamless deployment and hosting of our platform, ensuring high performance and reliability.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/neon.png" alt="Neon Postgres" width={50} height={50} />
                    <h3 className="text-xl font-semibold mb-4">Neon Postgres</h3>
                    <p>
                        Our database is powered by Neon Postgres, providing robust and scalable data management solutions.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/nextjs.png" alt="Next.js" width={50} height={50} className='dark:bg-white dark:rounded-full' />
                    <h3 className="text-xl font-semibold mb-4">Next.js</h3>
                    <p>
                        Built with Next.js, our platform leverages the power of server-side rendering and static site generation for optimal performance.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/copilotkit.png" alt="CopilotKit" width={50} height={50} />
                    <h3 className="text-xl font-semibold mb-4">CopilotKit</h3>
                    <p>
                        We utilize CopilotKit to integrate llm capabilities. CopilotKit is the simplest way to integrate production-ready Copilots into any product.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/shadcn.png" alt="ShadCN" width={50} height={50} />
                    <h3 className="text-xl font-semibold mb-4">ShadCN</h3>
                    <p>
                        ShadCN helps us create beautiful and consistent UI designs, enhancing the overall user experience.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/tailwind.png" alt="Tailwind CSS" width={50} height={50} />
                    <h3 className="text-xl font-semibold mb-4">Tailwind CSS</h3>
                    <p>
                        Tailwind CSS is our go-to utility-first CSS framework, allowing us to build responsive and modern designs with ease.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/gemini.png" alt="Google Gemini" width={50} height={50} />
                    <h3 className="text-xl font-semibold mb-4">Google Gemini</h3>
                    <p>
                        We integrate Google Gemini for advanced AI capabilities, enhancing the intelligence and functionality of our platform.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/next-auth.png" alt="NextAuth" width={50} height={50} />
                    <h3 className="text-xl font-semibold mb-4">NextAuth</h3>
                    <p>
                        NextAuth provides us with secure and flexible authentication solutions, ensuring user data is protected.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <Image src="/mintlify.png" alt="NextAuth" width={50} height={50} />
                    <h3 className="text-xl font-semibold mb-4">Mintlify</h3>
                    <p>
                        Mintlify is our go-to tool for static site generation, enabling us to build fast and efficient websites.
                    </p>
                </div>
            </div>
        </section>
    );
}