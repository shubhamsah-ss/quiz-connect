"use client"
// import { IconMoon, IconSunFilled } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconSunFilled } from "@tabler/icons-react";
import { IconMoonFilled } from "@tabler/icons-react";
import { Button } from '@/components/ui/button';

const ThemeSwitcher = () => {

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return (
        <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme != "light" ? <IconSunFilled size={20} /> : <IconMoonFilled size={20} />}
        </Button>
    )
}

export default ThemeSwitcher