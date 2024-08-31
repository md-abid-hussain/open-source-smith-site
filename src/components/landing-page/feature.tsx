export default function Feature() {
    return (
        <section id="why-choose-our-platform" className="py-10 px-4 sm:px-8 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center scroll-m-32">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-8">
                Why Choose Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Ready-to-Use Templates</h3>
                    <p>
                        Start your next project in minutes with ready-to-use templates for frontend, backend, and full-stack applications. Our curated collection ensures you have the best resources at your fingertips.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">GitHub Integration</h3>
                    <p>
                        Upload templates directly from your GitHub repository. Seamlessly integrate your existing projects and share them with the community, making collaboration easier than ever.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Open-Source CLI Tool</h3>
                    <p>
                        Use our CLI tool, open-source-smith, to streamline your development process. Generate project setup steps from README, Dockerfile to GitHub Actions, ensuring a smooth and efficient workflow.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Beginner-Friendly</h3>
                    <p>
                        Whether you&apos;re a beginner or an experienced developer, our tools are designed to save you time and effort. Focus on building great software while we handle the setup.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Comprehensive Documentation</h3>
                    <p>
                        Our platform provides detailed documentation and guides to help you get started quickly. From initial setup to advanced configurations, we&apos;ve got you covered.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Community Support</h3>
                    <p>
                        Join a vibrant community of developers. Share your templates, get feedback, and collaborate on projects. Our platform fosters a supportive environment for growth and innovation.
                    </p>
                </div>
            </div>
        </section>
    );
}