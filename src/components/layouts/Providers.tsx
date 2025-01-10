"use client"
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import WalletContextProvider from "@/providers/WalletContextProvider";
import AppContextProvider from "@/providers/AppContextProvider"
import { ThemeProvider } from "@/providers/ThemeProvider";
import { initParticlesEngine } from '@tsparticles/react'
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from '@tsparticles/slim'
import { useCallback, useEffect, useMemo, useState } from "react";

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);


  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {

  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
    },
    particles: {
      color: {
        value: "#7289da",
      },
      links: {
        color: "#7289da",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 88,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }), [])

  return (
    <AppContextProvider>
      <WalletContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header></Header>
          {/*  {
            init &&
            <Particles
              id="tsparticles"
              options={options}
            />
          } */}

          <div className="mt-20 max-w-full mx-auto" >
            {children}
          </div>
          <Footer></Footer>
        </ThemeProvider>
      </WalletContextProvider>
    </AppContextProvider>
  );
}