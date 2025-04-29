import React from "react";

type Props = {
    children: React.ReactNode;
    };

export default function ResponsiveWrapper({ children }: Props) {
    return (
        <main className="min-h-screen flex flex-col p-4 md:p-0 md:items-center">
            <section className="w-full md:max-w-lg md:mx-auto">
                {children}
            </section>
        </main>
    );
}