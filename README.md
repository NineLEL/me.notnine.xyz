# Card Nine - Personal Profile Card

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=fff)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, responsive personal profile card built with Astro and Starwind UI components. Display your skills, social links, and information in a beautiful, customizable card format.

## ✨ Features

- **Modern UI**: Built with Starwind component library and Tailwind CSS
- **Responsive Design**: Optimized for all screen sizes
- **Customizable**: Easy to configure with TypeScript interfaces
- **Icon Integration**: Support for multiple icon libraries (Tabler, Simple Icons, Skill Icons)
- **TypeScript**: Full type safety and IntelliSense support
- **Fast**: Built with Astro for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/card-nine-is-a-dev.git
cd card-nine-is-a-dev
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## 📁 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Card.astro          # Main profile card component
│   │   └── starwind/           # Starwind UI components
│   │       ├── avatar/
│   │       ├── badge/
│   │       ├── button/
│   │       └── card/
│   ├── config/
│   │   └── profile.ts          # Profile configuration
│   ├── layouts/
│   │   └── Layout.astro        # Main layout
│   ├── pages/
│   │   └── index.astro         # Home page
│   └── styles/
│       ├── global.css          # Global styles
│       └── starwind.css        # Starwind styles
├── starwind.config.json        # Starwind configuration
├── astro.config.mjs           # Astro configuration
├── tailwind.config.cjs        # Tailwind configuration
└── package.json
```

## ⚙️ Configuration

Edit `src/config/profile.ts` to customize your profile:

```typescript
export const profileData: ProfileData = {
  profilePic: "https://example.com/your-photo.jpg",
  name: "Your Name",
  title: "Your Title",
  birthday: "Your Birthday",
  aboutMe: "Tell us about yourself...",
  skills: ["Skill 1", "Skill 2", "Skill 3"],
  roles: [
    { name: "Role 1", color: "bg-blue-500" },
    { name: "Role 2", color: "bg-green-500" }
  ],
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/yourusername",
      icon: "simple-icons:github",
      bg: "bg-black",
      hover: "hover:bg-gray-800",
      text: "text-white"
    }
  ]
};
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm astro check` | Run Astro type checking |

## 🎨 Customization

### Starwind Components

The project uses Starwind UI components. Configure them in `starwind.config.json`:

```json
{
  "$schema": "https://starwind.dev/config-schema.json",
  "tailwind": {
    "css": "src/styles/starwind.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "componentDir": "src/components",
  "components": [
    {
      "name": "card",
      "version": "1.2.0"
    },
    {
      "name": "avatar",
      "version": "1.2.0"
    }
  ]
}
```

### Styling

- Global styles: `src/styles/global.css`
- Starwind styles: `src/styles/starwind.css`
- Tailwind config: `tailwind.config.cjs`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Astro](https://astro.build/) - The web framework
- [Starwind](https://starwind.dev/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Tabler Icons](https://tabler.io/icons) - Icon library
- [Simple Icons](https://simpleicons.org/) - Brand icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using Astro and Starwind
