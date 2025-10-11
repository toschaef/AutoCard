interface GreetingHeroProps {
  name?: string;
}

export default function GreetingHero({ name = "Ali" }: GreetingHeroProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text mb-6">
          Hello, {name}
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Welcome back to your learning dashboard. Continue your journey with your card sets.
        </p>
      </div>
    </section>
  );
}
