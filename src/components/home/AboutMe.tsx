import { User, CalendarDays, TrendingUp } from 'lucide-react';

export function AboutMe() {
    return (
        <div className="mb-12 md:mb-16">
            <h2 className="font-playfair text-xl font-bold flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-blue-500" />
                About Me
            </h2>
            
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <div className="flex items-start gap-3">
                    <CalendarDays className="h-5 w-5 mt-0.5 flex-shrink-0 text-gray-500" />
                    <p>
                        <strong>I&apos;m passionate about creating tools and libraries</strong> that help developers build better applications. My focus is on performance, developer experience, and beautiful design.
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 mt-0.5 flex-shrink-0 text-gray-500" />
                    <p>
                        <strong>When I&apos;m not coding,</strong> you can find me listening to rock music, reading science fiction, or experimenting with new photography.
                    </p>
                </div>
            </div>
        </div>
    )
}