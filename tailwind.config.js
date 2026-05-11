const color = (token) => `oklch(var(${token}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        border: color("--border"),
        input: color("--input"),
        ring: color("--ring"),
        background: color("--background"),
        foreground: color("--foreground"),
        primary: {
          DEFAULT: color("--primary"),
          foreground: color("--primary-foreground"),
        },
        secondary: {
          DEFAULT: color("--secondary"),
          foreground: color("--secondary-foreground"),
        },
        destructive: {
          DEFAULT: color("--destructive"),
          foreground: color("--destructive-foreground"),
        },
        muted: {
          DEFAULT: color("--muted"),
          foreground: color("--muted-foreground"),
        },
        accent: {
          DEFAULT: color("--accent"),
          foreground: color("--accent-foreground"),
        },
        popover: {
          DEFAULT: color("--popover"),
          foreground: color("--popover-foreground"),
        },
        card: {
          DEFAULT: color("--card"),
          foreground: color("--card-foreground"),
        },
        sidebar: {
          DEFAULT: color("--sidebar"),
          foreground: color("--sidebar-foreground"),
          primary: color("--sidebar-primary"),
          "primary-foreground": color("--sidebar-primary-foreground"),
          accent: color("--sidebar-accent"),
          "accent-foreground": color("--sidebar-accent-foreground"),
          border: color("--sidebar-border"),
          ring: color("--sidebar-ring"),
        },
      },
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
